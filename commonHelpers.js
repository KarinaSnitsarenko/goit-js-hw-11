import{i,S as f}from"./assets/vendor-46aac873.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();const d=document.querySelector(".form"),l=document.querySelector(".gallery"),c=document.querySelector(".loader"),u={messageColor:"#FFF",color:"#EF4040",position:"topRight"};d.addEventListener("submit",g);function g(r){r.preventDefault(),l.innerHTML="";const o=r.target.elements.input.value;if(o.trim())c.classList.add("loading"),h(o),r.currentTarget.reset();else return i.error({title:"❕",theme:"light",message:"Please, fill in the search field",messageSize:"20px",messageColor:"#808080",backgroundColor:"#EF4040",position:"topLeft",timeout:2500})}function h(r){const o="https://pixabay.com",a="/api/",n=new URLSearchParams({key:"42189534-0458e72641624c0165f7139a5",q:r,image_type:"photo",orientation:"horizontal",safesearch:"true"}),e=o+a+"?"+n;fetch(e).then(t=>t.json()).then(t=>{const s=t.hits;s.length===0&&y(),L(s)}).catch(t=>{i.error({...u,message:`${t}`})}).finally(()=>c.classList.remove("loading"))}function y(){i.error({...u,message:"Sorry, there are no images matching your search query. Please try again!"})}function L(r){const o=r.map(({largeImageURL:a,webformatURL:n,tags:e,likes:t,views:s,comments:p,downloads:m})=>`<li class='gallery-item'>
  <a class='gallery-link' href='${a}'>
    <img class='gallery-image' src='${n}' alt='${e}'/>
  </a>
<div class='container-app'>
<p><span>Likes</span> ${t}</p>
<p><span>Views</span> ${s}</p>
<p><span>Comments</span> ${p}</p>
<p><span>Downloads</span> ${m}</p>
</div>
 </li>`).join("");l.insertAdjacentHTML("afterBegin",o),P()}const S=new f(".gallery a",{captionsData:"alt",captionsPosition:"bottom",captionDelay:250});function P(){S.refresh()}
//# sourceMappingURL=commonHelpers.js.map