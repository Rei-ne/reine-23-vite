import test from 'node:test';import assert from 'node:assert/strict';import{readFile}from'node:fs/promises';
import {createHandler} from './functions/pitcher.mjs';import{accountId,sessionValue}from'./pitch-auth.mjs';import{paidAccess,receiveBillingWebhook,billingClient,reconcileSubscription}from'./pitch-billing.mjs';
test('only an unexpired active subscription or owner grants paid access',()=>{assert.equal(paidAccess({environment:'sandbox',status:'active',validUntil:'2099-01-01'},false,'live'),false);assert.equal(paidAccess(null),false);assert.equal(paidAccess(null,true),true);assert.equal(paidAccess({environment:'live',status:'active',validUntil:'2000-01-01'}),false);assert.equal(paidAccess({environment:'live',status:'canceled',validUntil:'2099-01-01'}),false);assert.equal(paidAccess({environment:'live',status:'active',validUntil:'2099-01-01'}),true);});
test('server exports require paid access and a matching owned workspace; previews remain free',async()=>{
const email='tester@example.com',id=accountId(email),env={PITCH_LOCAL_PREVIEW:'true',PITCH_OWNER_EMAIL:'owner@example.com',PITCH_SESSION_SECRET:'secret-with-at-least-thirty-two-characters',PITCH_SERVER_DOCUMENTS:'true',PITCH_PAYWALL_ENABLED:'true'};
const rows=new Map([['account/'+id,{email}],['user/'+id+'/workspace/test',{id:'test',name:'Test label',kind:'Label',accent:'#c8f04a',revision:'r1',data:{artists:{}}}]]);let version=0,calls=0;
const store={get:async k=>rows.get(k)||null,getWithMetadata:async k=>rows.has(k)?{data:rows.get(k),etag:'e'}:null,list:async({prefix})=>({blobs:[...rows.keys()].filter(k=>k.startsWith(prefix)).map(key=>({key}))}),setJSON:async(k,v)=>{rows.set(k,v);return{modified:true,etag:String(++version)}}};
const h=createHandler({env,storeFactory:()=>store,assetReader:p=>readFile(new URL('./pitch-assets/'+p,import.meta.url)),renderer:async()=>{calls++;return{images:[],bytes:Buffer.from('PK'),type:'application/test'}}});
const cookie='reine_pitch_session='+sessionValue(id,env.PITCH_SESSION_SECRET),request=(path,body)=>h(new Request('https://example.com/pitcher'+path,{method:'POST',headers:{origin:'https://example.com',cookie},body:JSON.stringify(body)}));
assert.equal((await request('/api/document',{workspace:'test',revision:'r1',format:'docx'})).status,402);assert.equal(calls,0);
assert.equal((await request('/api/document',{workspace:'test',revision:'r1',format:'preview'})).status,200);assert.equal(calls,1);
rows.set('billing/account/'+id,{environment:'live',status:'active',validUntil:'2099-01-01'});
assert.equal((await request('/api/document',{workspace:'other',revision:'r1',format:'docx'})).status,404);
assert.equal((await request('/api/document',{workspace:'test',revision:'stale',format:'docx'})).status,409);
assert.equal((await request('/api/document',{workspace:'test',revision:'r1',format:'docx'})).status,200);
rows.delete('billing/account/'+id);
const change={...rows.get('user/'+id+'/workspace/test'),name:'New brand'};assert.equal((await request('/api/workspaces',change)).status,402);
const engine=await h(new Request('https://example.com/pitcher/engine.js',{headers:{cookie}}));const source=await engine.text();assert.match(source,/function extract/);assert.doesNotMatch(source,/async function (generic|compact|four10|fillCustom)/);
});
test('forged billing webhooks cannot change entitlements',async()=>{let writes=0;const r=await receiveBillingWebhook({request:new Request('https://example.com/pitcher/api/billing/webhook',{method:'POST',body:'{"type":"subscription.active"}'}),env:{BACHS_API_KEY:'sk_live_test',BACHS_PITCHER_PRODUCT_ID:'product',BACHS_WEBHOOK_SECRET:'whsec_test'},store:{setJSON:async()=>writes++}});assert.equal(r.status,401);assert.equal(writes,0);});

test("billing selects the SDK production and sandbox environments explicitly",()=>{assert.doesNotThrow(()=>billingClient({BACHS_API_KEY:"synthetic-test-key",BACHS_ENVIRONMENT:"live"}));assert.doesNotThrow(()=>billingClient({BACHS_API_KEY:"synthetic-test-key",BACHS_ENVIRONMENT:"sandbox"}));});

test('subscription reconciliation follows documented checkout customer and product, with no checkout subscription field',async()=>{
 const rows=new Map([['account/user',{email:'person@example.com'}]]),mapping={account:'user',product:'pitcher-product',checkout:'checkout'},sub={id:'sub',status:'active',currency:'USD',amount:'10.00',billing_cycle:{interval:'month',frequency:1},current_period_end:'2099-01-01',customer:{customer_id:'customer',email:'person@example.com'},product:{id:'pitcher-product'}};
 const client={checkoutSessions:{get:async()=>({status:'completed',payment_status:'succeeded',currency:'USD',amount:'10.00',customer:{id:'customer'},products:[{product_id:'pitcher-product'}]})},subscriptions:{list:async()=>({items:[sub],pagination:{has_more:false}}),get:async()=>sub}},store={get:async k=>rows.get(k),setJSON:async(k,v)=>rows.set(k,v)};
 assert.equal((await reconcileSubscription({env:{BACHS_ENVIRONMENT:'sandbox'},store,mapping,client})).status,200);assert.equal(rows.get('billing/account/user').status,'active');
 rows.delete('billing/account/user');sub.product.id='another-app';assert.equal((await reconcileSubscription({env:{BACHS_ENVIRONMENT:'sandbox'},store,mapping,subscriptionId:'sub',client})).status,409);assert.equal(rows.has('billing/account/user'),false);
});
