require('@next/env').loadEnvConfig(process.cwd());
const { createClient } = require('@sanity/client');
const client = createClient({projectId:process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,dataset:process.env.NEXT_PUBLIC_SANITY_DATASET,apiVersion:process.env.NEXT_PUBLIC_SANITY_API_VERSION||'2024-01-01',useCdn:true});
client.fetch("*[_type == 'homePage'][0]{trustLogos[]{alt,asset->{url,_id}}}").then(data=>console.log(JSON.stringify(data))).catch(error=>{console.error(error.message);process.exitCode=1;});