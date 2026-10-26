import { spawn } from 'node:child_process';
import { mkdtemp, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
const profile = await mkdtemp(path.join(tmpdir(), 'rite-seo-check-'));
const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', ['--headless=new','--disable-gpu','--no-first-run',`--user-data-dir=${profile}`,'--remote-debugging-port=9226','about:blank'],{windowsHide:true,stdio:'ignore'});
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
  await send('Network.enable');
  await send('Network.setCacheDisabled',{cacheDisabled:true});
  await send('Network.emulateNetworkConditions',{offline:false,latency:150,downloadThroughput:200000,uploadThroughput:93750});
  await send('Emulation.setCPUThrottlingRate',{rate:4});
  await send('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
  await send('Page.addScriptToEvaluateOnNewDocument',{source:`window.lab={lcp:0,cls:0};new PerformanceObserver(l=>{for(const e of l.getEntries())window.lab.lcp=e.startTime}).observe({type:'largest-contentful-paint',buffered:true});new PerformanceObserver(l=>{for(const e of l.getEntries())if(!e.hadRecentInput)window.lab.cls+=e.value}).observe({type:'layout-shift',buffered:true});`});
  const results=[];
  for(const url of ['https://www.ritetutor.com/','http://127.0.0.1:4173/']) {
    await send('Page.navigate',{url});
    await new Promise(r=>setTimeout(r,18000));
    const result=await evaluate('({...window.lab,ready:document.readyState,resources:performance.getEntriesByType("resource").length,domContentLoaded:performance.getEntriesByType("navigation")[0]?.domContentLoadedEventEnd})');
    results.push({url,...result});console.log(JSON.stringify(results.at(-1)));
  }
  await writeFile('output/seo/mobile-lab.json',JSON.stringify({date:'2026-10-26',conditions:'Chrome headless; 390x844; CPU 4x; 1.6 Mbps download, 150 ms latency; cold cache; analytics blocked; one 18-second sample each; local server uncompressed; NOT field data or INP',results},null,2));
  await send('Browser.close');
}finally{socket?.close();chrome.kill();}
