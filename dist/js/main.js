!function e(t,n,r){function i(o,u){if(!n[o]){if(!t[o]){var s="function"==typeof require&&require;if(!u&&s)return s(o,!0);if(a)return a(o,!0);throw new Error("Cannot find module '"+o+"'")}var c=n[o]={exports:{}};t[o][0].call(c.exports,function(e){var n=t[o][1][e];return i(n||e)},c,c.exports,e,t,n,r)}return n[o].exports}for(var a="function"==typeof require&&require,o=0;o<r.length;o++)i(r[o]);return i}({1:[function(e,t,n){"use strict";var r=function(e){return e&&e.__esModule?e:{default:e}}(e("./toggle"));window.addEventListener("DOMContentLoaded",function(){var e={btn:document.getElementById("menu-btn"),layout:document.getElementById("main-aside"),activeClass:"main-aside--active"};new r.default(e),$(".slick-wrapper").slick({arrows:!1,dots:!0,infinite:!0,speed:500,fade:!0,cssEase:"linear"})})},{"./toggle":2}],2:[function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=function(){function e(t){var n=t.btn,i=t.layout,a=t.activeClass;r(this,e),this.btn=n,this.layout=i,this.activeClass=a,this._events()}return i(e,[{key:"_events",value:function(){var e=this;this.btn.addEventListener("click",function(){e.layout.classList.toggle(e.activeClass)})}}]),e}();n.default=a},{}]},{},[1]);