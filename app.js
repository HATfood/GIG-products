'use strict';
const $ = (s,r=document)=>r.querySelector(s);
const $$ = (s,r=document)=>[...r.querySelectorAll(s)];
const fa = n=>Number(n).toLocaleString('fa-IR');
const asset = name=>`assets/${name}.webp`;
const profiles = {
 '6262758203674':{name:'چای کاراک',english:'KARAK TEA',pack:'جعبه ۱۰ عددی',count:10,family:'karak',image:'karak-lifestyle',type:'photo',tag:'با طعم هل',description:'چای فوری کاراک با طعم هل؛ ترکیبی گرم برای یک مکث خوش‌عطر. بسته ۱۰ ساشه‌ای بلوط با شکر قهوه‌ای، مطابق تصویر بسته‌بندی.',gallery:['karak-lifestyle','warm-collection']},
 '6262758203636':{name:'گلدن میلک',english:'GOLDEN MILK',pack:'جعبه ۱۰ عددی',count:10,family:'golden',image:'golden-lifestyle',type:'photo',tag:'بدون شکر',description:'نوشیدنی فوری گلدن میلک بلوط؛ با رنگ طلایی و ترکیب ۹ در ۱ درج‌شده روی بسته‌بندی. هر جعبه شامل ۱۰ ساشه ۸ گرمی است.',gallery:['golden-lifestyle','warm-collection','golden-art']},
 '6262758203728':{name:'قهوه ۳ در ۱',english:'3 IN 1 · GOLD',pack:'جعبه ۶ عددی',count:6,family:'three',image:'three-boxes',type:'crop',tag:'شکر قهوه‌ای',description:'قهوه فوری گلد ۳ در ۱ بلوط با شکر قهوه‌ای؛ در بسته‌بندی جعبه‌ای ۶ عددی و پاکتی ۲۰ عددی برای لحظه‌های روزمره.',gallery:['three-boxes','three-lifestyle','coffee-collection']},
 '6262758203735':{name:'قهوه ۲ در ۱',english:'2 IN 1 · GOLD',pack:'جعبه ۶ عددی',count:6,family:'two',image:'two-lifestyle',type:'photo',tag:'بدون شکر',description:'قهوه فوری گلد ۲ در ۱ بلوط، بدون شکر مطابق بسته‌بندی؛ در دو انتخاب جعبه ۶ عددی و پاکت ۲۰ عددی.',gallery:['two-lifestyle','two-boxes','coffee-collection']},
 '6262758203742':{name:'قهوه ۲ در ۱',english:'2 IN 1 · GOLD',pack:'پاکت ۲۰ عددی',count:20,family:'two',image:'two-pouch',type:'pack',tag:'بدون شکر',description:'قهوه فوری گلد ۲ در ۱ بلوط، بدون شکر مطابق بسته‌بندی؛ در دو انتخاب جعبه ۶ عددی و پاکت ۲۰ عددی.',gallery:['two-pouch','coffee-collection']},
 '6262758203766':{name:'قهوه ۳ در ۱',english:'3 IN 1 · GOLD',pack:'پاکت ۲۰ عددی',count:20,family:'three',image:'three-lifestyle',type:'photo',tag:'شکر قهوه‌ای',description:'قهوه فوری گلد ۳ در ۱ بلوط با شکر قهوه‌ای؛ در بسته‌بندی جعبه‌ای ۶ عددی و پاکتی ۲۰ عددی برای لحظه‌های روزمره.',gallery:['three-lifestyle','coffee-collection']},
 '6262758203759':{name:'کاپوچینو',english:'CAPPUCCINO · GOLD',pack:'پاکت ۱۴ عددی',count:14,family:'cappuccino',image:'cappuccino-pouch',type:'pack',tag:'قهوه گلد',description:'پودر فوری کاپوچینو بلوط در بسته ۱۴ عددی؛ همراهی برای لحظه‌هایی با عطر قهوه.',gallery:['cappuccino-pouch','cappuccino-art'],note:'وزن خالص در فهرست ارسالی ۲۸۰ گرم است؛ روی تصویر بسته‌بندی ۲۲۰ گرم درج شده. مشخصات این صفحه بر اساس فهرست ارسالی نمایش داده شده است.'},
 '6262758203773':{name:'هات چاکلت',english:'HOT CHOCOLATE',pack:'پاکت ۱۴ عددی',count:14,family:'chocolate',image:'chocolate-pouch',type:'pack',tag:'نوشیدنی شکلاتی',description:'پودر فوری هات چاکلت بلوط؛ انتخابی شکلاتی در پاکت ۱۴ ساشه‌ای. وزن خالص هر بسته ۲۸۰ گرم است.',gallery:['chocolate-pouch','chocolate-art']},
 '6262758203780':{name:'چای اعلای ایرانی',english:'PREMIUM IRANIAN TEA',pack:'جعبه ۲۵۰ گرمی',count:null,family:'tea',image:'tea-lifestyle',type:'photo',tag:'سرگل بهاره',description:'چای اعلای ایرانی بلوط، سرگل بهاره؛ مطابق بسته‌بندی، دستچین از باغ‌های مرتفع شمال. در جعبه ۲۵۰ گرمی برای لحظه‌های آرامِ چای.',gallery:['tea-lifestyle']}
};
const products = window.PRODUCTS.map(p=>({...p,...profiles[p.id]}));
const productById = new Map(products.map(p=>[p.id,p]));
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
if(!reduced.matches)document.body.classList.add('motion-ready');
const revealObserver = new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');revealObserver.unobserve(e.target)}}),{threshold:.08});
$$('.reveal').forEach(el=>revealObserver.observe(el));
let selectedFilter='all';
const normalize = s=>s.replace(/[يى]/g,'ی').replace(/ك/g,'ک').replace(/[۰-۹]/g,c=>'۰۱۲۳۴۵۶۷۸۹'.indexOf(c)).replace(/[٠-٩]/g,c=>'٠١٢٣٤٥٦٧٨٩'.indexOf(c)).replace(/\s+/g,' ').trim().toLowerCase();
function renderProducts(){
 const query=normalize($('#product-search').value);
 const visible=products.filter(p=>(selectedFilter==='all'||p.category===selectedFilter)&&normalize(`${p.name} ${p.sourceName} ${p.id} ${p.pack} ${p.english}`).includes(query));
 $('#product-grid').innerHTML=visible.map(p=>`<button class="product-card" data-open="${p.id}" aria-label="مشاهده ${p.name}، ${p.pack}"><div class="product-image ${p.type==='pack'?'is-pack':p.type==='crop'?'is-crop':''}"><img src="${asset(p.image)}" alt="${p.name} بلوط، ${p.pack}" loading="lazy" width="600" height="650"><span class="product-tag">${p.tag}</span><span class="product-open" aria-hidden="true">↗</span></div><div class="product-heading"><h3>${p.name}</h3><span>${p.pack}</span></div><p class="product-meta">بلوط · ${fa(p.weight)} گرم</p><div class="product-price"><strong>${fa(p.priceRial/10)}<small>تومان</small></strong><span>مشاهده جزئیات</span></div></button>`).join('');
 $('#result-info').textContent=`${fa(visible.length)} محصول${query?' مطابق جستجو':''}`;
 $('#empty').hidden=visible.length>0;
}
function setFilter(value){selectedFilter=value;$$('[data-filter]').forEach(b=>{const active=b.dataset.filter===value;b.classList.toggle('active',active);b.setAttribute('aria-pressed',active)});renderProducts()}
$$('[data-filter]').forEach(b=>b.addEventListener('click',()=>setFilter(b.dataset.filter)));
$('#product-search').addEventListener('input',renderProducts);
$('#reset-search').addEventListener('click',()=>{$('#product-search').value='';setFilter('all')});
renderProducts();
const dialog=$('#product-dialog');let currentProduct=null,detailIndex=0,returnHash='#collection';
const imageType = name => name.endsWith('-pouch')?'pack':(name.endsWith('-boxes')?'crop':'photo');
function setDetailImage(index){detailIndex=index;const name=currentProduct.gallery[index];$('#detail-image').src=asset(name);$('#detail-image').alt=`${currentProduct.name} بلوط — ${currentProduct.pack}`;$('#detail-stage').className=`detail-stage ${imageType(name)==='pack'?'is-pack':imageType(name)==='crop'?'is-crop':''}`;$$('.detail-thumbs button').forEach((b,i)=>{b.classList.toggle('active',i===index);b.setAttribute('aria-pressed',i===index)})}
function openProduct(id,{push=true}={}){
 const p=productById.get(id);if(!p)return;
 currentProduct=p;detailIndex=0;
 $('#detail-category').textContent=`بلوط / ${p.category}`;
 $('#product-title').textContent=p.name;
 $('#detail-subtitle').innerHTML=`${p.pack} · <bdi dir="ltr">${p.english}</bdi>`;
 $('#detail-description').textContent=p.description;
 const variants=products.filter(v=>v.family===p.family);
 $('#variant-options').innerHTML=variants.map(v=>`<button data-variant="${v.id}" class="${v.id===id?'active':''}" aria-pressed="${v.id===id}">${v.pack}</button>`).join('');
 $('#detail-price').innerHTML=`${fa(p.priceRial/10)} <small>تومان</small>`;
 $('#detail-rial').textContent=`${fa(p.priceRial)} ریال`;
 $('#detail-specs').innerHTML=`<div><dt>وزن خالص</dt><dd>${fa(p.weight)} <small>گرم</small></dd></div><div><dt>تعداد در کارتن</dt><dd>${fa(p.carton)} <small>بسته</small></dd></div><div><dt>${p.count?'تعداد ساشه':'برند'}</dt><dd>${p.count?fa(p.count):'بلوط'}</dd></div>`;
 $('#detail-barcode').textContent=p.id;$('#copy-barcode').setAttribute('aria-label','کپی بارکد');
 $('#source-name').textContent=p.sourceName;
 $('.source-name').open=false;
 $('#detail-note').textContent=p.note||'قیمت و مشخصات مطابق فهرست ارسالی است.';
 $('#detail-thumbs').innerHTML=p.gallery.map((name,i)=>`<button data-thumb="${i}" aria-label="تصویر ${fa(i+1)} از ${fa(p.gallery.length)}" aria-pressed="${i===0}" class="${i===0?'active':''}"><img src="${asset(name)}" alt=""></button>`).join('');
 setDetailImage(0);
 if(!dialog.open){returnHash=location.hash&&!location.hash.startsWith('#product=')?location.hash:'#collection';dialog.showModal();dialog.scrollTop=0;if(push)history.pushState({product:id},'',`#product=${id}`)}else if(push)history.replaceState({product:id},'',`#product=${id}`);
}
document.addEventListener('click',e=>{const b=e.target.closest('[data-open]');if(b)openProduct(b.dataset.open);const v=e.target.closest('[data-variant]');if(v){openProduct(v.dataset.variant);$(`[data-variant="${v.dataset.variant}"]`).focus()};const t=e.target.closest('[data-thumb]');if(t)setDetailImage(Number(t.dataset.thumb))});
$('.close-dialog').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
dialog.addEventListener('close',()=>{if(location.hash.startsWith('#product='))history.replaceState(null,'',returnHash)});
function syncHash(){const match=location.hash.match(/^#product=(\d+)$/);if(match&&productById.has(match[1]))openProduct(match[1],{push:false});else if(dialog.open)dialog.close()}
addEventListener('popstate',syncHash);syncHash();
$('#copy-barcode').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(currentProduct.id);$('#copy-barcode').setAttribute('aria-label','بارکد کپی شد');$('#detail-barcode').textContent='کپی شد ✓';setTimeout(()=>{$('#detail-barcode').textContent=currentProduct.id},1400)}catch{$('#detail-barcode').textContent=currentProduct.id;const selection=getSelection(),range=document.createRange();range.selectNodeContents($('#detail-barcode'));selection.removeAllRanges();selection.addRange(range);$('#copy-barcode').setAttribute('aria-label','بارکد انتخاب شد؛ کپی کنید')}});
let lightboxImages=[],lightboxIndex=0;
const lightbox=$('#lightbox');
function renderLightbox(){const item=lightboxImages[lightboxIndex];$('#lightbox-image').src=asset(item.name);$('#lightbox-image').alt=item.caption;$('#lightbox-caption').textContent=item.caption;$('#lightbox-count').textContent=`${fa(lightboxIndex+1)} / ${fa(lightboxImages.length)}`;$('.lightbox-prev').disabled=lightboxImages.length===1;$('.lightbox-next').disabled=lightboxImages.length===1}
function showLightbox(items,index){lightboxImages=items;lightboxIndex=index;renderLightbox();lightbox.showModal()}
$('#detail-enlarge').addEventListener('click',()=>showLightbox(currentProduct.gallery.map(name=>({name,caption:`${currentProduct.name} بلوط — ${currentProduct.pack}`})),detailIndex));
$('.close-lightbox').addEventListener('click',()=>lightbox.close());
function stepImage(step){lightboxIndex=(lightboxIndex+step+lightboxImages.length)%lightboxImages.length;renderLightbox()}
$('.lightbox-prev').addEventListener('click',()=>stepImage(-1));$('.lightbox-next').addEventListener('click',()=>stepImage(1));
lightbox.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();stepImage(1)}if(e.key==='ArrowRight'){e.preventDefault();stepImage(-1)}});
let touchStart=null;$('#lightbox-image').addEventListener('touchstart',e=>{touchStart=e.touches[0].clientX},{passive:true});$('#lightbox-image').addEventListener('touchend',e=>{if(touchStart!==null&&Math.abs(e.changedTouches[0].clientX-touchStart)>60)stepImage(e.changedTouches[0].clientX>touchStart?1:-1);touchStart=null},{passive:true});

$('#detail-stage').addEventListener('pointermove',e=>{if(reduced.matches||e.pointerType!=='mouse')return;const r=e.currentTarget.getBoundingClientRect();e.currentTarget.style.setProperty('--ry',`${((e.clientX-r.left)/r.width-.5)*12}deg`);e.currentTarget.style.setProperty('--rx',`${-((e.clientY-r.top)/r.height-.5)*8}deg`)});
$('#detail-stage').addEventListener('pointerleave',e=>{e.currentTarget.style.setProperty('--ry','0deg');e.currentTarget.style.setProperty('--rx','0deg')});
