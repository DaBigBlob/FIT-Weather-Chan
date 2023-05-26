"use strict";

export function exists<T>(data: T|null|undefined): data is T {
  if (
      (data === null) ||
      (data === undefined)
  ) return false;
  return true;
}

export function get_color_int(by_c?: {high: number, low: number, mild: number, tmpr: number}): number { //range: 10c to 40c
  let result = "";
  if (!exists(by_c)) { //no temperature -> return random
    const characters = '0123456789abcdef';
    const randomValues = new Uint8Array(6); crypto.getRandomValues(randomValues);
    randomValues.forEach(int => result += characters.charAt(int % characters.length));
  } else { //this is a linear map 🥲
    if (by_c.tmpr <= 10) by_c.tmpr = 10;
    if (by_c.tmpr >= 40) by_c.tmpr = 40;
    if (by_c.tmpr > 25) {
        result += Math.floor((by_c.tmpr-25)*255/15).toString(16);
    } else {
        result += "00";
    }
    result += "00";
    if (by_c.tmpr < 25) {
        result += Math.floor((25-by_c.tmpr)*255/15).toString(16);
    } else {
        result += "00";
    }
  }
  return parseInt(result, 16);
}

export function FtoC(F: number) {
  return (F-32)*5/9;
}

export function CtoF(C: number) {
  return (C*9/5)+32;
}

export function dateIsoToUnixSec(iso: string) {
  return (new Date(iso)).getTime()/1000
}