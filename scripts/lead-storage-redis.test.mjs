import assert from 'node:assert/strict';
import test from 'node:test';
import net from 'node:net';
import http from 'node:http';
import {spawn} from 'node:child_process';
import {mkdtemp,writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {randomUUID} from 'node:crypto';
import {setTimeout as delay} from 'node:timers/promises';
import {Redis} from '@upstash/redis';
import {LEAD_RESERVATION_NX,LEAD_DELIVERY_CAS,reconciledLeadRecord} from '../src/lib/leads/delivery-protocol.mjs';

// Dedicated local fixtures only. Never read .env or accept a provider URL.
// ponytail: RESP2 scalar replies only; extend the fixture client if array commands become necessary.
function command(port,password,...args){
  return new Promise((resolve,reject)=>{
    const socket=net.createConnection({host:'127.0.0.1',port});let data=Buffer.alloc(0),authenticated=false,settled=false;
    const encode=values=>Buffer.from(`*${values.length}\r\n`+values.map(value=>{const s=String(value);return `$${Buffer.byteLength(s)}\r\n${s}\r\n`;}).join(''));
    const finish=(error,value)=>{if(settled)return;settled=true;socket.destroy();if(error)reject(error);else resolve(value);};
    socket.setTimeout(2000,()=>finish(new Error('Fixture command deadline')));
    socket.on('error',error=>finish(error));
    socket.on('end',()=>finish(new Error('Fixture connection closed before acknowledgement')));
    socket.on('connect',()=>socket.write(encode(['AUTH',password])));
    socket.on('data',chunk=>{
      data=Buffer.concat([data,chunk]);if(data.length>65536)return finish(new Error('Fixture response bound'));
      const end=data.indexOf('\r\n');if(end<0)return;
      const kind=String.fromCharCode(data[0]),line=data.subarray(1,end).toString();
      if(kind==='-')return finish(new Error(line));
      let value=line;
      if(kind==='$'){
        const size=Number(line);if(size===-1)value=null;
        else{if(data.length<end+2+size+2)return;value=data.subarray(end+2,end+2+size).toString();}
      }else if(kind===':')value=Number(line);
      else if(kind!=='+')return finish(new Error('Unexpected fixture reply'));
      if(!authenticated){if(value!=='OK')return finish(new Error('Fixture authentication failed'));authenticated=true;data=Buffer.alloc(0);socket.write(encode(args));}
      else finish(null,value);
    });
  });
}

async function freePort(){const server=net.createServer();await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));const port=server.address().port;await new Promise(resolve=>server.close(resolve));return port;}

