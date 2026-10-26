import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHandler} from './functions/pitcher.mjs';
test('anonymous demo exposes only generic browser assets and cannot access private records',async()=>{
const handler=createHandler({env:{PITCH_LOCAL_PREVIEW:'true'},storeFactory:()=>{throw Error('Demo must not access online storage')},assetReader:path=>readFile(new URL('./pitch-assets/'+path,import.meta.url))});
const get=path=>handler(new Request('http://localhost/pitcher'+path));
const page=await get('/demo/');assert.equal(page.status,200);assert.match(await page.text(),/window.PITCH_DEMO=true/);
const engine=await get('/demo/engine.js');assert.equal(engine.status,200);assert.doesNotMatch(await engine.text(),/async function four10\(data\)/);
for(const path of ['/demo/four10/seed.json','/demo/four10/template.docx','/demo/api/workspaces','/demo/../four10/template.docx'])assert.notEqual((await get(path)).status,200);
assert.equal((await handler(new Request('http://localhost/pitcher/demo/',{method:'POST',headers:{origin:'http://localhost'},body:'private notes'}))).status,405);
});
