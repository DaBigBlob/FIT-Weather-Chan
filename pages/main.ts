"use strict";

import { exists, get_color_int } from '../once_upon_a_closed_source';

class Log {
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
  
const slider = document.getElementById("temperature_color_range") as HTMLInputElement|null;
const text_box = document.getElementById("temperature_number") as HTMLDivElement|null;
const log_box = document.getElementById("log_box") as HTMLTextAreaElement|null;
const body = document.body;
if (exists(slider)&&(text_box)&&(log_box)&&(body)) {
    const log = new Log(log_box);
    slider.oninput = () => {
        alert("it works");
        const color_hex = parseInt(get_color_int({
        high: parseFloat(slider.max),
        low: parseFloat(slider.min),
        mild: 25, //deg c
        tmpr: parseFloat(slider.value)
        }).toString(), 16);
        text_box.innerHTML = `${slider.value}°C`;
        body.style.backgroundColor = `#${color_hex}`;
        log.add(`${slider.value}°C\t#${color_hex}`);
        log.clr();
    }
}
