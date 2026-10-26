import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium-min';

// The renderer only sees this application's local assets. Campaign links are never fetched.
export async function renderDocument({workspace,selected,format,assetReader,executablePath,chromiumPack,starter=false}) {
 const browser=await puppeteer.launch({executablePath:executablePath||await chromium.executablePath(chromiumPack||'https://github.com/Sparticuz/chromium/releases/download/v153.0.0/chromium-v153.0.0-pack.x64.tar'),args:executablePath?["--no-sandbox","--disable-setuid-sandbox"]:chromium.args,headless:true});
 try{
 const page=await browser.newPage();page.setDefaultTimeout(15000);await page.setViewport({width:1000,height:1200,deviceScaleFactor:1});
 await page.setRequestInterception(true);
 page.on('request',async req=>{try{const u=new URL(req.url());if(u.protocol==='data:'||u.protocol==='blob:')return req.continue();if(u.origin!=='https://pitcher.invalid')return req.abort();if(u.pathname==='/')return req.respond({status:200,contentType:'text/html',body:'<!doctype html><html><head><style>body{margin:0;background:white}.docx-wrapper{padding:0!important;background:none!important}section.docx{margin:0!important;box-shadow:none!important;box-sizing:border-box;break-after:page}@media print{body{margin:0}@page{margin:0}section.docx:last-child{break-after:auto}}</style></head><body><div id="pages"></div></body></html>'});if(u.pathname==='/custom.docx'&&workspace.templateBytes)return req.respond({body:Buffer.from(workspace.templateBytes,'base64')});const name=u.pathname.replace(/^\/pitcher\//,'');if(!/^four10\/(template.docx|baseline.json|map.json)$/.test(name)||workspace.id!=='four10')return req.abort();return req.respond({body:await assetReader(name)});}catch{return req.abort();}});
 await page.goto('https://pitcher.invalid/',{waitUntil:'domcontentloaded'});
 for(const name of ['vendor/jszip.min.js','vendor/docx-builder.js'])await page.addScriptTag({content:Buffer.from(await assetReader(name)).toString('utf8')});
 await page.evaluate(()=>{window.docxBuilder=window.docx});
 await page.addScriptTag({content:Buffer.from(await assetReader('vendor/docx-preview.min.js')).toString('utf8')});
 await page.addScriptTag({content:Buffer.from(await assetReader('engine.js')).toString('utf8')});
 const encoded=await page.evaluate(async({w,selected,starter})=>{const data=ReineEngine.scopeDraft(w.data,selected),scoped={...w,data};if(!Object.values(data.artists).some(a=>a.include))throw Error('Choose at least one artist.');const layout=data.export_layout||(w.templateKey&&w.id!=='four10'?'template':'compact');const blob=starter?await ReineEngine.generic(scoped,true):layout==='compact'?await ReineEngine.compact(scoped):w.id==='four10'?await ReineEngine.four10(data):w.templateBytes?await ReineEngine.fillCustom(scoped,await fetch('/custom.docx').then(r=>r.arrayBuffer())):await ReineEngine.generic(scoped);const bytes=new Uint8Array(await blob.arrayBuffer());let s='';for(const b of bytes)s+=String.fromCharCode(b);return btoa(s);},{w:workspace,selected,starter});
 if(format==='docx')return {bytes:Buffer.from(encoded,'base64'),type:'application/vnd.openxmlformats-officedocument.wordprocessingml.document'};
 await page.evaluate(async encoded=>{const bytes=Uint8Array.from(atob(encoded),c=>c.charCodeAt(0));await window.docx.renderAsync(bytes,document.getElementById('pages'),null,{inWrapper:true,ignoreHeight:false,ignoreWidth:false,breakPages:true,ignoreLastRenderedPageBreak:true,renderAltChunks:false,useBase64URL:true});await document.fonts.ready;},encoded);
 const studio=Buffer.from(await assetReader('studio.js')).toString('utf8');const from=studio.indexOf('function paginate(root)'),to=studio.indexOf('function previewDocument()',from);if(from<0||to<0)throw Error('Paginator unavailable');await page.addScriptTag({content:studio.slice(from,to)+';paginate(document.getElementById("pages"));'});
 const pages=await page.$$('section.docx');if(!pages.length||pages.length>20)throw Error('Preview supports up to 20 pages. Choose fewer artists.');
 if(format==='preview'){const images=[];for(const p of pages){const b=await p.boundingBox();images.push({src:'data:image/png;base64,'+Buffer.from(await p.screenshot({type:'png'})).toString('base64'),width:b.width,height:b.height});}if(images.reduce((n,p)=>n+p.src.length,0)>4500000)throw Error("This preview is too large. Choose fewer artists.");return {images};}
 const size=await pages[0].boundingBox();return {bytes:Buffer.from(await page.pdf({width:size.width+'px',height:size.height+'px',printBackground:true,preferCSSPageSize:false})),type:'application/pdf'};
 }finally{await browser.close();}
}
