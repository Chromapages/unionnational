import {createRequire} from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const out=path.dirname(fileURLToPath(import.meta.url));
const require=createRequire(path.join(out,'../package.json'));
const {chromium}=require('playwright');
const results=[];const browser=await chromium.launch({headless:true,executablePath:'C:/Users/ericb/AppData/Local/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-win64/chrome-headless-shell.exe'});
const cases=[{id:'acknowledged',status:200,body:{success:true}},{id:'400',status:400,body:{success:false}},{id:'429',status:429,body:{success:false}},{id:'500',status:500,body:{success:false}},{id:'unacknowledged',status:200,body:{success:false}},{id:'malformed',status:200,body:'invalid json'},{id:'network',abort:true},{id:'double-click',status:200,body:{success:true},delay:1200}];
try{
for(const form of ['construction','strategy']) for(const test of cases){
 if(process.env.LEAD_CHECK_CASE&&!process.env.LEAD_CHECK_CASE.split(',').includes(`${form}:${test.id}`))continue;
 const context=await browser.newContext({viewport:{width:1280,height:900}});let requests=[];
 await context.route('**/*',async route=>{
  const req=route.request();const url=new URL(req.url());
  if(url.pathname==='/api/ghl/intake'&&req.method()==='POST'){
   requests.push(req.postDataJSON());
   if(test.abort)return route.abort();
   if(test.delay)await new Promise(resolve=>setTimeout(resolve,test.delay));
   return route.fulfill({status:test.status,contentType:'application/json',body:typeof test.body==='string'?test.body:JSON.stringify(test.body)});
  }
  return ['GET','HEAD'].includes(req.method())&&url.hostname==='127.0.0.1'?route.continue():route.abort();
 });
 const page=await context.newPage();page.setDefaultTimeout(12000);
 const record={form,case:test.id,network:'Every lead request intercepted locally; other write methods blocked.'};
 try{
  const url=form==='construction'?'/en/construction-profitability-assessment':'/es/intake';
  await page.goto('http://127.0.0.1:3533'+url,{waitUntil:'domcontentloaded',timeout:60000});
  const fillContact=async()=>{for(const [key,value] of Object.entries({firstName:'Audit',lastName:'Example',email:'audit@example.invalid',phone:'5550101234',companyName:'Synthetic Audit LLC'}))await page.locator(`[name=${key}]`).fill(value);};
  const waitHydrated=async(selector)=>page.waitForFunction(sel=>{const e=document.querySelector(sel);return e&&Object.keys(e).some(k=>k.startsWith('__reactProps$'));},selector,{timeout:30000});
  await waitHydrated('button[type=button]');await page.waitForTimeout(700);
  if(form==='construction'){
   for(const text of ['$500K-$1M','Yes, fully automated','Weekly / Real-time','Highly accurate / Data-driven','Monthly / Proactive'])await page.getByRole('button',{name:text,exact:true}).click();
   await fillContact();
  }else{
   await fillContact();const next=()=>page.getByRole('button',{name:/Continue/i}).click();await next();
   await page.locator('[name=industry]').selectOption('Restaurant');await page.locator('[name=state]').fill('Florida');
   for(const text of ['Service-Based','$1M-$3M'])await page.getByText(text,{exact:true}).click();await next();
   for(const text of ['LLC (Single)','Yes, I have an accountant','Books are current'])await page.getByText(text,{exact:true}).click();await next();
   await page.locator('[name=primaryPainPoint]').fill('Synthetic cash flow concern');await page.getByText('Proactive Tax Planning',{exact:true}).click();await next();
   for(const text of ['Looking for next year','Maybe, depending on ROI','Receive Email Summary'])await page.getByText(text,{exact:true}).click();
  }
  const submit=page.locator('button[type=submit]');
  if(test.id==='double-click')await submit.dblclick();else await submit.click();
  await page.waitForTimeout(test.delay?1800:650);
  record.requests=requests.length;record.payload=requests[0];record.url=page.url();record.alerts=await page.locator('[role=alert]').allTextContents();
  record.received=await page.getByText('Assessment Received',{exact:true}).count()>0;
  record.formRemaining=await page.locator('button[type=submit]').count()>0;
  record.retry=await page.getByRole('button',{name:'Retry Submission',exact:true}).count()>0;
  record.body=(await page.locator('body').innerText()).slice(-1400);
  record.expected=test.status===200&&typeof test.body==='object'&&test.body.success===true?'acknowledged success':'retryable error';
  record.passed=requests.length===1&&(record.expected==='acknowledged success'?!record.formRemaining:record.formRemaining&&record.retry&&record.alerts.length>0&&!record.received);
 }catch(e){record.blocked=e.message;record.requests=requests.length;}
 results.push(record);fs.writeFileSync(path.join(out,'lead-browser-check-current.json'),JSON.stringify(results,null,2));console.log(JSON.stringify({form,case:test.id,passed:record.passed,requests:record.requests,blocked:record.blocked}));await context.close();
}
}finally{await browser.close();}
