import{r as i,j as o}from"./index-020c9027.js";/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x=r=>r.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),n=(...r)=>r.filter((e,s,t)=>!!e&&e.trim()!==""&&t.indexOf(e)===s).join(" ").trim();/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var f={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=i.forwardRef(({color:r="currentColor",size:e=24,strokeWidth:s=2,absoluteStrokeWidth:t,className:l="",children:a,iconNode:c,...m},d)=>i.createElement("svg",{ref:d,...f,width:e,height:e,stroke:r,strokeWidth:t?Number(s)*24/Number(e):s,className:n("lucide",l),...m},[...c.map(([g,h])=>i.createElement(g,h)),...Array.isArray(a)?a:[a]]));/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=(r,e)=>{const s=i.forwardRef(({className:t,...l},a)=>i.createElement(u,{ref:a,iconNode:e,className:n(`lucide-${x(r)}`,t),...l}));return s.displayName=`${r}`,s};/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]],j=w("Check",b),y=({steps:r,currentStep:e})=>o.jsx("div",{className:"mb-8",children:o.jsx("div",{className:"flex justify-between",children:r.map((s,t)=>o.jsxs("div",{className:"flex flex-col items-center w-full",children:[o.jsx("div",{className:`flex items-center justify-center w-10 h-10 rounded-full border-2 
                ${t<e?"border-green-600 text-green-600":t===e?"border-indigo-600 bg-indigo-600 text-white":"border-gray-300 bg-gray-300 text-white"}`,children:t<e?o.jsx(j,{className:"w-6 h-6"}):o.jsx(s.icon,{className:"w-5 h-5"})}),o.jsx("p",{className:`mt-2 text-sm font-medium ${t<=e?"text-indigo-600":"text-gray-500"}`,children:s.title}),t<r.length&&o.jsx("div",{className:`hidden sm:block w-full h-[2px] mt-5 
                  ${t<=e?"bg-indigo-600":"bg-gray-300"}`})]},s.title))})});export{y as P,w as c};
