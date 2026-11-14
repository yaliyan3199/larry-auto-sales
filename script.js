const $=id=>document.getElementById(id);
const usd=n=>'$'+Math.round(n).toLocaleString('en-US');
const mi=n=>n.toLocaleString('en-US')+' mi';
const wa=t=>`https://wa.me/${PH}?text=${encodeURIComponent(t)}`;
const pay=(P,down,apr,n)=>{const L=Math.max(P-down,0),r=apr/1200;return r?L*r/(1-Math.pow(1+r,-n)):L/n};
const card=c=>`<article class="car"><a class="ph" href="vehicle.html?id=${c.id}" style="background-image:url('${U(c.i,800)}')" aria-label="${c.n}">${c.tag?`<span class="tag">${c.tag}</span>`:''}</a>
<div class="bd"><h3><a href="vehicle.html?id=${c.id}">${c.y} ${c.n}</a></h3><p class="meta">${mi(c.mi)} · ${c.body} · ${c.tr}</p>
<div class="row"><div><span class="pr">${usd(c.p)}${c.oldp?` <s>${usd(c.oldp)}</s>`:''}</span><small>Est. ${usd(pay(c.p,c.p*.1,8.5,72))}/mo</small></div><a class="btn btn-or sm" href="vehicle.html?id=${c.id}">View details</a></div></div></article>`;
const offerCard=c=>`<article class="car offer"><a class="ph" href="vehicle.html?id=${c.id}" style="background-image:url('${U(c.i,800)}')" aria-label="${c.n}"><span class="save">Save ${usd(c.oldp-c.p)}</span></a>
<div class="bd"><h3><a href="vehicle.html?id=${c.id}">${c.y} ${c.n}</a></h3><p class="meta">${mi(c.mi)} · ${c.body} · ${c.tr}</p>
<div class="pline"><span class="pr">${usd(c.p)}</span><s>${usd(c.oldp)}</s></div>
<a class="btn btn-pr w" target="_blank" rel="noopener" href="${wa(`Hi Larry Auto Sale, I'd like to claim the special offer on the ${c.y} ${c.n} (${usd(c.p)}).`)}">Claim this offer</a>
<a class="btn btn-line w" href="vehicle.html?id=${c.id}">View details</a></div></article>`;
document.querySelectorAll('[data-img]').forEach(el=>{const u=U(el.dataset.img);
 if(el.tagName==='IMG')el.src=u;else if(el.hasAttribute('data-plain'))el.style.backgroundImage=`url('${u}')`;else el.style.backgroundImage=`linear-gradient(105deg,rgba(11,26,46,.93) 38%,rgba(11,26,46,.5)),url('${u}')`});
const mq=encodeURIComponent(DEALER.mapQuery);
document.querySelectorAll('[data-map]').forEach(f=>f.src=`https://www.google.com/maps?q=${mq}&output=embed`);
document.querySelectorAll('[data-dir]').forEach(a=>a.href=`https://www.google.com/maps/search/?api=1&query=${mq}`);
if(DEALER.address&&$('addr'))$('addr').textContent=DEALER.address;
const menu=$('menu');$('burger').onclick=()=>menu.classList.toggle('open');menu.onclick=()=>menu.classList.remove('open');
$('yr').textContent=new Date().getFullYear();
const makes=[...new Set(cars.map(c=>c.make))].sort();
['hmake','make'].forEach(id=>{const s=$(id);if(s)makes.forEach(m=>s.add(new Option(m,m)))});
if($('offers'))$('offers').innerHTML=cars.filter(c=>c.oldp).slice(0,3).map(offerCard).join('');
if($('featured'))$('featured').innerHTML=cars.slice(0,6).map(card).join('');
if($('cars')){const P=new URLSearchParams(location.search);
 ['make','body','max'].forEach(k=>{if(P.get(k))$(k).value=P.get(k)});const onlyOff=P.get('offers')==='1';
 const draw=()=>{const t=$('q').value.toLowerCase(),m=$('make').value,b=$('body').value,x=+$('max').value||1e9,s=$('sort').value;
  let l=cars.filter(c=>c.n.toLowerCase().includes(t)&&(!m||c.make===m)&&(!b||c.body===b)&&c.p<=x&&(!onlyOff||c.oldp));
  if(s==='pa')l.sort((a,b)=>a.p-b.p);else if(s==='pd')l.sort((a,b)=>b.p-a.p);else if(s==='km')l.sort((a,b)=>a.mi-b.mi);else l.sort((a,b)=>b.y-a.y);
  $('count').textContent=`${l.length} vehicle${l.length===1?'':'s'} found`;
  $('cars').innerHTML=l.length?l.map(card).join(''):'<p class="empty">No vehicles match your search. Adjust the filters or message us and we will find one for you.</p>'};
 ['q','make','body','max','sort'].forEach(id=>{$(id).oninput=draw;$(id).onchange=draw});draw()}