test('literal Redis lead reservation and recovery protocol', {timeout:60000}, async t=>{
  const service=process.env.REDIS_FIXTURE_LOCAL_SERVICE==='true';
  const password=service?'fixture-ci-redis-only':randomUUID();
  const port=service?Number(process.env.REDIS_FIXTURE_PORT):await freePort();
  assert.ok(Number.isInteger(port)&&port>1024&&port<=65535,'Use an isolated local high port');
  const directory=service?undefined:await mkdtemp(join(tmpdir(),'unt-redis-data-'));
  if(directory)await writeFile(join(directory,'fixture.conf'),`bind 127.0.0.1\nprotected-mode yes\nport ${port}\nrequirepass ${password}\nsave ""\nappendonly no\nloglevel warning\n`);
  const start=()=>spawn(process.env.REDIS_SERVER_BIN||'redis-server',['fixture.conf'],{cwd:directory,windowsHide:true,stdio:'ignore'});
  let processHandle=service?undefined:start(),startError;
  processHandle?.on('error',error=>{startError=error;});
  const call=(...args)=>command(port,password,...args);
  async function stopOwned(child){
    if(!child?.pid||child.exitCode!==null||child.signalCode!==null)return;
    const exited=new Promise(resolve=>child.once('exit',()=>resolve(true)));
    try{await call('SHUTDOWN','NOSAVE');}catch{}
    if(!await Promise.race([exited,delay(2000,false,{ref:false})])){
      child.kill();if(!await Promise.race([exited,delay(2000,false,{ref:false})]))throw new Error('Owned fixture child did not exit');
    }
  }
  async function ready(){for(let i=0;i<60;i++){if(startError)throw startError;try{if(await call('PING')==='PONG')return;}catch{}await delay(100);}throw new Error('Local Redis fixture unavailable');}
  let bridge;
  try{
    await ready();assert.equal(await call('DBSIZE'),0,'Fixture database must be empty and dedicated');
    const prefix=`unt-test:${randomUUID()}:`,record={owner:randomUUID(),payloadHash:'a'.repeat(64),state:'pending',updatedAt:new Date().toISOString()};
    const key=prefix+'receipt',counter=prefix+'capacity';
    const reserve=(receipt=key,budget=counter,limit=10)=>call('EVAL',LEAD_RESERVATION_NX,2,receipt,budget,JSON.stringify(record),limit);
    await t.test('empty store seeds accounting and uses literal MSET atomically',async()=>{
      assert.equal(await reserve(),1);assert.equal(await call('GET',counter),'1');assert.deepEqual(JSON.parse(await call('GET',key)),record);
    });
    await t.test('legacy/unrelated keys conservatively seed a missing counter',async()=>{
      const count=await call('DBSIZE');assert.equal(await reserve(prefix+'legacy',prefix+'new-counter',100),count+1);
    });
    await t.test('concurrent last-slot claims admit exactly one and retain duplicates at capacity',async()=>{
      await call('SET',counter,9);const results=await Promise.all([reserve(prefix+'a'),reserve(prefix+'b')]);
      assert.deepEqual(results.toSorted((a,b)=>a-b),[-1,10]);assert.equal(await reserve(),0);assert.equal(await call('GET',counter),'10');
    });
    await t.test('corrupt and wrong-type accounting fail without creating a receipt',async()=>{
      for(const invalid of ['bad','-1','1.5']){await call('SET',counter,invalid);await assert.rejects(reserve(prefix+'invalid'),/Invalid lead capacity/);assert.equal(await call('EXISTS',prefix+'invalid'),0);assert.equal(await call('GET',counter),invalid);}
      await call('DEL',counter);await call('SADD',counter,'fixture');await assert.rejects(reserve(prefix+'wrong-type'),/WRONGTYPE/);assert.equal(await call('EXISTS',prefix+'wrong-type'),0);await call('DEL',counter);
    });
    await t.test('storage rejection leaves both reservation and accounting unchanged',async()=>{
      await call('SET',counter,3);await call('CONFIG','SET','maxmemory',1);
      try{await assert.rejects(reserve(prefix+'oom'),/OOM/);assert.equal(await call('GET',counter),'3');assert.equal(await call('EXISTS',prefix+'oom'),0);}finally{await call('CONFIG','SET','maxmemory',0);}
    });
    await t.test('lost acknowledgement cannot create a second reservation',async()=>{
      const sockets=new Set();
      const proxy=net.createServer(client=>{
        const upstream=net.createConnection({host:'127.0.0.1',port});sockets.add(client);sockets.add(upstream);client.pipe(upstream);
        let authenticated=false,auth=Buffer.alloc(0);
        upstream.on('data',chunk=>{
          if(!authenticated){auth=Buffer.concat([auth,chunk]);if(auth.length<5)return;if(auth.toString()!=='+OK\r\n'){client.destroy();upstream.destroy();return;}authenticated=true;client.write(auth);}
          else{upstream.destroy();client.destroy();}
        });
        for(const socket of [client,upstream]){socket.on('error',()=>{client.destroy();upstream.destroy();});socket.on('close',()=>sockets.delete(socket));}
      });
      await new Promise(resolve=>proxy.listen(0,'127.0.0.1',resolve));
      try{
        await assert.rejects(command(proxy.address().port,password,'EVAL',LEAD_RESERVATION_NX,2,prefix+'ambiguous',counter,JSON.stringify(record),100));
        assert.equal(await call('EXISTS',prefix+'ambiguous'),1);const count=await call('GET',counter);assert.equal(await reserve(prefix+'ambiguous'),0);assert.equal(await call('GET',counter),count);
      }finally{for(const socket of sockets)socket.destroy();await new Promise(resolve=>proxy.close(resolve));}
    });
    await t.test('actual SDK serializes arguments and decodes Lua/JSON replies through a local REST fixture',async()=>{
      bridge=http.createServer(async(req,res)=>{
        try{
          let body='';for await(const chunk of req){body+=chunk;if(body.length>65536)throw new Error('Fixture input bound');}
          assert.equal(req.headers.authorization,'Bearer fixture-local-rest-only');const args=JSON.parse(body);assert.ok(Array.isArray(args));
          const commands=req.url==='/pipeline'?args:[args],results=[];
          for(const values of commands){assert.ok(Array.isArray(values)&&['eval','get'].includes(String(values[0]).toLowerCase()));results.push({result:await call(...values)});}
          res.setHeader('Content-Type','application/json');res.end(JSON.stringify(req.url==='/pipeline'?results:results[0]));
        }catch{res.statusCode=400;res.end(JSON.stringify({error:'Fixture command rejected'}));}
      });
      await new Promise(resolve=>bridge.listen(0,'127.0.0.1',resolve));
      const sdk=new Redis({url:`http://127.0.0.1:${bridge.address().port}`,token:'fixture-local-rest-only',retry:false});
      const created=await sdk.eval(LEAD_RESERVATION_NX,[prefix+'sdk',counter],[JSON.stringify(record),100]);assert.equal(typeof created,'number');assert.deepEqual(await sdk.get(prefix+'sdk'),record);
    });
    await t.test('stale recovery CAS preserves evidence and rejects a second concurrent owner',async()=>{
      const stale={...record,updatedAt:new Date(Date.now()-61000).toISOString()};await call('SET',key,JSON.stringify(stale));
      const next=reconciledLeadRecord(stale,'not_delivered','fixture-absence-evidence','fixture-operator');assert.ok(next);
      const args=[stale.owner,stale.state,stale.updatedAt,JSON.stringify(next)];
      const results=await Promise.all([call('EVAL',LEAD_DELIVERY_CAS,1,key,...args),call('EVAL',LEAD_DELIVERY_CAS,1,key,...args)]);assert.deepEqual(results.toSorted(),[0,1]);
      const accepted={...next,state:'accepted'};await call('SET',key,JSON.stringify(accepted));assert.equal(await reserve(),0);assert.deepEqual(JSON.parse(await call('GET',key)),accepted);
    });
    if(!service)await t.test('saved accepted and uncertain records survive an owned fixture restart',async()=>{
      await call('SET',prefix+'uncertain',JSON.stringify({...record,state:'uncertain'}));await call('SAVE');
      await call('CLIENT','PAUSE',10000);await stopOwned(processHandle);
      processHandle=start();startError=undefined;processHandle.on('error',error=>{startError=error;});await ready();
      assert.equal(JSON.parse(await call('GET',key)).state,'accepted');assert.equal(JSON.parse(await call('GET',prefix+'uncertain')).state,'uncertain');assert.equal(await reserve(),0);
    });
  }finally{
    if(bridge){bridge.closeAllConnections();await new Promise(resolve=>bridge.close(resolve));}
    await stopOwned(processHandle);
  }
});
