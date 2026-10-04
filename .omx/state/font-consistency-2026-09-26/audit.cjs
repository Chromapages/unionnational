const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');
const dir = '.omx/state/font-consistency-2026-09-26';
function walk(folder) { return fs.readdirSync(folder,{withFileTypes:true}).flatMap(entry=>entry.isDirectory()?walk(path.join(folder,entry.name)):[path.join(folder,entry.name)]); }
const routes = [...new Set(walk('src/app').filter(file=>file.endsWith('page.tsx')).flatMap(file=>{
 const route=path.relative('src/app',path.dirname(file)).replaceAll('\\','/');
 if(route.startsWith('hq')) return [];
 return (route.includes('[locale]')?['en','es'].map(locale=>'/'+route.replace('[locale]',locale)):['/'+route]).filter(value=>!value.includes('['));
}))];
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'});
 const context=await browser.newContext({viewport:{width:1440,height:960}});
 const results=[]; const discovered=new Set(); let cursor=0;
 async function inspect(route){
  const page=await context.newPage();
  try{
   const response=await page.goto('http://localhost:3001'+route,{waitUntil:'domcontentloaded',timeout:60000});
   await page.locator('h1:visible,h2:visible,h3:visible').first().waitFor({state:'visible',timeout:15000}).catch(()=>{});
   await page.waitForTimeout(600);
   await page.evaluate(()=>Promise.race([document.fonts.ready,new Promise(resolve=>setTimeout(resolve,5000))]));
   const values=await page.evaluate(()=>{
    const visible=el=>{const style=getComputedStyle(el);return el.getClientRects().length>0 && style.visibility!=='hidden' && style.display!=='none';};
    const textElements=Array.from(document.querySelectorAll('body *')).filter(el=>!['SCRIPT','STYLE','SVG','PATH','NOSCRIPT','NEXTJS-PORTAL'].includes(el.tagName)&&Array.from(el.childNodes).some(node=>node.nodeType===Node.TEXT_NODE&&node.textContent.trim())&&visible(el));
    const wrong=textElements.filter(el=>!getComputedStyle(el).fontFamily.match(/^(?:"?Inter|"?Outfit)/i)&&!el.closest('pre,code,kbd,samp')).map(el=>({tag:el.tagName,text:el.textContent.trim().slice(0,70),family:getComputedStyle(el).fontFamily}));
    const headings=Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6')).filter(visible).filter(el=>!getComputedStyle(el).fontFamily.includes('Outfit')).map(el=>({tag:el.tagName,text:el.textContent.trim().slice(0,70),family:getComputedStyle(el).fontFamily}));
    return {body:getComputedStyle(document.body).fontFamily,fontsLoaded:['Inter','Outfit'].every(name=>document.fonts.check('16px '+name)),visibleTextElements:textElements.length,headings,unexpected:wrong.slice(0,15),overflow:document.documentElement.scrollWidth-innerWidth,links:Array.from(document.querySelectorAll('a[href]')).map(a=>a.getAttribute('href')).filter(Boolean)};
   });
   values.links.filter(href=>/^\/(en|es)\/(blog|books|shop|services|hub\/industries|hub\/s-corp-playbook)\/[^?#]+$/.test(href)).forEach(href=>discovered.add(href));
   delete values.links;
   const result={route,url:page.url(),status:response?.status(),...values};results.push(result);
   if(['/en/about','/en/industries','/en/resources','/en/services'].includes(route)) await page.screenshot({path:dir+'/after-'+route.split('/').pop()+'.png'});
   if(values.unexpected.length||values.headings.length||values.overflow>0||result.status>=400) console.log(JSON.stringify(result));
   if(results.length%10===0)console.log('Inspected '+results.length+' routes');
  }catch(error){results.push({route,error:String(error)});console.log(JSON.stringify({route,error:String(error)}));}
  finally {await page.close();fs.writeFileSync(dir+'/route-audit.json',JSON.stringify(results,null,2));}
 }
 console.log('Public static routes: '+routes.length);
 await Promise.all(Array.from({length:3},async()=>{while(cursor<routes.length){const route=routes[cursor++];await inspect(route);}}));
 const examples=[...discovered].filter(route=>!routes.includes(route));
 const groups=new Set();
 for(const route of examples){const key=route.split('/').slice(0,3).join('/');if(groups.has(key))continue;groups.add(key);await inspect(route);}
 fs.writeFileSync(dir+'/discovered-detail-routes.json',JSON.stringify(examples,null,2));
 console.log(JSON.stringify({total:results.length,errors:results.filter(r=>r.error||r.status>=400).length,fontExceptions:results.filter(r=>r.unexpected?.length||r.headings?.length).length,overflow:results.filter(r=>r.overflow>0).length}));
 await browser.close();
})();
