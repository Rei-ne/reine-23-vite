import {setupBilling,resolveBillingConfig} from '../pitch-billing-setup.mjs';
import {billingReady,billingEnvironment,paidAccess,checkoutFor,receiveBillingWebhook,billingClient} from '../pitch-billing.mjs';
import {renderDocument} from '../pitch-render.mjs';
import { getStore } from '@netlify/blobs';
import JSZip from 'jszip';
import { randomUUID } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { base, normalizeEmail, accountId, hashPassword, checkPassword, sessionValue, sessionId, redirect, landingPage, authPage, emailSignInPage, emailConfirmationPage, emailSessionPage, pricingPage } from '../pitch-auth.mjs';
const json = (value, status = 200) => Response.json(value, { status });
const idValid = id => typeof id === 'string' && /^[a-zA-Z0-9_-]{1,80}$/.test(id);

export function createHandler({ storeFactory = () => getStore({ name: 'reine-pitch-production', consistency: 'strong' }), assetReader = path => readFile(resolve('netlify/pitch-assets', path)), env: configuredEnv = process.env, fetcher = fetch, renderer = renderDocument } = {}) {
 return async request => {
  try {
   const env=configuredEnv.BACHS_API_KEY?await resolveBillingConfig(configuredEnv,storeFactory()):configuredEnv;
   const url = new URL(request.url);
   let path = url.pathname.startsWith('/.netlify/functions/pitcher') ? url.pathname.slice('/.netlify/functions/pitcher'.length) : url.pathname.slice(base.length);
   const local = env.PITCH_LOCAL_PREVIEW === 'true';
   if (!local && url.hostname.endsWith('.netlify.app') && env.PITCH_PUBLIC_URL) {
    const target = new URL(env.PITCH_PUBLIC_URL);
    target.pathname = url.pathname; target.search = url.search;
    return new Response(null, { status: request.method === 'GET' || request.method === 'HEAD' ? 302 : 403, headers: { Location: target.href, 'Cache-Control': 'no-store' } });
   }
   const secret = env.PITCH_SESSION_SECRET, ownerEmail = normalizeEmail(env.PITCH_OWNER_EMAIL);
   if (path === '/api/billing/webhook') {if(request.method!=='POST')return json({error:'Method not allowed.'},405);return receiveBillingWebhook({request,env,store:storeFactory()});}
   if (request.method !== 'GET' && request.method !== 'HEAD' && request.headers.get('origin') !== url.origin) return json({ error: 'Invalid request origin.' }, 403);
   const logEvent = async (event, identity = {}) => {try {const time=new Date().toISOString();await storeFactory().setJSON('analytics/'+time.slice(0,10)+'/'+randomUUID(),{event,time,...identity});}catch{ /* Analytics must not interrupt editing or sign-in. */ }};
   if (path === '/api/events') {
    if (request.method !== 'POST') return json({error:'Method not allowed.'},405);
    const body=await request.text();if(body.length>512)return json({error:'Request too large.'},413);
    const data=JSON.parse(body);
    if (!['studio_open','demo_open','extract','preview','word_download','pdf_download'].includes(data.event)||typeof data.session!=='string'||! /^[a-f0-9-]{36}$/i.test(data.session))return json({error:'Invalid event.'},400);
    const account=secret?sessionId(request,secret):null;
    const saved=account?await storeFactory().get('account/'+account,{type:'json'}):null;
    const user=saved?.emailVerified?account:null;
    await logEvent(data.event,{session:data.session,user,owner:!!user&&user===accountId(ownerEmail)});
    return json({ok:true});
   }
   if(path==='/pricing'&&request.method==='GET')return pricingPage({ready:billingReady(env)&&billingEnvironment(env)==='live'&&env.PITCH_PAYWALL_ENABLED==='true'});
   if ((path === '/' || !path) && request.method === 'GET') return landingPage(false);
   const serverDocs=env.PITCH_SERVER_DOCUMENTS==='true'||env.PITCH_PAYWALL_ENABLED==='true';
   const clientEngine=source=>{const a=source.indexOf('function scopeDraft('),b=source.indexOf('function campaignSections('),c=source.indexOf('const months='),d=source.indexOf('function artistText(');if([a,b,c,d].some(i=>i<0))throw Error('Client engine unavailable');return '(()=>{'+source.slice(a,b)+source.slice(c,d)+'window.ReineEngine={extract,findDates,scopeDraft};})();';};
   if(path==='/api/demo-preview'&&serverDocs){
    if(request.method!=='POST')return json({error:'Method not allowed.'},405);
    const text=await request.text();if(text.length>150000)return json({error:'Choose a smaller demo draft.'},413);
    const body=JSON.parse(text);if(body.workspace?.id!=='demo'||!body.workspace?.data?.artists)return json({error:'Invalid demo draft.'},400);
    const budgetStore=storeFactory(),hour=new Date().toISOString().slice(0,13),budgetKey='render-budget/demo/'+hour;const budget=await budgetStore.getWithMetadata(budgetKey,{type:'json'});if((budget?.data?.count||0)>=20)return json({error:'Demo preview is busy. Please try later.'},429);const claim=await budgetStore.setJSON(budgetKey,{count:(budget?.data?.count||0)+1},budget?{onlyIfMatch:budget.etag}:{onlyIfNew:true});if(!claim.modified)return json({error:'Preview is busy. Try again.'},429);
    const workspace={id:'demo',name:'Demo label',kind:'Label',accent:'#c8f04a',data:body.workspace.data};if(workspace.data.export_layout!=='compact')workspace.data.export_layout='compact';
    return json(await renderer({workspace,selected:body.selected,format:'preview',assetReader,chromiumPack:env.PITCH_CHROMIUM_PACK}));
   }
   if (path === '/demo' || path.startsWith('/demo/')) {
    if (request.method !== 'GET' && request.method !== 'HEAD') return json({ error: 'Demo drafts stay in your browser.' }, 405);
    const asset = path === '/demo' || path === '/demo/' ? 'studio.html' : path.slice('/demo/'.length);
    if (!/^(studio\.(html|css|js)|engine\.js|favicon\.svg|vendor\/[a-zA-Z0-9._-]+)$/.test(asset)) return json({ error: 'Not found.' }, 404);
    let bytes = await assetReader(asset);
    if(serverDocs&&asset==='engine.js')return new Response(clientEngine(Buffer.from(bytes).toString('utf8')),{headers:{'Content-Type':'text/javascript'}});
    if (asset === 'engine.js') {
     const source = Buffer.from(bytes).toString('utf8');
     const start = source.indexOf('async function four10(data)'), end = source.indexOf('const months=', start);
     if (start < 0 || end < 0) throw Error('Demo engine unavailable.');
     bytes = (source.slice(0,start) + source.slice(end)).replace('four10,extract,generic,fillCustom,findDates','extract,generic,fillCustom,findDates');
    }
    if(serverDocs&&asset==='studio.html')bytes=Buffer.from(bytes).toString('utf8').replace('<script src=', '<script>window.PITCH_SERVER_DOCUMENTS=true;</script><script src=');
    if (asset === 'studio.html') bytes = Buffer.from(bytes).toString('utf8').replaceAll('src="/pitcher/','src="/pitcher/demo/').replaceAll('href="/pitcher/studio.css','href="/pitcher/demo/studio.css').replace('<script src=', '<script>window.PITCH_DEMO=true;</script><script src=');
    const type = asset.endsWith('.html') ? 'text/html; charset=utf-8' : asset.endsWith('.js') ? 'text/javascript' : asset.endsWith('.css') ? 'text/css' : 'image/svg+xml';
    return new Response(request.method === 'HEAD' ? null : bytes, {headers:{'Content-Type':type}});
   }
   if (!secret || secret.length < 32 || !ownerEmail) return json({ error: 'Account setup is incomplete. Configure the owner email and session secret in Netlify.' }, 503);
   const store = storeFactory();
   const emailMode = env.PITCH_EMAIL_MODE === 'true' || !!env.SUPABASE_URL || !local;
   const emailReady = env.SUPABASE_URL && env.SUPABASE_PUBLISHABLE_KEY && env.PITCH_PUBLIC_URL;
   if (emailMode && (path === '/login' || path === '/signup' || path === '/callback')) {
    if (!emailReady) return emailSignInPage('Email sign-in is being connected. Please check back shortly.', 503);
    const authOrigin = new URL(env.SUPABASE_URL).origin;
    const publicOrigin = new URL(env.PITCH_PUBLIC_URL).origin;
    if (!authOrigin.startsWith('https://') || !publicOrigin.startsWith('https://')) throw Error('Use HTTPS for email sign-in.');
    const authRequest = async (endpoint, body) => fetcher(authOrigin + '/auth/v1/' + endpoint, { method: 'POST', headers: { apikey: env.SUPABASE_PUBLISHABLE_KEY, 'Content-Type': 'application/json' }, body: JSON.stringify(body), signal: AbortSignal.timeout(15000) });
    if (path === '/callback') {
     const params = request.method === 'POST' ? new URLSearchParams(await request.text()) : url.searchParams;
     const token = params.get('token_hash') || '';
     if (!token && request.method === 'GET') return emailSessionPage();
     const accessToken = request.method === 'POST' ? params.get('access_token') || '' : '';
     if (!/^[a-f0-9]{32,256}$/i.test(token) && !(accessToken.length > 20 && accessToken.length < 8192)) return emailSignInPage('This sign-in link is invalid. Request a new link.', 400);
     if (request.method === 'GET') return emailConfirmationPage(token);
     if (request.method !== 'POST') return json({ error: 'Method not allowed.' }, 405);
     const verified = accessToken ? await fetcher(authOrigin + '/auth/v1/user', { headers: { apikey: env.SUPABASE_PUBLISHABLE_KEY, Authorization: 'Bearer ' + accessToken }, signal: AbortSignal.timeout(15000) }) : await authRequest('verify', { token_hash: token, type: 'email' });
     if (!verified.ok) return emailSignInPage('This link has expired or was already used. Request a new link.', 401);
     const payload = await verified.json();
     const result = accessToken ? { access_token: accessToken, user: payload } : payload;
     const email = normalizeEmail(result.user?.email);
     if (!result.access_token || !result.user?.email_confirmed_at || result.user?.is_anonymous || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return emailSignInPage('We could not verify your email. Request a new link.', 401);
     const id = accountId(email), key = 'account/' + id;
     const existing = await store.getWithMetadata(key, { type: 'json' });
     const saved = await store.setJSON(key, { ...(existing?.data || {}), email, providerUserId: result.user.id, emailVerified: true, lastSignInAt: new Date().toISOString(), createdAt: existing?.data.createdAt || new Date().toISOString() }, existing ? { onlyIfMatch: existing.etag } : { onlyIfNew: true });
     if (!saved.modified && !(await store.get(key, { type: 'json' }))?.emailVerified) return emailSignInPage('Unable to finish signing in. Request a new link.', 503);
     await logEvent('sign_in',{user:id,owner:email===ownerEmail});
     return redirect('/studio.html', sessionValue(id, secret), local);
    }
    if (request.method === 'GET') return emailSignInPage();
    if (request.method !== 'POST') return json({ error: 'Method not allowed.' }, 405);
    const text = await request.text();
    if (text.length > 2048) return json({ error: 'Request too large.' }, 413);
    const email = normalizeEmail(new URLSearchParams(text).get('email'));
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) return emailSignInPage('Enter a valid email address.', 400);
    const destination = publicOrigin + base + '/callback';
    const sent = await authRequest('otp?redirect_to=' + encodeURIComponent(destination), { email, create_user: true });
    if (!sent.ok) return emailSignInPage(sent.status === 429 ? 'Please wait a minute before requesting another link.' : 'Unable to send a sign-in link right now. Please try again.', sent.status === 429 ? 429 : 503);
    return emailSignInPage('Check your inbox for your Pitcher sign-in link. You can open it on any device.');
   }
   if (path === '/login' || path === '/signup') {
    const mode = path.slice(1);
    if (request.method === 'GET') return authPage(mode);
    if (request.method !== 'POST') return json({ error: 'Method not allowed.' }, 405);
    const text = await request.text();
    if (text.length > 2048) return json({ error: 'Request too large.' }, 413);
    const form = new URLSearchParams(text), email = normalizeEmail(form.get('email')), password = form.get('password') || '';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 || password.length > 256) return authPage(mode, 'Enter a valid email and password.', 400);
    const id = accountId(email), owner = email === ownerEmail;
    if (mode === 'signup') {
     if (owner) return authPage(mode, 'This account is reserved. Please sign in with your owner credentials.', 403);
     if (password.length < 12) return authPage(mode, 'Use a password with at least 12 characters.', 400);
     const result = await store.setJSON('account/' + id, { email, passwordHash: await hashPassword(password), createdAt: new Date().toISOString() }, { onlyIfNew: true });
     if (!result.modified) return authPage(mode, 'Unable to create this account. Try signing in.', 409);
    } else {
     const account = owner ? null : await store.get('account/' + id, { type: 'json' });
     const ownerHash = env.PITCH_OWNER_PASSWORD_HASH || (env.PITCH_PASSWORD?.length >= 16 ? await hashPassword(env.PITCH_PASSWORD) : null);
     const dummyHash = '00000000000000000000000000000000:' + '0'.repeat(128);
     const correct = await checkPassword(password, (owner ? ownerHash : account?.passwordHash) || dummyHash);
     if (!correct || owner && !ownerHash || !owner && !account) return authPage(mode, 'Email or password is incorrect.', 401);
    }
    return redirect('/studio.html', sessionValue(id, secret), local);
   }
   const id = sessionId(request, secret), owner = id === accountId(ownerEmail);
   if (emailMode && id && !(await store.get('account/' + id, { type: 'json' }))?.emailVerified) return path.startsWith('/api/') || path.startsWith('/four10/') ? json({ error: 'Verified email sign-in required.' }, 401) : redirect('/login');
   if (!id || !owner && !await store.get('account/' + id, { type: 'json' })) return path.startsWith('/api/') || path.startsWith('/four10/') ? json({ error: 'Sign in required.' }, 401) : redirect('/login');
   if(path==='/api/billing/setup'){if(!owner)return json({error:'Not found.'},404);if(request.method!=='POST')return json({error:'Method not allowed.'},405);return setupBilling({request,env,store,ownerId:id,ownerEmail,renderer,assetReader});}
   if (path === '/logout') return redirect('/', '', local);
   if (path === '/analytics' || path === '/api/analytics') {
    if (!owner) return json({error:'Not found.'},404);
    if (request.method !== 'GET') return json({error:'Method not allowed.'},405);
    if (path === '/analytics') return new Response(await assetReader('analytics.html'),{headers:{'Content-Type':'text/html; charset=utf-8'}});
    const accounts=await store.list({prefix:'account/',paginate:false});
    const users=(await Promise.all(accounts.blobs.map(async b=>{const a=await store.get(b.key,{type:'json'});return a&&normalizeEmail(a.email)!==ownerEmail?{id:b.key.slice(8),email:a.email,createdAt:a.createdAt,lastSignInAt:a.lastSignInAt||null,plan:paidAccess(await store.get('billing/account/'+b.key.slice(8),{type:'json'}),false,billingEnvironment(env))?'Paid':'Free'}:null}))).filter(Boolean);
    const days=Array.from({length:30},(_,i)=>new Date(Date.now()-i*86400000).toISOString().slice(0,10));
    const lists=await Promise.all(days.map(d=>store.list({prefix:'analytics/'+d+'/',paginate:false})));
    const keys=lists.flatMap(l=>l.blobs.map(b=>b.key)).sort().reverse();
    const events=(await Promise.all(keys.slice(0,5000).map(k=>store.get(k,{type:'json'})))).filter(e=>e&&!e.owner);
    const guests=new Set(events.filter(e=>!e.user&&e.session).map(e=>e.session));
    const active=new Set(events.filter(e=>e.user).map(e=>e.user));
    const total=name=>events.filter(e=>e.event===name).length;
    return json({days:30,generatedAt:new Date().toISOString(),partial:keys.length>5000,totals:{freeUsers:users.filter(u=>u.plan==='Free').length,paidUsers:users.filter(u=>u.plan==='Paid').length,activeUsers:active.size,guestSessions:guests.size,signIns:total('sign_in'),previews:total('preview'),wordDownloads:total('word_download'),pdfDownloads:total('pdf_download')},daily:days.reverse().map(day=>({day,events:events.filter(e=>e.time.startsWith(day)).length})),users:users.map(u=>{const activity=events.filter(e=>e.user===u.id);return {...u,lastActiveAt:activity.map(e=>e.time).sort().at(-1)||null,exports:activity.filter(e=>e.event==='word_download'||e.event==='pdf_download').length}}).sort((a,b)=>(b.lastActiveAt||b.createdAt||'').localeCompare(a.lastActiveAt||a.createdAt||''))});
   }
   const billingRecord=await store.get('billing/account/'+id,{type:'json'}),hasPaid=paidAccess(billingRecord,owner,billingEnvironment(env)),paywall=env.PITCH_PAYWALL_ENABLED==='true';
   if(path==='/billing'&&request.method==='GET')return pricingPage({signedIn:true,paid:hasPaid,manage:!!billingRecord?.customerId,ready:billingReady(env)&&billingEnvironment(env)==='live'&&env.PITCH_PAYWALL_ENABLED==='true',message:url.searchParams.get('payment')==='return'?'Payment is being verified. Access opens after confirmation; refresh this page shortly.':''});
   if(path==='/api/billing/checkout'){
    if(request.method!=='POST')return json({error:'Method not allowed.'},405);
    if(billingEnvironment(env)==='live'&&env.PITCH_PAYWALL_ENABLED!=='true')return json({error:'Subscriptions are not open yet.'},503);
    if(billingEnvironment(env)==='sandbox'&&!owner)return json({error:'Subscriptions are being tested. Please check back shortly.'},503);
    if(hasPaid&&billingEnvironment(env)!=='sandbox')return new Response(null,{status:303,headers:{Location:'/pitcher/studio.html'}});
    const account=await store.get('account/'+id,{type:'json'});
    try{return new Response(null,{status:303,headers:{Location:await checkoutFor({env,store,id,email:account.email,origin:url.origin})}});}catch{return pricingPage({signedIn:true,ready:billingReady(env)&&billingEnvironment(env)==='live'&&env.PITCH_PAYWALL_ENABLED==='true',message:'Checkout is not ready. You have not been charged. Please try again later.'});}
   }
   if(path==='/api/billing/portal'){
    if(request.method!=='POST')return json({error:'Method not allowed.'},405);
    if(!billingRecord?.customerId)return json({error:'No billing customer found.'},404);
    const portal=await billingClient(env).customerPortal.createSession(billingRecord.customerId);const dest=new URL(portal.url);if(dest.protocol!=='https:'||!(dest.hostname==='bachs.io'||dest.hostname.endsWith('.bachs.io')))throw Error('Unexpected portal destination.');return new Response(null,{status:303,headers:{Location:dest.href}});
   }
   if(path==='/api/document'){
    if(request.method!=='POST')return json({error:'Method not allowed.'},405);
    const text=await request.text();if(text.length>2048)return json({error:'Request too large.'},413);const body=JSON.parse(text);
    if(!['preview','docx','pdf','starter'].includes(body.format)||!idValid(body.workspace))return json({error:'Invalid export request.'},400);
    if(body.format!=='preview'&&!hasPaid)return json({error:'Subscribe for US$10/month to download documents.',upgrade:'/pitcher/billing'},402);
    if(!serverDocs)return json({error:'Server document export is being connected.'},503);
    const workspace=await store.get('user/'+id+'/workspace/'+body.workspace,{type:'json'});if(!workspace||workspace.deleted||workspace.id==='four10'&&!owner)return json({error:'Workspace not found.'},404);
    if(workspace.revision!==body.revision)return json({error:'Workspace changed. Save and preview again.',conflict:true},409);
    const key='render-budget/'+id+'/'+new Date().toISOString().slice(0,13),budget=await store.getWithMetadata(key,{type:'json'});if((budget?.data?.count||0)>=30)return json({error:'Please try again later; this hour’s document limit has been reached.'},429);const claim=await store.setJSON(key,{count:(budget?.data?.count||0)+1},budget?{onlyIfMatch:budget.etag}:{onlyIfNew:true});if(!claim.modified)return json({error:'Preview is busy. Try again.'},429);
    const output=await renderer({workspace,selected:body.selected,format:body.format==='starter'?'docx':body.format,starter:body.format==='starter',assetReader,chromiumPack:env.PITCH_CHROMIUM_PACK});
    if(body.format==='preview')return json(output);
    await logEvent(body.format==='pdf'?'pdf_download':'word_download',{user:id,owner});
    return new Response(output.bytes,{headers:{'Content-Type':output.type,'Content-Disposition':'attachment; filename="Pitcher.'+(body.format==='pdf'?'pdf':'docx')+'"'}});
   }
   if (path === '/api/account') return json({ owner,paid:hasPaid,paywall,serverDocuments:serverDocs,billingReady:billingReady(env) });
   if (path.startsWith('/four10/') && !owner) return json({ error: 'Not found.' }, 404);
   const prefix = 'user/' + id + '/workspace/';
   if (path === '/api/workspaces') {
    if (request.method === 'GET') {
     const { blobs } = await store.list({ prefix, paginate: false });
     const entries = await Promise.all(blobs.map(b => store.get(b.key, { type: 'json' })));
     return json({ workspaces: entries.filter(w => w && !w.deleted).map(({ templateBytes, ...w }) => w), deletedIds: entries.filter(w => w?.deleted).map(w => w.id) });
    }
    if (request.method === 'DELETE') {
     const text = await request.text(); if (text.length > 2048) return json({error:'Request too large.'},413);
     const w = JSON.parse(text);
     if (!idValid(w.id) || w.id === 'four10' && !owner) return json({error:'Not found.'},404);
     const key = prefix + w.id, previous = await store.getWithMetadata(key,{type:'json'});
     if (!previous || previous.data.deleted) return json({error:'Workspace not found.'},404);
     if (previous.data.revision !== w.revision) return json({error:'Workspace changed on another device. Reload first.',conflict:true},409);
     const result = await store.setJSON(key,{id:w.id,deleted:true,revision:randomUUID(),updatedAt:new Date().toISOString()},{onlyIfMatch:previous.etag});
     return result.modified ? json({deleted:true}) : json({error:'Workspace changed on another device. Reload first.',conflict:true},409);
    }
    if (request.method !== 'POST') return json({ error: 'Method not allowed.' }, 405);
    const text = await request.text(); if (text.length > 1000000) return json({ error: 'Workspace is too large.' }, 413);
    const w = JSON.parse(text);
    if (!idValid(w.id) || typeof w.name !== 'string' || !w.name.trim() || w.name.length > 120 || !/^#[0-9a-f]{6}$/i.test(w.accent) || !w.data?.artists || typeof w.data.artists !== 'object' || Array.isArray(w.data.artists)) return json({ error: 'Invalid workspace.' }, 400);
    if (w.id === 'four10' && !owner) return json({ error: 'Not found.' }, 404);
    const key = prefix + w.id, previous = await store.getWithMetadata(key, { type: 'json' });
    if (previous?.data.deleted || previous && previous.data.revision !== w.revision || !previous && w.revision != null) return json({ error: 'Workspace changed on another device. Reload first.', conflict: true }, 409);
    if(paywall&&!hasPaid&&(!previous&&((await store.list({prefix,paginate:false})).blobs.length>0||w.name!=='My label'||w.kind!=='Label'||w.accent!=='#c8f04a')||previous&&(w.name!==previous.data.name||w.kind!==previous.data.kind||w.accent!==previous.data.accent)))return json({error:'Subscribe for US$10/month to customise workspaces.',upgrade:'/pitcher/billing'},402);
    const revision = randomUUID(), updatedAt = new Date().toISOString();
    const record = { id: w.id, name: w.name, kind: String(w.kind || 'Label').slice(0,50), accent: w.accent, data: w.data, revision, updatedAt, templateKey: previous?.data.templateKey || null, templateBytes: previous?.data.templateBytes || null };
    const result = await store.setJSON(key, record, previous ? { onlyIfMatch: previous.etag } : { onlyIfNew: true });
    return result.modified ? json({ revision, updatedAt }) : json({ error: 'Workspace changed on another device. Reload first.', conflict: true }, 409);
   }
   if (path === '/api/template') {
    if(paywall&&!hasPaid)return json({error:'Subscribe for US$10/month to customise templates.',upgrade:'/pitcher/billing'},402);
    if (!['GET','POST'].includes(request.method)) return json({ error: 'Method not allowed.' }, 405);
    const form = request.method === 'POST' ? await request.formData() : null;
    const id = form ? String(form.get('workspace')) : url.searchParams.get('workspace');
    if (!idValid(id)) return json({ error: 'Invalid workspace.' }, 400);
    if (id === 'four10' && !owner) return json({ error: 'Not found.' }, 404);
    const key = prefix + id, previous = await store.getWithMetadata(key, { type: 'json' });
    if (!previous || previous.data.deleted) return json({ error: 'Save the workspace first.' }, 404);
    if (!form) return previous.data.templateBytes ? new Response(Buffer.from(previous.data.templateBytes, 'base64'), { headers: { 'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' } }) : json({ error: 'No template attached.' }, 404);
    if (previous.data.revision !== String(form.get('revision'))) return json({ error: 'Workspace changed on another device. Reload first.', conflict: true }, 409);
    const file = form.get('file');
    if (!file || file.size > 4000000 || !file.name?.toLowerCase().endsWith('.docx')) return json({ error: 'Choose a DOCX below 4 MB.' }, 400);
    const bytes = Buffer.from(await file.arrayBuffer()), zip = await JSZip.loadAsync(bytes);
    if (!zip.file('word/document.xml') || zip.file('word/vbaProject.bin')) return json({ error: 'Use a standard DOCX template.' }, 400);
    const xml = await zip.file('word/document.xml').async('string');
    if (!xml.includes('artist_sections') && !xml.includes('artist_name')) return json({ error: 'Download the starter template to see the required artist placeholders.' }, 400);
    const revision = randomUUID(), templateKey = randomUUID();
    const result = await store.setJSON(key, { ...previous.data, revision, templateKey, templateBytes: bytes.toString('base64'), updatedAt: new Date().toISOString() }, { onlyIfMatch: previous.etag });
    return result.modified ? json({ revision, templateKey }) : json({ error: 'Workspace changed on another device. Reload first.', conflict: true }, 409);
   }
   if (request.method !== 'GET' && request.method !== 'HEAD') return json({ error: 'Method not allowed.' }, 405);
   
   if (!/^\/(studio\.(html|css|js)|engine\.js|favicon\.svg|four10\/(seed\.json|baseline\.json|map\.json|template\.docx)|vendor\/[a-zA-Z0-9._-]+)$/.test(path)) return json({ error: 'Not found.' }, 404);
   let bytes = await assetReader(path.slice(1));
   if(serverDocs&&path==='/engine.js')return new Response(clientEngine(Buffer.from(bytes).toString('utf8')),{headers:{'Content-Type':'text/javascript'}});
   if(serverDocs&&path==='/studio.html')bytes=Buffer.from(bytes).toString('utf8').replace('<script src=', '<script>window.PITCH_SERVER_DOCUMENTS=true;</script><script src=');
   if (path === '/engine.js' && !owner) {
    const source = Buffer.from(bytes).toString('utf8');
    const start = source.indexOf('async function four10(data)'), end = source.indexOf('const months=', start);
    if (start < 0 || end < 0) throw Error('Customer engine unavailable.');
    bytes = (source.slice(0, start) + source.slice(end)).replace('four10,extract,generic,fillCustom,findDates', 'extract,generic,fillCustom,findDates').replace('/* Browser document engine. Four10 uses the retained OOXML package, never a rebuilt design. */', '/* Browser document engine. */');
   }
   const type = path.endsWith('.html') ? 'text/html; charset=utf-8' : path.endsWith('.js') ? 'text/javascript' : path.endsWith('.css') ? 'text/css' : path.endsWith('.json') ? 'application/json' : path.endsWith('.svg') ? 'image/svg+xml' : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
   return new Response(request.method === 'HEAD' ? null : bytes, { headers: { 'Content-Type': type } });
  } catch { return json({ error: 'Unable to complete the request. Please retry.' }, 500); }
 };
}
const handler = createHandler();
export default async request => {
 const response = await handler(request);
 response.headers.set('Cache-Control', 'private, no-store');
 response.headers.set('X-Content-Type-Options', 'nosniff');
 response.headers.set('X-Frame-Options', 'SAMEORIGIN');
 response.headers.set('Referrer-Policy', 'same-origin');
 return response;
};

export const config = { path: ["/pitcher", "/pitcher/*"], rateLimit: { windowLimit: 120, windowSize: 60, aggregateBy: ["ip", "domain"] } };
