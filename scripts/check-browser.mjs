import { spawn } from 'node:child_process';
import { mkdtemp, writeFile, mkdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
await mkdir('tmp/seo', { recursive: true });
const profile = await mkdtemp(path.join(tmpdir(), 'rite-seo-check-'));
const chrome = spawn(process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', ['--headless=new','--disable-gpu','--no-first-run',`--user-data-dir=${profile}`,'--remote-debugging-port=9226','about:blank'],{windowsHide:true,stdio:'ignore'});
let socket;
try {
  let targets;
  for(let i=0;i<50;i++){try{targets=await(await fetch('http://127.0.0.1:9226/json')).json();break;}catch{await new Promise(r=>setTimeout(r,100));}}
  socket=new WebSocket(targets.find(t=>t.type==='page').webSocketDebuggerUrl);
  await new Promise(r=>socket.addEventListener('open',r,{once:true}));
  let id=0;const pending=new Map();const errors=[];
  socket.addEventListener('message',e=>{const m=JSON.parse(e.data);if(pending.has(m.id)){const p=pending.get(m.id);pending.delete(m.id);m.error?p.reject(m.error):p.resolve(m.result);}if(m.method==='Runtime.exceptionThrown')errors.push(m.params.exceptionDetails.exception?.description||m.params.exceptionDetails.text);if(m.method==='Runtime.consoleAPICalled'&&m.params.type==='error'){const t=m.params.args.map(a=>a.value||a.description||'').join(' ');if(/React|hydration|Hydration|Minified/i.test(t))errors.push(t);}});
  const send=(method,params={})=>new Promise((resolve,reject)=>{pending.set(++id,{resolve,reject});socket.send(JSON.stringify({id,method,params}));});
  const evaluate=async expression=>(await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true})).result.value;
  socket.addEventListener('message', async event => {
    const message=JSON.parse(event.data);
    if(message.method!=='Fetch.requestPaused')return;
    const {requestId,request}=message.params;
    try {
      if (!request.url.includes('/backend/api/')) { await send('Fetch.failRequest',{requestId,errorReason:'BlockedByClient'}); return; }
      if(request.method==='OPTIONS') {
        await send('Fetch.fulfillRequest',{requestId,responseCode:204,responseHeaders:[{name:'Access-Control-Allow-Origin',value:'http://127.0.0.1:4173'},{name:'Access-Control-Allow-Methods',value:'GET, OPTIONS'},{name:'Access-Control-Allow-Headers',value:'Content-Type'}]});
        return;
      }
      if(request.method!=='GET')throw new Error('Only read-only API calls are allowed in this check.');
      const response=await fetch(request.url);
      const body=Buffer.from(await response.arrayBuffer()).toString('base64');
      await send('Fetch.fulfillRequest',{requestId,responseCode:response.status,responseHeaders:[{name:'Content-Type',value:'application/json'},{name:'Access-Control-Allow-Origin',value:'http://127.0.0.1:4173'}],body});
    }catch(error){errors.push(error.message);await send('Fetch.failRequest',{requestId,errorReason:'Failed'});}
  });
  await send('Fetch.enable',{patterns:[{urlPattern:'https://ritetutor.com/backend/api/*'},{urlPattern:'https://www.googletagmanager.com/*'},{urlPattern:'https://www.clarity.ms/*'}]});
  await send('Page.enable');await send('Runtime.enable');
  for(const width of [1365,390]){
    await send('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:width===390});
    for(const [index,route] of ['/','/online-tutoring-bloomington-indiana','/online-tutoring-all-subjects','/courses','/courses/22','/blogs/choose-online-tutor-parent-checklist'].entries()){
      await send('Page.navigate',{url:'http://127.0.0.1:4173'+route});
      let state;
      for(let i=0;i<200;i++){
        state=JSON.parse(await evaluate(`JSON.stringify({title:document.title,h1:document.querySelector('h1')?.textContent,h1Count:document.querySelectorAll('h1').length,canonicals:document.querySelectorAll('link[rel=canonical]').length,canonical:document.querySelector('link[rel=canonical]')?.href,ready:document.readyState!=='loading'&&window.dataLayer?.some(e=>e.event==='public_page_view'&&e.page_path===location.pathname),width:innerWidth,contentWidth:document.documentElement.scrollWidth,localImages:[...document.querySelectorAll('img[src$=".webp"]')].filter(i=>i.getBoundingClientRect().top<innerHeight).every(i=>i.complete&&i.naturalWidth>0)})`));
        if(state.h1Count===1&&state.ready&&state.canonical==='https://www.ritetutor.com'+route&&state.localImages)break;
        await new Promise(r=>setTimeout(r,100));
      }
      if(state.h1Count!==1||state.canonicals!==1||state.contentWidth>state.width||!state.ready||!state.localImages)throw new Error(JSON.stringify({route,width,...state}));
      if(route==='/courses/22'&&state.h1!=='Online Python Classes for Kids & Teens')throw new Error('Course refresh failed: '+state.h1);
      console.log(width,route,state.h1);
      if(index<2){await evaluate('document.fonts.ready');const shot=await send('Page.captureScreenshot',{format:'png'});await writeFile(`tmp/seo/${width}-${index}.png`,Buffer.from(shot.data,'base64'));}
      if(route==='/'){
        await evaluate(`[...document.querySelectorAll('button')].find(b=>b.textContent.includes('Book Your Free Strategy Call')).click()`);
        await new Promise(r=>setTimeout(r,350));
        if(!await evaluate(`!!document.querySelector('[role="dialog"] form')`))throw new Error('Contact modal did not open.');
        await send('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});
        await send('Input.dispatchKeyEvent',{type:'keyUp',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});
      }
    }
  }
  await send('Page.navigate',{url:'http://127.0.0.1:4173/'});
  await new Promise(r=>setTimeout(r,800));
  await evaluate(`document.querySelector('[aria-controls="mobile-navigation"]').click()`);
  if(!await evaluate(`document.querySelector('[aria-controls="mobile-navigation"]').getAttribute("aria-expanded") === "true"`)) throw new Error('Mobile menu did not expand');
  if(await evaluate('document.querySelector("#mobile-navigation a[href*=sign-in]").href') !== 'https://ritetutor.com/sign-in') throw new Error('Login must leave the marketing router');
  await evaluate('[...document.querySelectorAll("#mobile-navigation a")].find(a=>a.getAttribute("href")==="/courses").click()');
  await new Promise(r=>setTimeout(r,1000));
  if(await evaluate('document.querySelector("link[rel=canonical]").href') !== 'https://www.ritetutor.com/courses') throw new Error('Client navigation canonical wrong');
  for (const path of ['/seo-missing-test', '/courses/99999999', '/blogs/deleted-test']) {
    const response = await fetch('http://127.0.0.1:4173' + path);
    if (response.status !== 404) throw new Error('Missing HTTP 404: ' + path);
    await send('Page.navigate', {url: 'http://127.0.0.1:4173' + path});
    await new Promise(r => setTimeout(r, 700));
    if (!await evaluate(`document.querySelector('h1')?.textContent === '404' && document.querySelector('meta[name=robots]')?.content.includes('noindex')`)) throw new Error('404 hydration changed error content: ' + path);
  }
  // No-JavaScript users must still see the local page's content and links.
  await send('Emulation.setScriptExecutionDisabled',{value:true});
  await send('Page.navigate',{url:'http://127.0.0.1:4173/online-tutoring-bloomington-indiana'});
  await new Promise(r=>setTimeout(r,700));
  const shot=await send('Page.captureScreenshot',{format:'png'});await writeFile('tmp/seo/no-javascript.png',Buffer.from(shot.data,'base64'));
  console.log('React/hydration errors:',errors.length);
  if(errors.length)throw new Error(errors.join('\n'));
  await send('Browser.close');
}finally{socket?.close();chrome.kill();}
