import {requestJSON,describeError} from '../core/http.js';
import {createConsole} from '../core/console-panel.js';
import {setBusy} from '../core/ui.js';
const button=document.querySelector('[data-demo]');const output=document.querySelector('[data-output]');const panel=createConsole(document.querySelector('[data-console]'));const actions=button?.parentElement;
const errorButton=document.createElement('button');errorButton.className='btn btn-outline';errorButton.textContent='Simular error';errorButton.type='button';actions?.append(errorButton);
async function run(url,buttonToBusy){setBusy(buttonToBusy,true,'Consultando…');panel.clear();try{const data=await requestJSON(url,{timeout:15000});output.textContent=JSON.stringify(data,null,2);panel.success('response.ok = true',data.name||'JSON recibido')}catch(error){output.textContent=describeError(error);panel.error(describeError(error))}finally{setBusy(buttonToBusy,false)}}
button?.addEventListener('click',()=>run('https://jsonplaceholder.typicode.com/users/1',button));errorButton.addEventListener('click',()=>run('https://jsonplaceholder.typicode.com/users/9999',errorButton));
