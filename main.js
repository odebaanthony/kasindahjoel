/* Kasindha Law Firm - shared script for every page */
const PAGES=[["index.html","Home"],["about.html","About"],["services.html","Practice areas"],["team.html","Our team"],["offices.html","Offices"],["news.html","Insights"],["faq.html","FAQ"]];
const OFFICES={
 kampala:{t:"Kampala office",d:"Our city office, close to the courts and commercial institutions.",a:"[Plot and street], Kampala",p:"+256 700 000 000"},
 iganga:{t:"Iganga office",d:"Serving Iganga District, Busoga and the wider eastern region.",a:"[Street], Iganga Town, Iganga District",p:"+256 700 000 001"}};
const TEAM=[["Managing Partner","Kampala"],["Partner","Kampala"],["Senior Associate","Kampala"],["Associate Advocate","Kampala"],["Associate Advocate","Iganga"],["Associate Advocate","Iganga"],["Assistant Legal Officer","Iganga"],["Assistant Legal Officer","Kampala"],["Office Assistant","Kampala"],["Office Assistant","Iganga"]];
const $=s=>document.querySelector(s);

/* header and footer, built once and reused on all pages */
const here=location.pathname.split("/").pop()||"index.html";
$("#site-header").innerHTML=`<header><div class="wrap bar"><a class="logo" href="index.html"><i></i>Kasindha Law Firm</a>
<button id="menu" aria-expanded="false" aria-controls="nav">Menu</button>
<nav id="nav" aria-label="Main"><ul>${PAGES.map(([h,l])=>`<li><a href="${h}"${h===here?' aria-current="page"':""}>${l}</a></li>`).join("")}
<li><a class="btn" href="contact.html">Contact us</a></li></ul></nav></div></header>`;
$("#site-footer").innerHTML=`<footer><div class="wrap"><div class="fgrid">
<div><h3>Kasindha Law Firm</h3><p>Advocates serving clients from Kampala and Iganga District, Uganda.</p></div>
<div><h3>Pages</h3><ul>${PAGES.map(([h,l])=>`<li><a href="${h}">${l}</a></li>`).join("")}<li><a href="contact.html">Contact</a></li></ul></div>
<div><h3>Reach us</h3><ul><li>Kampala: <a href="tel:+256700000000">+256 700 000 000</a></li><li>Iganga: <a href="tel:+256700000001">+256 700 000 001</a></li><li><a href="mailto:info@kasindhalaw.example">info@kasindhalaw.example</a></li></ul></div></div>
<div class="legal"><span>© ${new Date().getFullYear()} Kasindha Law Firm</span><span>This website gives general information, not legal advice.</span></div></div></footer>`;
$("#menu").addEventListener("click",()=>{const o=$("#nav").classList.toggle("open");$("#menu").setAttribute("aria-expanded",o)});

/* office tabs (home page) */
const tabs=document.querySelectorAll(".tabs button");
tabs.forEach(b=>b.addEventListener("click",()=>{
 tabs.forEach(x=>x.setAttribute("aria-selected",x===b));
 const o=OFFICES[b.dataset.o];
 $("#o-title").textContent=o.t;$("#o-desc").textContent=o.d;$("#o-addr").textContent=o.a;
 $("#o-tel").textContent=o.p;$("#o-tel").href="tel:"+o.p.replace(/\s/g,"");
}));

/* team cards (team page); the home page shows a short preview with data-limit */
const tg=$("#teamGrid");
if(tg){const lim=+tg.dataset.limit||TEAM.length;
 tg.innerHTML=TEAM.slice(0,lim).map(([r,o])=>`<div class="person"><div class="av" aria-hidden="true">${r.split(" ").map(w=>w[0]).slice(0,2).join("")}</div><h3>Name Surname</h3><p>${r}</p><small>${o} office</small></div>`).join("");}

/* insights filter */
const fb=document.querySelectorAll(".filters button");
fb.forEach(b=>b.addEventListener("click",()=>{
 fb.forEach(x=>x.setAttribute("aria-pressed",x===b));
 document.querySelectorAll(".post").forEach(p=>p.hidden=b.dataset.c!=="all"&&p.dataset.c!==b.dataset.c);
}));

/* contact form */
const f=$("#f");
if(f)f.addEventListener("submit",e=>{
 e.preventDefault();
 const chk=(i,m,o)=>{const bad=!i.value.trim();o.textContent=bad?m:"";return !bad};
 const a=chk($("#n"),"Enter your name.",$("#en")),b=chk($("#c"),"Enter a phone number or email so we can reply.",$("#ec")),d=chk($("#t"),"Describe your matter in a sentence or two.",$("#et"));
 if(!(a&&b&&d))return;
 const body=`Name: ${$("#n").value}\nContact: ${$("#c").value}\nOffice: ${$("#of").value}\nMatter: ${$("#m").value}\n\n${$("#t").value}`;
 const ok=$("#ok");ok.style.display="block";
 ok.innerHTML='Request ready. <a style="color:#fff" href="mailto:info@kasindhalaw.example?subject='+encodeURIComponent("Consultation request: "+$("#m").value)+"&body="+encodeURIComponent(body)+'">Open it in your email app to send</a>, or call the '+$("#of").value+" office.";
});
