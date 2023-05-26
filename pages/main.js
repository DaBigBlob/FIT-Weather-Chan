"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const once_upon_a_closed_source_1 = require("../once_upon_a_closed_source");
class Log {
    constructor(target_elm, init_text, locked) {
        this.log_box = target_elm;
        if ((0, once_upon_a_closed_source_1.exists)(init_text))
            target_elm.innerHTML = init_text;
        this.locked = (0, once_upon_a_closed_source_1.exists)(locked) ? locked : false;
    }
    add(text) {
        if (this.locked) {
            return false;
        }
        else {
            this.log_box.innerHTML += `${text}\n`;
            return true;
        }
    }
    ;
    lock(act) {
        this.locked = act;
        return true;
    }
    clr() {
        this.log_box.innerHTML = "";
        return true;
    }
    ;
}
const slider = document.getElementById("temperature_color_range");
const text_box = document.getElementById("temperature_number");
const log_box = document.getElementById("log_box");
const body = document.body;
if ((0, once_upon_a_closed_source_1.exists)(slider) && (text_box) && (log_box) && (body)) {
    const log = new Log(log_box);
    slider.oninput = () => {
        alert("it works");
        const color_hex = parseInt((0, once_upon_a_closed_source_1.get_color_int)({
            high: parseFloat(slider.max),
            low: parseFloat(slider.min),
            mild: 25,
            tmpr: parseFloat(slider.value)
        }).toString(), 16);
        text_box.innerHTML = `${slider.value}°C`;
        body.style.backgroundColor = `#${color_hex}`;
        log.add(`${slider.value}°C\t#${color_hex}`);
        log.clr();
    };
}
