if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let r=Promise.resolve();return s[e]||(r=new Promise(async r=>{if("document"in self){const s=document.createElement("script");s.src=e,document.head.appendChild(s),s.onload=r}else importScripts(e),r()})),r.then(()=>{if(!s[e])throw new Error(`Module ${e} didn’t register its module`);return s[e]})},r=(r,s)=>{Promise.all(r.map(e)).then(e=>s(1===e.length?e[0]:e))},s={require:Promise.resolve(r)};self.define=(r,i,n)=>{s[r]||(s[r]=Promise.resolve().then(()=>{let s={};const o={uri:location.origin+r.slice(1)};return Promise.all(i.map(r=>{switch(r){case"exports":return s;case"module":return o;default:return e(r)}})).then(e=>{const r=n(...e);return s.default||(s.default=r),s})}))}}define("./service-worker.js",["./workbox-d9851aed"],(function(e){"use strict";e.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/404.html",revision:"5a2290a45173e18d6923e0ce3de81587"},{url:"/fonts/KumbhSans-Bold.ttf",revision:"0355899eebab4c5da750cb642f1b085f"},{url:"/fonts/KumbhSans-Regular.ttf",revision:"20190890b4cb9a4b6f6117a3f7479c51"},{url:"/fonts/kumbhsans-regular-webfont.woff",revision:"6a570e68ebf4c70b71d0813f33dcce0f"},{url:"/fonts/kumbhsans-regular-webfont.woff2",revision:"c91441314266f79d1033192de96f1c59"},{url:"/index.html",revision:"1091a0bc612815bc9d2b4a33bc03e529"},{url:"/main.37b6777d.css",revision:"7752ff8a6acee88edf70e732b2e1ae10"},{url:"/main.37b6777d7a576e50679a.js",revision:"e1ea69f3eb5003318df7b504d6243255"},{url:"/vendors~main.37b6777d7a576e50679a.js",revision:"f8b376abc430c9d9de34cca12b741690"}],{})}));
//# sourceMappingURL=service-worker.js.map