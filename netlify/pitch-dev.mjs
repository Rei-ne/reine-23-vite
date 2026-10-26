import { createHandler } from './functions/pitcher.mjs';
import { hashPassword, authPage, redirect } from './pitch-auth.mjs';
import { randomBytes, randomUUID } from 'node:crypto';
import { readFile, writeFile, mkdir } from 'node:fs/promises';

// Development only: real isolated accounts, no automatic owner sign-in.
export function pitchDevPlugin() {
 const records=new Map(); let writes=Promise.resolve(),initialized;
 const authPath='.netlify/pitch-owner.json';
 const env={PITCH_LOCAL_PREVIEW:'true',PITCH_EMAIL_MODE:'true'};
 const persist=()=>{writes=writes.then(async()=>{await mkdir('.netlify',{recursive:true});await writeFile('.netlify/pitch-local.json',JSON.stringify([...records]),{mode:0o600})});return writes};
 const store={
  list:async({prefix})=>({blobs:[...records.keys()].filter(key=>key.startsWith(prefix)).map(key=>({key}))}),
  get:async key=>records.get(key)?.data||null,
  getWithMetadata:async key=>records.get(key)||null,
  setJSON:async(key,data,opts)=>{
   const old=records.get(key);
   if(opts.onlyIfNew&&old||opts.onlyIfMatch&&old?.etag!==opts.onlyIfMatch)return {modified:false};
   records.set(key,{data:structuredClone(data),etag:randomUUID()});await persist();return {modified:true};
  }
 };
 const initialize=async()=>{
  await mkdir('.netlify',{recursive:true});
  try{Object.assign(env,JSON.parse(await readFile(authPath,'utf8')));env.PITCH_EMAIL_MODE='true'}catch{
   env.PITCH_SESSION_SECRET=randomBytes(32).toString('hex');
   env.PITCH_OWNER_EMAIL='reinetoyosii@gmail.com';
   await writeFile(authPath,JSON.stringify(env),{mode:0o600});
  }
  try{for(const [key,value] of JSON.parse(await readFile('.netlify/pitch-local.json','utf8')))records.set(key,value)}catch{}
 };
 const handler=createHandler({storeFactory:()=>store,env});
 return {name:'reine-pitch-local-preview',apply:'serve',configureServer(server){
  server.middlewares.use(async(req,res,next)=>{
   let decoded=req.url?.split('?')[0]||'';
   try{for(let i=0;i<3;i++)decoded=decodeURIComponent(decoded)}catch{res.statusCode=400;res.end('Invalid URL');return}
   if(decoded.toLowerCase().split(/[\\/]/).some(segment=>segment==='netlify'||segment==='.netlify'||segment==='.git'||segment.startsWith('.env'))){res.statusCode=403;res.end('Private project files');return}
   if(req.url?.split('?')[0].match(/^\/pitch-generator(?:\/|$)/)){res.writeHead(302,{Location:req.url.replace('/pitch-generator','/pitcher')});res.end();return}
   if(!req.url?.split('?')[0].match(/^\/pitcher(?:\/|$)/))return next();
   if(!['127.0.0.1','::1','::ffff:127.0.0.1'].includes(req.socket.remoteAddress)){res.statusCode=403;res.end('Local preview only');return}
   try{
    await (initialized ||= initialize());
    if(req.url==='/pitcher'){res.writeHead(302,{Location:'/pitcher/'});res.end();return}
    const headers=new Headers();for(const [key,value] of Object.entries(req.headers))if(value)headers.set(key,Array.isArray(value)?value.join(','):value);
    const chunks=[];let length=0;for await(const chunk of req){length+=chunk.length;if(length>6000000){res.statusCode=413;res.end('Request too large');return}chunks.push(chunk)}
    const origin=`http://${req.headers.host}`;
    const request=new Request(origin+req.url,{method:req.method,headers,body:['GET','HEAD'].includes(req.method)?undefined:Buffer.concat(chunks)});
    let response;
    if(req.url==='/pitcher/setup-owner'){
     if(env.PITCH_OWNER_PASSWORD_HASH)response=redirect('/login');
     else if(req.method==='GET')response=authPage('setup-owner');
     else if(req.method==='POST'&&headers.get('origin')===origin){
      const password=new URLSearchParams(await request.text()).get('password')||'';
      if(password.length<12||password.length>256)response=authPage('setup-owner','Use a password between 12 and 256 characters.',400);
      else{
       const hash=await hashPassword(password);
       // A second simultaneous setup may not replace the first owner password.
       if(!env.PITCH_OWNER_PASSWORD_HASH){env.PITCH_OWNER_PASSWORD_HASH=hash;await writeFile(authPath,JSON.stringify(env),{mode:0o600})}
       response=redirect('/login');
      }
     }else response=new Response('Request denied',{status:403});
    }else response=await handler(request);
    res.statusCode=response.status;response.headers.forEach((value,key)=>res.setHeader(key,value));
    res.setHeader('Cache-Control','private, no-store');res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('X-Frame-Options','SAMEORIGIN');
    res.end(Buffer.from(await response.arrayBuffer()));
   }catch{res.statusCode=500;res.end('Local preview failed')}
  });
 }};
}