if($('pt')){const c=cars.find(x=>x.id==new URLSearchParams(location.search).get('id'))||cars[0];
 document.title=`${c.y} ${c.n} | Larry Auto Sale`;
 $('bc').textContent=c.n;$('pt').textContent=`${c.y} ${c.n}`;$('pm').textContent=`${mi(c.mi)} · ${c.body} · ${c.tr} · ${c.f}`;$('pp').innerHTML=usd(c.p)+(c.oldp?` <s>${usd(c.oldp)}</s>`:'');
 $('est').innerHTML=`Est. <b>${usd(pay(c.p,c.p*.1,8.5,72))}/mo</b> with 10% down, 72 mo, 8.5% APR. <a href="financing.html">Customize</a>`;
 if(c.tag)$('ptag').textContent=c.tag;else $('ptag').remove();
 const im=[c.i,...EXTRA.filter(x=>x!==c.i)].slice(0,4),m=$('main');m.src=U(im[0]);m.alt=c.n;
 $('thumbs').innerHTML=im.map((x,i)=>`<button class="${i?'':'on'}" data-i="${x}"><img src="${U(x,300)}" alt=""></button>`).join('');
 $('thumbs').onclick=e=>{const b=e.target.closest('button');if(!b)return;m.src=U(b.dataset.i);document.querySelectorAll('#thumbs button').forEach(x=>x.classList.remove('on'));b.classList.add('on')};
 $('desc').textContent=`This ${c.y} ${c.n} is clean, well maintained and ready to drive. Call, text or message us to ask about history, schedule a test drive or discuss financing and trade-in options. (Sample text. Replace with the dealership's description.)`;
 $('specs').innerHTML=[['Year',c.y],['Mileage',mi(c.mi)],['Body',c.body],['Engine',c.eng],['Transmission',c.tr],['Fuel',c.f],['Color',c.kl]].map(([a,b])=>`<div><dt>${a}</dt><dd>${b}</dd></div>`).join('');
 $('feat').innerHTML=FEAT.map(x=>`<li>${x}</li>`).join('');
 $('bavail').href=wa(`Hi Larry Auto Sale, is the ${c.y} ${c.n} (${usd(c.p)}) still available?`);$('bavail').target='_blank';$('bavail').rel='noopener';
 $('btest').href=wa(`Hi Larry Auto Sale, I'd like to schedule a test drive for the ${c.y} ${c.n}.`);$('btest').target='_blank';$('btest').rel='noopener';
 $('bwa').href=wa(`Hi Larry Auto Sale, I have a question about the ${c.y} ${c.n}.`);
 $('similar').innerHTML=cars.filter(x=>x.id!==c.id&&(x.body===c.body||x.make!==c.make)).slice(0,3).map(card).join('')}
if($('price')){const f=()=>{const P=+$('price').value,d=Math.min(+$('down').value,P),a=+$('apr').value,t=+$('term').value;
 $('o1').textContent=usd(P);$('o2').textContent=usd(d);$('o3').textContent=a+'%';$('o4').textContent=t+' months';$('monthly').textContent=usd(pay(P,d,a,t))+'/mo'};
 ['price','down','apr','term'].forEach(id=>$(id).oninput=f);f()}
const go=t=>window.open(wa(t),'_blank');
const fm=(id,fn)=>{const e=$(id);if(e)e.onsubmit=ev=>{ev.preventDefault();fn(new FormData(e))}};
fm('finForm',d=>go(`Hi Larry Auto Sale, I'd like to get pre-approved.\nName: ${d.get('name')}\nPhone: ${d.get('phone')}\nBudget: ${d.get('budget')||'-'}\nVehicle: ${d.get('car')||'-'}`));
fm('sellForm',d=>go(`Hi Larry Auto Sale, I'd like an offer on my car.\nCar: ${d.get('car')}\nMileage: ${d.get('miles')||'-'}\nVIN: ${d.get('vin')||'-'}\nPhone: ${d.get('phone')}`));
fm('contactForm',d=>go(`Hi Larry Auto Sale, I'm ${d.get('name')}.\nTopic: ${d.get('topic')}\n${d.get('msg')}`));
