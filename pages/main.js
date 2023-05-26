/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, exports) => {

// ALL THINGS IN THIS FILE ARE FROM BY PRIVATE LIBRARIES AND
// WERE ONCE CLOSED SOURCE.
// IN EFFORTS TO COMPLETELY OPEN SOURCE "FIT Weather Chan"
// I HAVE COLLECTED ALL THE NECESSARY CODE FROM MY PRIVATE
// LIBRARIES AND PUT THEM HERE.

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.dateIsoToUnixSec = exports.CtoF = exports.FtoC = exports.get_color_int = exports.Log = exports.exists = void 0;
function exists(data) {
    if ((data === null) ||
        (data === undefined))
        return false;
    return true;
}
exports.exists = exists;
class Log {
    constructor(target_elm, init_text, locked) {
        this.log_box = target_elm;
        this.log_data = exists(init_text) ? init_text : "";
        this.locked = exists(locked) ? locked : false;
    }
    add(text) {
        if (this.locked) {
            return false;
        }
        else {
            this.log_data += `${text}\n`;
            this.log_box.innerHTML = this.log_data;
            return true;
        }
    }
    ;
    lock(act) {
        this.locked = act;
        return true;
    }
    clrscr() {
        this.log_box.innerHTML = "";
        return true;
    }
    ;
    clrdata() {
        this.log_data = "";
        return true;
    }
}
exports.Log = Log;
function get_color_int(by_c) {
    let res = "";
    if (!exists(by_c)) { //no temperature -> return random
        const characters = '0123456789abcdef';
        const randomValues = new Uint8Array(6);
        crypto.getRandomValues(randomValues);
        randomValues.forEach(int => res += characters.charAt(int % characters.length));
    }
    else { //this is a linear map 🥲
        if (by_c.high <= by_c.low)
            by_c.high = by_c.low + 2; //avoid /0 error
        if ((by_c.low > by_c.mild) || (by_c.high < by_c.mild))
            by_c.mild = (by_c.high + by_c.low) / 2;
        if (by_c.tmpr <= by_c.low)
            by_c.tmpr = by_c.low;
        if (by_c.tmpr >= by_c.high)
            by_c.tmpr = by_c.high;
        if (by_c.tmpr > by_c.mild) {
            const norm = (by_c.tmpr - by_c.mild) / (by_c.high - by_c.mild);
            res = Math.floor(127 + (norm * 127)).toString(16);
            res += "7f" + Math.floor((by_c.tmpr - 25) * 255 / 15).toString(16);
        }
        else {
            const norm = (by_c.tmpr - by_c.low) / (by_c.mild - by_c.low);
            res = Math.floor(norm * 127).toString(16);
            res += "7f" + Math.floor((by_c.tmpr - 25) * 255 / 15).toString(16);
        }
    }
    return parseInt(res, 16);
}
exports.get_color_int = get_color_int;
function FtoC(F) {
    return (F - 32) * 5 / 9;
}
exports.FtoC = FtoC;
function CtoF(C) {
    return (C * 9 / 5) + 32;
}
exports.CtoF = CtoF;
function dateIsoToUnixSec(iso) {
    return (new Date(iso)).getTime() / 1000;
}
exports.dateIsoToUnixSec = dateIsoToUnixSec;


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const once_upon_a_closed_source_1 = __webpack_require__(1);
const slider = document.getElementById("temperature_color_range");
const text_box = document.getElementById("temperature_number");
const log_box = document.getElementById("log_box");
const body = document.body;
if ((0, once_upon_a_closed_source_1.exists)(slider) && (text_box) && (log_box) && (body)) {
    const log = new once_upon_a_closed_source_1.Log(log_box);
    slider.oninput = () => {
        const color_hex = (0, once_upon_a_closed_source_1.get_color_int)({
            high: parseFloat(slider.max),
            low: parseFloat(slider.min),
            mild: 25,
            tmpr: parseFloat(slider.value)
        }).toString(16);
        text_box.innerHTML = `${slider.value}°C`;
        body.style.backgroundColor = `#${color_hex}`;
        log.add(`${slider.value}°C\t#${color_hex}`);
        log.clrdata();
    };
}

})();

/******/ })()
;