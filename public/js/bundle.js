/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/public/js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let start = {
    boat: 640,
    boatCorrectPosition: 0,
    heroCorrectPosition: 0,
    pier: 250,
    boatPier: 425,
    hero: 480,
    limitLoadBoat: 40,
    scrolled: 0,
    moveHero: 0,
    hill03: 678,
    hill04: 940,
    speedHill03: 0.22,
    speedHill04: 0.42,
    hill03Stop: 0,
    hill04Stop: 0,
    scrollPrev: 0
};

let boat = document.querySelector('.boat-container'),
    page = document.querySelector('.page'),
    pier = document.querySelector('.pier-container'),
    heroContainer = document.querySelector('.hero-container'),
    hero = document.querySelector('.hero'),
    heroReflection = document.querySelector('.hero-reflection'),
    textBlock = document.querySelector('.text'),
    container = document.querySelector('.container'),
    mountainContainer = document.querySelector('.mountain-container'),
    mountain = document.querySelector('.mountain-01'),
    hill03 = document.querySelector('.hill-03'),
    hill04 = document.querySelector('.hill-04');

const initial = () => {
    setPageHeight();
    boat.style.left = start.boat + 'px';
    pier.style.left = start.pier + 'px';
    hill03.style.left = start.hill03 + 'px';
    hill04.style.left = start.hill04 + 'px';
    /*if (page.offsetWidth < 1000) {
        mountain.style.left = 'auto'
    }*/
};

const setPageHeight = () => {
    page.style.height = (1920 + mountainContainer.offsetHeight) * 6.3 + 'px';
};

const onWheel = e => {
    e = e || window.event;
    let delta = e.deltaY;
    if (delta > 0) document.body.style.overflow = "";
};

const boatMove = () => {
    if (start.moveHero < 0) {
        if (start.scrolled > start.scrollPrev) {
            start.scrollPrev = start.scrolled;
            document.body.style.overflow = "";
            boat.style.left = start.boat - start.scrolled + 'px';
            start.boatCorrectPosition = boat.getBoundingClientRect().left - start.scrolled;
            start.heroCorrectPosition = start.hero - start.scrolled;
        } else {
            document.body.style.overflow = "hidden";
        }
    }
    if (start.moveHero > start.limitLoadBoat) {
        boat.style.left = start.scrolled + start.boatCorrectPosition - start.limitLoadBoat + 'px';
    }
};

const heroMove = () => {
    if (start.moveHero > 0 && start.moveHero < start.limitLoadBoat) {
        hero.style.top = start.moveHero + 'px';
        heroReflection.style.top = start.moveHero + 15 + 'px';
        if (start.moveHero >= 15) {
            heroReflection.classList.add('reflect');
        } else {
            heroReflection.classList.remove('reflect');
        }
    }
};

const heroContainerMove = () => {
    if (start.moveHero > start.limitLoadBoat) heroContainer.style.left = start.scrolled + start.heroCorrectPosition - start.limitLoadBoat + 'px';
};

const textBlockMove = () => {
    if (heroContainer.getBoundingClientRect().left >= mountain.getBoundingClientRect().left) textBlock.classList.add('hide');
    if (heroContainer.getBoundingClientRect().left < mountain.getBoundingClientRect().left) textBlock.classList.remove('hide');
};

const hillMove = () => {
    if (start.moveHero <= 0) {
        hill03.style.left = start.hill03 + start.scrolled * start.speedHill03 + 'px';
        hill04.style.left = start.hill04 + start.scrolled * start.speedHill04 + 'px';
        start.hill03Stop = hill03.getBoundingClientRect().left + start.scrolled * start.speedHill03;
        start.hill04Stop = hill04.getBoundingClientRect().left + start.scrolled * start.speedHill04;
    }
    if (start.moveHero >= start.limitLoadBoat) {
        hill03.style.left = start.hill03Stop + (start.limitLoadBoat - start.scrolled) * start.speedHill03 + 'px';
        hill04.style.left = start.hill04Stop + (start.limitLoadBoat - start.scrolled) * start.speedHill04 + 'px';
    }
};

window.onscroll = function () {
    let scrolled = window.pageYOffset || document.documentElement.scrollTop;
    start.scrolled = scrolled * .1;
    start.moveHero = start.boatPier - (start.boat - start.scrolled);
    boatMove();
    heroMove();
    heroContainerMove();
    textBlockMove();
    hillMove();
};

document.addEventListener("DOMContentLoaded", initial);
document.addEventListener("wheel", onWheel);

/***/ })
/******/ ]);