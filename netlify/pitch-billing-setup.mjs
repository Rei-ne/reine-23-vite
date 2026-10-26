import {billingClient,billingEnvironment,checkoutFor} from './pitch-billing.mjs';
import {randomUUID}from'node:crypto';
export async function resolveBillingConfig(env,store){
 if(!env.BACHS_API_KEY)return env;
 const config=await store.get('billing/config/'+billingEnvironment(env),{type:'json'});
 return {...env,BACHS_PITCHER_PRODUCT_ID:env.BACHS_PITCHER_PRODUCT_ID||config?.product,BACHS_WEBHOOK_SECRET:env.BACHS_WEBHOOK_SECRET||config?.webhookSecret};
}
export async function setupBilling({request,env,store,ownerId,ownerEmail,renderer,assetReader}){
 if(env.PITCH_BILLING_SETUP_ENABLED!=='true')return Response.json({error:'Billing setup is closed.'},{status:403});
 const mode=billingEnvironment(env),text=await request.text();if(text.length>512)return new Response(null,{status:413});const {action}=JSON.parse(text||'{}');
 if(!['check','product','webhook','checkout','render','verify'].includes(action))return Response.json({error:'Invalid setup action.'},{status:400});
 try{
 const configKey='billing/config/'+mode;
 if(action==='verify'){
 const saved=await store.get(configKey,{type:'json'}),pending=await store.get('billing/checkout/'+ownerId,{type:'json'}),mapping=pending?.reference?await store.get('billing/reference/'+pending.reference,{type:'json'}):null;
 if(!saved?.endpoint||!mapping?.checkout)return Response.json({error:'Create product, webhook and checkout first.'},{status:409});
 const client=billingClient(env),checkout=await client.checkoutSessions.get(mapping.checkout),base=mode==='sandbox'?'https://sandbox-api.bachs.io':'https://api.bachs.io';
 const response=await fetch(base+'/v1/webhooks/endpoints/'+encodeURIComponent(saved.endpoint),{headers:{Authorization:'Bearer '+env.BACHS_API_KEY},signal:AbortSignal.timeout(15000)});if(!response.ok)return Response.json({error:'Webhook verification failed.'},{status:502});const endpoint=await response.json();
 return Response.json({environment:mode,checkoutReady:checkout.status==='open'&&checkout.currency==='USD'&&Number(checkout.amount)===10&&checkout.recurring?.interval==='month'&&checkout.products?.some(p=>p.product_id===saved.product),checkoutStatus:checkout.status,paymentStatus:checkout.payment_status||null,currency:checkout.currency,amount:checkout.amount,interval:checkout.recurring?.interval||null,webhookReady:endpoint.enabled===true&&endpoint.url===new URL(env.PITCH_PUBLIC_URL).origin+'/pitcher/api/billing/webhook'&&['checkout.completed','invoice.paid','customer.subscription.updated'].every(e=>endpoint.event_types?.includes(e))});
 }
 if(action==='render'){
 const artist={include:true,title:'Render check',release_date:'TBC',focus_track:'',blurb:'Private rendering check.',biography:'',metrics:[],assets:[],timeline:[],achievements:[]};
 const options={workspace:{id:'render-check',name:'Pitcher',accent:'#c8f04a',data:{edition:'Render check',as_of:new Date().toISOString().slice(0,10),mode:'DSP pitch',export_layout:'compact',artists:{'Test artist':artist}}},selected:'Test artist',assetReader,chromiumPack:env.PITCH_CHROMIUM_PACK};
 const preview=await renderer({...options,format:'preview'}),word=await renderer({...options,format:'docx'}),pdf=await renderer({...options,format:'pdf'});
 return Response.json({rendererReady:preview.images?.length>0&&word.bytes?.length>0&&pdf.bytes?.length>0,pages:preview.images?.length,wordBytes:word.bytes?.length,pdfBytes:pdf.bytes?.length});
 }
 if(action==='webhook'){
 const saved=await store.get(configKey,{type:'json'})||{};if(saved.endpoint&&saved.webhookSecret)return Response.json({configured:true,environment:mode,endpoint:saved.endpoint});
 const origin=new URL(env.PITCH_PUBLIC_URL).origin,url=origin+'/pitcher/api/billing/webhook',base=mode==='sandbox'?'https://sandbox-api.bachs.io':'https://api.bachs.io';
 const api=async(method,path,body)=>{const r=await fetch(base+path,{method,headers:{Authorization:'Bearer '+env.BACHS_API_KEY,'Content-Type':'application/json'},...(body?{body:JSON.stringify(body)}:{}),signal:AbortSignal.timeout(15000)});if(!r.ok){const e=new Error('Bachs webhook request failed');e.status=r.status;throw e;}return r.json();};
 const listed=await api('GET','/v1/webhooks/endpoints'),items=Array.isArray(listed)?listed:listed.items||[];
 if(items.some(e=>e.url===url))return Response.json({error:'An existing Pitcher endpoint needs its signing secret configured. It was not changed.'},{status:409});
 const key='billing/setup/'+mode+'/webhook',claim=await store.setJSON(key,{state:'pending',createdAt:new Date().toISOString()},{onlyIfNew:true});if(!claim.modified)return Response.json({error:'Webhook creation outcome needs review before retry.'},{status:409});
 const endpoint=await api('POST','/v1/webhooks/endpoints',{name:'Pitcher · '+mode,url,event_types:['checkout.completed','collection.succeeded','customer.subscription.created','customer.subscription.updated','customer.subscription.deleted','invoice.paid','invoice.payment_failed'],event_source:'account'});
 if(!endpoint.endpoint_id||!endpoint.signing_secret)throw Error('Webhook response needs review.');
 await store.setJSON(configKey,{...saved,endpoint:endpoint.endpoint_id,webhookSecret:endpoint.signing_secret});await store.setJSON(key,{state:'created',endpoint:endpoint.endpoint_id});
 return Response.json({configured:true,environment:mode,endpoint:endpoint.endpoint_id});
 }
 if(action==='checkout'){
 const resolved=await resolveBillingConfig(env,store);const url=await checkoutFor({env:resolved,store,id:ownerId,email:ownerEmail,origin:new URL(env.PITCH_PUBLIC_URL).origin});
 return Response.json({checkoutUrl:url,environment:mode,currency:'USD',amount:'10.00',interval:'month'});
 }
 const client=billingClient(env),found=[];let cursor;
 for(let i=0;i<10;i++){const page=await client.products.list({limit:100,...(cursor?{cursor}:{})});found.push(...page.items.filter(p=>p.metadata?.app==='reine-pitcher'&&p.metadata?.plan==='usd10-monthly-v1'));if(!page.pagination?.has_more)break;if(!page.pagination?.next_cursor)throw Error('Product pagination needs review.');cursor=page.pagination.next_cursor;if(i===9)throw Error('Product list needs review.');}
 if(action==='check')return Response.json({connected:true,environment:mode,matchingProducts:found.length});
 if(found.length>1)return Response.json({error:'More than one matching Pitcher product needs review.'},{status:409});
 let product=found[0];
 if(!product){const key='billing/setup/'+mode+'/product',prior=await store.get(key,{type:'json'});if(prior?.state==='pending')return Response.json({error:'Product creation outcome needs reconciliation before retry.'},{status:409});const operation='pitcher-usd10-'+randomUUID();const claim=await store.setJSON(key,{state:'pending',operation},{onlyIfNew:true});if(!claim.modified)return Response.json({error:'Product setup already in progress.'},{status:409});product=await client.products.create({name:'Pitcher',description:'US$10 monthly — Word/PDF downloads and workspace customisation.',price:{currency:'USD',amount:'10.00'},billing_cycle:{interval:'month',frequency:1},metadata:{app:'reine-pitcher',plan:'usd10-monthly-v1'}},{idempotencyKey:operation});await store.setJSON(key,{state:'created',product:product.id,operation});}
 if(product.price.currency!=='USD'||Number(product.price.amount)!==10||product.billing_cycle?.interval!=='month'||product.billing_cycle?.frequency!==1)return Response.json({error:'Pitcher product does not match the approved price.'},{status:409});
 await store.setJSON(configKey,{...await store.get(configKey,{type:'json'}),product:product.id});
 return Response.json({connected:true,environment:mode,product:product.id,currency:'USD',amount:'10.00',interval:'month'});
 }catch(e){const rawReason=String(typeof e.body?.error==='string'?e.body.error:e.body?.error?.message||e.body?.message||e.body?.detail||e.message||'');const reason=(env.BACHS_API_KEY?rawReason.replaceAll(env.BACHS_API_KEY,'[redacted]'):rawReason).replace(/sk_(?:live|sandbox)_[A-Za-z0-9_-]+/g,'[redacted]').slice(0,300);return Response.json({reason,error:'Billing connection or setup failed.',kind:e.name,status:e.status||null,code:e.errorCode||null,keyEnvironment:env.BACHS_API_KEY?.startsWith('sk_sandbox_')?'sandbox':env.BACHS_API_KEY?.startsWith('sk_live_')?'live':'unrecognised',hasWhitespace:env.BACHS_API_KEY!==env.BACHS_API_KEY?.trim()},{status:502});}
}
