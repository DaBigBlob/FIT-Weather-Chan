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
  private locked: boolean;
  private log_data: string;
  private log_box: HTMLTextAreaElement|null;

  constructor(target_elm?: HTMLTextAreaElement, init_text?: string, locked?: boolean) {
    this.log_box = exists(target_elm) ? target_elm : null;
    this.log_data = exists(init_text) ? init_text : "";
    this.locked = exists(locked) ? locked : false;
  }

  private update_log_box(text?: string): boolean {
    if (exists(this.log_box)) {
      if (exists(text)) {
        this.log_box.innerHTML = this.log_data;
        return true;
      } else {
        this.log_box.innerHTML = this.log_data;
        return true;
      }
    } else {
      return false;
    }
  }

  add(text: string): boolean {
    if (this.locked) {
      return false;
    } else {
      this.log_data += `${text}\n`;
      this.update_log_box();
      return true;
    }
  };

  lock(act: boolean): boolean {
    this.locked = act;
    return true;
  }

  add_screen(target_elm: HTMLTextAreaElement): boolean {
    this.log_box = target_elm;
    return true;
  }

  clear_screen(): boolean {
    this.update_log_box("");
    return true;
  };

  clear_data(): boolean {
    this.log_data = "";
    return true;
  }
}
export const log = new Log();

export function get_color_int(by_c?: {high: number, low: number, mild: number, tmpr: number}): number {
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
      res = Math.floor(127+(norm*127)).toString(16).padStart(2, '0');
      res += "7f"+Math.floor((1-norm)*127).toString(16).padStart(2, '0');

    } else {
      const norm = (by_c.tmpr-by_c.low)/(by_c.mild-by_c.low);
      res = Math.floor(norm*127).toString(16).padStart(2, '0');
      res += "7f"+Math.floor(127+(1-norm)*127).toString(16).padStart(2, '0');
    }
  }
  return parseInt(res, 16);
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