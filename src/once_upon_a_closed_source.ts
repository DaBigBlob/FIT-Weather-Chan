// ALL THINGS IN THIS FILE ARE FROM BY PRIVATE LIBRARIES AND
// WERE ONCE CLOSED SOURCE.
// IN EFFORTS TO COMPLETELY OPEN SOURCE "FIT Weather Chan"
// I HAVE COLLECTED ALL THE NECESSARY CODE FROM MY PRIVATE
// LIBRARIES AND PUT THEM HERE.
"use strict";

export function exists<T>(data: T|null|undefined): data is T {
  if (
      (data === null) ||
      (data === undefined)
  ) return false;
  return true;
}

export class Log {
  locked: boolean;
  log_box: HTMLTextAreaElement;

  constructor(target_elm: HTMLTextAreaElement, init_text?: string, locked?: boolean) {
      this.log_box = target_elm;
      if (exists(init_text)) target_elm.innerHTML = init_text;
      this.locked = exists(locked) ? locked : false;
  }

  add(text: string): boolean {
      if (this.locked) {
          return false;
      } else {
          this.log_box.innerHTML += `${text}\n`;
          return true;
      }
  };
  lock(act: boolean): boolean {
      this.locked = act;
      return true;
  }
  clr(): boolean {
      this.log_box.innerHTML = "";
      return true;
  };
}

export function get_color_int(by_c?: {high: number, low: number, mild: number, tmpr: number}): string {
  let res = "";
  if (!exists(by_c)) { //no temperature -> return random
    const characters = '0123456789abcdef';
    const randomValues = new Uint8Array(6); crypto.getRandomValues(randomValues);
    randomValues.forEach(int => res += characters.charAt(int % characters.length));
  } else { //this is a linear map 🥲
    if (by_c.high <= by_c.low) by_c.high = by_c.low+2; //avoid /0 error
    if ((by_c.low > by_c.mild)||(by_c.high < by_c.mild)) by_c.mild = (by_c.high+by_c.low)/2;
    if (by_c.tmpr <= by_c.low) by_c.tmpr = by_c.low;
    if (by_c.tmpr >= by_c.high) by_c.tmpr = by_c.high;
    if (by_c.tmpr > by_c.mild) {
      const norm = (by_c.tmpr-by_c.mild)/(by_c.high-by_c.mild);
      res = Math.floor(127+(norm*127)).toString(16);
      res += "7f"+Math.floor((by_c.tmpr-25)*255/15).toString(16);
    } else {
      const norm = (by_c.tmpr-by_c.low)/(by_c.mild-by_c.low);
      res = Math.floor(norm*127).toString(16);
      res += "7f"+Math.floor((by_c.tmpr-25)*255/15).toString(16);
    }
  }
  return res;
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