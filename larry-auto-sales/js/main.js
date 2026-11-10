// ===== Edit this list to update your inventory =====
const CARS=[
 {id:1,year:2020,make:"Toyota",model:"Camry SE",type:"Sedan",price:19900,miles:41200,trans:"Automatic",fuel:"Gas",color:"#3b4a5a"},
 {id:2,year:2019,make:"Honda",model:"Civic EX",type:"Sedan",price:16500,miles:52800,trans:"Automatic",fuel:"Gas",color:"#8a2a2a"},
 {id:3,year:2018,make:"Ford",model:"F-150 XLT",type:"Truck",price:28900,miles:68400,trans:"Automatic",fuel:"Gas",color:"#2c3e5c"},
 {id:4,year:2021,make:"Hyundai",model:"Tucson SEL",type:"SUV",price:23400,miles:29700,trans:"Automatic",fuel:"Gas",color:"#5d6770"},
 {id:5,year:2017,make:"Nissan",model:"Altima SV",type:"Sedan",price:9800,miles:88100,trans:"Automatic",fuel:"Gas",color:"#1f2933"},
 {id:6,year:2019,make:"Chevrolet",model:"Equinox LT",type:"SUV",price:17900,miles:46500,trans:"Automatic",fuel:"Gas",color:"#7a5c2e"},
 {id:7,year:2016,make:"Honda",model:"Accord Sport",type:"Sedan",price:12400,miles:77300,trans:"Automatic",fuel:"Gas",color:"#4a5568"},
 {id:8,year:2020,make:"Ford",model:"Mustang EcoBoost",type:"Coupe",price:26500,miles:33900,trans:"Manual",fuel:"Gas",color:"#a32020"},
 {id:9,year:2018,make:"Toyota",model:"RAV4 XLE",type:"SUV",price:21800,miles:57600,trans:"Automatic",fuel:"Gas",color:"#2f4f4f"}
];
const $=s=>document.querySelector(s),fmt=n=>n.toLocaleString("en-US");
const usd=n=>"$"+fmt(Math.round(n));
const state={q:"",type:"",make:"",max:0,sort:"new"};

// Populate make dropdown
[...new Set(CARS.map(c=>c.make))].sort().forEach(m=>$("#qMake").insertAdjacentHTML("beforeend",`<option>${m}</option>`));

function render(){
 let list=CARS.filter(c=>{
  const t=(c.year+" "+c.make+" "+c.model).toLowerCase();
  return t.includes(state.q)&&(!state.type||c.type===state.type)&&(!state.make||c.make===state.make)&&(!state.max||c.price<=state.max);
 });
 const s={new:(a,b)=>b.year-a.year,low:(a,b)=>a.price-b.price,high:(a,b)=>b.price-a.price,miles:(a,b)=>a.miles-b.miles}[state.sort];
 list.sort(s);
 $("#count").textContent=list.length?`${list.length} vehicle${list.length>1?"s":""} available`:"No vehicles match. Try changing your filters.";
 $("#grid").innerHTML=list.map(c=>`
 <article class="car">
  <div class="pic" style="color:${c.color}"><span class="tag">${c.type}</span><svg viewBox="0 0 640 260" role="img" aria-label="${c.make} ${c.model}"><use href="#car"/></svg></div>
  <div class="info">
   <h3>${c.year} ${c.make} ${c.model}</h3>
   <div class="price">${usd(c.price)}</div>
   <ul class="specs"><li>${fmt(c.miles)} mi</li><li>${c.trans}</li><li>${c.fuel}</li></ul>
   <a class="btn" href="#contact" data-car="${c.year} ${c.make} ${c.model}">Ask about this car</a>
  </div>
 </article>`).join("");
}
$("#search").oninput=e=>{state.q=e.target.value.toLowerCase().trim();render()};
$("#type").onchange=e=>{state.type=e.target.value;render()};
$("#sort").onchange=e=>{state.sort=e.target.value;render()};
$("#quick").onsubmit=e=>{e.preventDefault();state.make=$("#qMake").value;state.max=+$("#qPrice").value;render();$("#inventory").scrollIntoView()};
$("#grid").onclick=e=>{const a=e.target.closest("[data-car]");if(a)$("#fCar").value=a.dataset.car};

// Payment calculator
function calc(){
 const P=+$("#cP").value,D=+$("#cD").value,T=+$("#cT").value,A=+$("#cA").value;
 $("#oP").textContent=usd(P);$("#oD").textContent=usd(D);$("#oT").textContent=T+" months";$("#oA").textContent=A+"%";
 const L=Math.max(P-D,0),r=A/1200,m=r?L*r/(1-Math.pow(1+r,-T)):L/T;
 $("#pay").textContent=usd(m);
}
["cP","cD","cT","cA"].forEach(i=>$("#"+i).oninput=calc);

// Contact form (front-end only; connect to Formspree/EmailJS/your backend to receive messages)
$("#form").onsubmit=e=>{
 e.preventDefault();let ok=true;
 e.target.querySelectorAll("[required]").forEach(i=>{const bad=!i.value.trim();i.classList.toggle("err",bad);if(bad)ok=false});
 $("#note").style.color=ok?"#1d6b3a":"#b3261e";
 $("#note").textContent=ok?"Thank you. We will contact you shortly.":"Please fill in your name and a phone or email.";
 if(ok)e.target.reset();
};

// Mobile menu
const b=document.querySelector(".burger"),m=$("#menu");
b.onclick=()=>b.setAttribute("aria-expanded",m.classList.toggle("open"));
m.onclick=e=>{if(e.target.tagName==="A"){m.classList.remove("open");b.setAttribute("aria-expanded","false")}};
$("#yr").textContent=new Date().getFullYear();
calc();render();
