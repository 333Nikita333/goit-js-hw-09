function e(e){return e&&e.__esModule?e.default:e}var o="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},t={},r=o.parcelRequire7bc7;null==r&&((r=function(e){if(e in n)return n[e].exports;if(e in t){var o=t[e];delete t[e];var r={id:e,exports:{}};return n[e]=r,o.call(r.exports,r,r.exports),r.exports}var l=new Error("Cannot find module '"+e+"'");throw l.code="MODULE_NOT_FOUND",l}).register=function(e,o){t[e]=o},o.parcelRequire7bc7=r);var l=r("eWCmQ");const i={formEl:document.querySelector(".form")};function u(e,o){const n=Math.random()>.3;return new Promise(((t,r)=>{setTimeout((()=>{n?t({position:e,delay:o}):r({position:e,delay:o})}),o)}))}function f({position:o,delay:n}){e(l).Notify.success(`✅ Fulfilled promise ${o} in ${n}ms`)}function s({position:o,delay:n}){e(l).Notify.failure(`❌ Rejected promise ${o} in ${n}ms`)}i.formEl.addEventListener("submit",(function(e){e.preventDefault();(function({delay:e,step:o,amount:n}){for(let t=0;t<n;t+=1)u(t+1,e+o*t).then(f).catch(s)})({delay:Number(i.formEl.elements.delay.value),step:Number(i.formEl.elements.step.value),amount:Number(i.formEl.elements.amount.value)}),i.formEl.reset()}));
//# sourceMappingURL=03-promises.9e7de783.js.map
