import { Bachs, webhooks } from '@bachs/sdk';
import { randomUUID } from 'node:crypto';
export const billingReady=env=>!!(env.BACHS_API_KEY&&env.BACHS_PITCHER_PRODUCT_ID&&env.BACHS_WEBHOOK_SECRET);
export const billingEnvironment=env=>env.BACHS_ENVIRONMENT||(env.BACHS_API_KEY?.startsWith('sk_sandbox_')?'sandbox':'live');
export const paidAccess=(record,owner=false,environment='live')=>owner||!!(record?.betaUntil&&Date.parse(record.betaUntil)>Date.now())||!!(record?.environment===environment&&record?.status==='active'&&Date.parse(record.validUntil)>Date.now());
export const billingClient=env=>new Bachs({apiKey:env.BACHS_API_KEY,environment:billingEnvironment(env)==='sandbox'?'sandbox':'production',timeoutMs:12000,maxRetries:1});
export async function checkoutFor({env,store,id,email,origin}){
 if(!billingReady(env))throw Error('Subscriptions are not open yet. Please check back shortly.');
 const bachs=billingClient(env),product=await bachs.products.get(env.BACHS_PITCHER_PRODUCT_ID);
 if(product.price?.currency!=='USD'||Number(product.price?.amount)!==10||product.billing_cycle?.interval!=='month'||product.billing_cycle?.frequency!==1)throw Error('The Pitcher product must be exactly US$10 USD per month.');
 const key='billing/checkout/'+id,previous=await store.getWithMetadata(key,{type:'json'}),prior=previous?.data;
 if(prior?.url&&Date.parse(prior.expiresAt)>Date.now()+60000)return prior.url;
 const reference='pitcher-'+randomUUID();
 // Record the operation before the request so an ambiguous response never causes a second charge flow.
 if(prior?.pending)throw Error('Your checkout is being confirmed. Please try again shortly.');
 const claimed=await store.setJSON(key,{pending:true,reference,createdAt:new Date().toISOString()},previous?{onlyIfMatch:previous.etag}:{onlyIfNew:true});
 if(claimed?.modified===false)throw Error('Checkout is already opening. Try again shortly.');
 const session=await bachs.checkoutSessions.create({product_cart:[{product_id:env.BACHS_PITCHER_PRODUCT_ID,quantity:1}],customer_creation:'always',customer:{email,name:email.split('@')[0]},reference,metadata:{app:'pitcher',account:id},success_url:origin+'/pitcher/billing?payment=return',cancel_url:origin+'/pitcher/billing?payment=cancel'},{idempotencyKey:reference});
 const u=new URL(session.checkout_url);if(u.protocol!=='https:'||!['checkout.bachs.io','sandbox-checkout.bachs.io'].includes(u.hostname))throw Error('Unexpected checkout destination.');
 const mapping={account:id,product:env.BACHS_PITCHER_PRODUCT_ID,checkout:session.checkout_id};await store.setJSON('billing/reference/'+reference,mapping);await store.setJSON('billing/checkout-id/'+session.checkout_id,mapping);
 await store.setJSON(key,{reference,url:u.href,expiresAt:session.expires_at});return u.href;
}
export async function receiveBillingWebhook({request,env,store}){
 if(!billingReady(env))return Response.json({error:'Billing is not configured.'},{status:503});
 const raw=await request.text();if(raw.length>100000)return new Response(null,{status:413});
 let event;try{event=webhooks.constructEvent(raw,request.headers,env.BACHS_WEBHOOK_SECRET);}catch{return Response.json({error:'Invalid webhook.'},{status:401});}
 // Each event only schedules reconciliation. Entitlements always come from a fresh provider read.
 const data=event.data?.object||event.data||{},reference=data.reference||data.checkout?.reference;
 let mapping=reference?await store.get('billing/reference/'+reference,{type:'json'}):null;const checkoutId=data.checkout_id||data.checkout?.checkout_id||(/^checkout\./.test(event.type)?data.id:null);if(!mapping&&checkoutId)mapping=await store.get('billing/checkout-id/'+checkoutId,{type:'json'});
 let subscriptionId=data.subscription_id||(typeof data.subscription==='string'?data.subscription:data.subscription?.id)||(/subscription\./.test(event.type)?data.id:null);
 if(!mapping&&subscriptionId)mapping=await store.get('billing/subscription/'+subscriptionId,{type:'json'});
 if(!mapping)return Response.json({received:true,ignored:true});
 return reconcileSubscription({env,store,mapping,subscriptionId,client:billingClient(env)});
}
export async function reconcileSubscription({env,store,mapping,subscriptionId,client}){
 const checkout=mapping.checkout?await client.checkoutSessions.get(mapping.checkout):null;
 if(!checkout||checkout.status!=='completed'||checkout.payment_status!=='succeeded'||checkout.currency!=='USD'||Number(checkout.amount)!==10||!checkout.products?.some(p=>p.product_id===mapping.product))return Response.json({error:'Paid Pitcher checkout is not confirmed yet.'},{status:503});
 const customerId=checkout.customer?.id;
 if(!customerId)return Response.json({error:'Checkout customer is not available yet.'},{status:503});
 const expected=checkout.subscription_id||checkout.subscription?.id;
 if(subscriptionId&&expected&&subscriptionId!==expected)return Response.json({error:'Subscription mismatch.'},{status:409});
 subscriptionId=expected||subscriptionId;
 const productOf=s=>s.product?.id||s.items?.find(i=>i.product?.id===mapping.product||i.price?.product_id===mapping.product)?.product?.id||s.items?.find(i=>i.price?.product_id===mapping.product)?.price?.product_id;
 if(!subscriptionId){const list=await client.subscriptions.list({customer_id:customerId,limit:100});const matches=list.items.filter(s=>productOf(s)===mapping.product);if(matches.length!==1||list.pagination?.has_more)return Response.json({error:'Subscription is not available unambiguously yet.'},{status:503});subscriptionId=matches[0].id;}
 const sub=await client.subscriptions.get(subscriptionId),account=await store.get('account/'+mapping.account,{type:'json'});
 if(!account||sub.customer?.customer_id!==customerId||sub.customer?.email?.toLowerCase()!==account.email.toLowerCase()||productOf(sub)!==mapping.product||sub.currency!=='USD'||Number(sub.amount)!==10||sub.billing_cycle?.interval!=='month'||sub.billing_cycle?.frequency!==1)return Response.json({error:'Subscription identity or product mismatch.'},{status:409});
 const validUntil=sub.current_period_end||sub.next_billed_at;
 const current={environment:billingEnvironment(env),status:sub.status==='active'&&Date.parse(validUntil)>Date.now()?'active':'inactive',validUntil:validUntil||null,subscriptionId:sub.id,customerId,checkedAt:new Date().toISOString(),product:mapping.product};
 await store.setJSON('billing/subscription/'+sub.id,mapping);
 await store.setJSON('billing/account/'+mapping.account,current);
 return Response.json({received:true});
}
