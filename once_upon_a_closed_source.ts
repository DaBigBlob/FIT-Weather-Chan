"use strict";

export function udef<T, Y>(data: T, else_data: Y) {
  if ((data === null) || (data === undefined)) return else_data;
  return data;
}

export function exists<T>(data: T|null|undefined): data is T {
  if (
      (data === null) ||
      (data === undefined)
  ) return false;
  return true;
}

export class Ok<T> {
  readonly ok: T;

  constructor(data: T) {
    this.ok = data;
  }

  isOk(): this is Ok<T> {
    return true;
  }
}
  
export class Err {
  readonly err: string;

  constructor(reason: string) {
    this.err = reason;
  }

  isOk(): this is never {
    return false;
  }
}

export type Result<T> = Ok<T>|Err;

export function get_color_int(tmpr?: number): number { //range: 10c to 40c
  let result = "";
  if (!exists(tmpr)) { //no temperature -> return random
    const characters = '0123456789abcdef';
    const randomValues = new Uint8Array(6); crypto.getRandomValues(randomValues);
    randomValues.forEach(int => result += characters.charAt(int % characters.length));
  } else { //this is a linear map 🥲
    if (tmpr <= 10) tmpr = 10;
    if (tmpr >= 40) tmpr = 40;
    if (tmpr > 25) {
        result += Math.floor((tmpr-25)*255/15).toString(16);
    } else {
        result += "00";
    }
    result += "00";
    if (tmpr < 25) {
        result += Math.floor((25-tmpr)*255/15).toString(16);
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