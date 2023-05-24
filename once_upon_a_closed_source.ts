"use strict";

// import { CtoF, Err, FtoC, Ok, Result, dateIsoToUnixSec, exists, get_color_int, udef } from '../utils';
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
export function get_color_int(tmpr?: number): number { //range: -25c to 75c
    let result = "";
    if (!exists(tmpr)) { //no temperature -> return random
      const characters = '0123456789abcdef';
      const randomValues = new Uint8Array(6); crypto.getRandomValues(randomValues);
      randomValues.forEach(int => result += characters.charAt(int % characters.length));
    } else { //this is a linear map 🥲
      if (tmpr <= -25) tmpr = -25;
      if (tmpr >= 75) tmpr = 75;
      tmpr += 25;
      if (tmpr > 50) {
        result += Math.floor((tmpr-50)*255/50).toString(16);
      } else {
        result += "00";
      }
      result += "83";
      if (tmpr < 50) {
        result += Math.floor((tmpr)*255/50).toString(16);
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

