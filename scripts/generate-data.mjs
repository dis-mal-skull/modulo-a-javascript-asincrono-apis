import {writeFile, mkdir} from 'node:fs/promises';

const out='data'; await mkdir(out,{recursive:true});
async function json(url){const r=await fetch(url,{headers:{'User-Agent':'modulo-a-javascript-asincrono-apis'}});if(!r.ok)throw new Error(`${r.status} ${url}`);return r.json()}

const countries=await json('https://raw.githubusercontent.com/mledoze/countries/master/countries.json');
await writeFile(`${out}/paises.json`,JSON.stringify(countries.map(c=>({cca3:c.cca3,name:c.name,region:c.region,subregion:c.subregion,capital:c.capital||[],population:c.population,area:c.area,flags:c.flags,currencies:c.currencies||{},languages:c.languages||{},timezones:c.timezones||[],maps:c.maps||{}}))));

const crypto=await json('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=24h');
await writeFile(`${out}/criptomonedas.json`,JSON.stringify(crypto));

const trm=await json('https://www.datos.gov.co/resource/32sa-8pi3.json?$order=vigenciadesde%20DESC&$limit=500');
await writeFile(`${out}/trm.json`,JSON.stringify(trm.map(x=>({valor:Number(x.valor),vigenciadesde:x.vigenciadesde})).filter(x=>Number.isFinite(x.valor)&&x.vigenciadesde).sort((a,b)=>new Date(a.vigenciadesde)-new Date(b.vigenciadesde))));
console.log(`Datos generados: ${countries.length} países, ${crypto.length} criptomonedas, ${trm.length} registros TRM`);
