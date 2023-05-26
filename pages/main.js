"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateIsoToUnixSec = exports.CtoF = exports.FtoC = exports.get_color_int = exports.exists = void 0;
function exists(data) {
    if ((data === null) ||
        (data === undefined))
        return false;
    return true;
}
exports.exists = exists;
function get_color_int(by_c) {
    let result = "";
    if (!exists(by_c)) { //no temperature -> return random
        const characters = '0123456789abcdef';
        const randomValues = new Uint8Array(6);
        crypto.getRandomValues(randomValues);
        randomValues.forEach(int => result += characters.charAt(int % characters.length));
    }
    else { //this is a linear map 🥲
        if (by_c.tmpr <= 10)
            by_c.tmpr = 10;
        if (by_c.tmpr >= 40)
            by_c.tmpr = 40;
        if (by_c.tmpr > 25) {
            result += Math.floor((by_c.tmpr - 25) * 255 / 15).toString(16);
        }
        else {
            result += "00";
        }
        result += "00";
        if (by_c.tmpr < 25) {
            result += Math.floor((25 - by_c.tmpr) * 255 / 15).toString(16);
        }
        else {
            result += "00";
        }
    }
    return parseInt(result, 16);
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
