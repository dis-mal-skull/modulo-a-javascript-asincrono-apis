import {escapeHTML} from './dom.js';

export function detailList(items=[]){
  const dl=document.createElement('dl');
  for(const item of items){const dt=document.createElement('dt');dt.textContent=item.label??'';const dd=document.createElement('dd');dd.textContent=item.value??'—';dl.append(dt,dd)}
  return dl;
}

export function openModal({title,subtitle='',content,footer='',size='md'}={}){
  const dialog=document.createElement('dialog'); dialog.className=`modal modal-${escapeHTML(size)}`; dialog.setAttribute('aria-labelledby','modal-title');
  const shell=document.createElement('article'); shell.className='modal-shell';
  const heading=document.createElement('div'); heading.className='modal-heading';
  const h2=document.createElement('h2'); h2.id='modal-title'; h2.textContent=title??''; heading.append(h2);
  if(subtitle){const p=document.createElement('p');p.textContent=subtitle;heading.append(p)}
  const close=document.createElement('button');close.type='button';close.className='btn btn-outline btn-sm';close.setAttribute('aria-label','Cerrar ventana');close.textContent='Cerrar';close.addEventListener('click',()=>dialog.close());heading.append(close);
  const body=document.createElement('div');body.className='modal-body';if(content instanceof Node)body.append(content);else body.textContent=content??'';
  shell.append(heading,body);if(footer){const f=document.createElement('div');f.className='modal-footer';if(footer instanceof Node)f.append(footer);else f.textContent=footer;shell.append(f)}dialog.append(shell);document.body.append(dialog);document.body.classList.add('has-modal');
  dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()},{once:true});dialog.addEventListener('close',()=>{document.body.classList.remove('has-modal');dialog.remove()},{once:true});dialog.showModal();return dialog;
}
