"use strict";

import { CtoF, exists, get_color_int, log } from '../src/once_upon_a_closed_source';
  
const slider = document.getElementById("temperature_color_range") as HTMLInputElement|null;
const text_box = document.getElementById("temperature_number") as HTMLDivElement|null;
const log_box = document.getElementById("log_box") as HTMLTextAreaElement|null;
const body = document.body;

if (exists(slider)&&(text_box)&&(log_box)&&(body)) {
    const ini_temp_val = slider.value;
    log.add_screen(log_box);

    slider.oninput = () => {
        const color_hex = get_color_int({
            high: parseFloat(slider.max),
            low: parseFloat(slider.min),
            mild: parseFloat(ini_temp_val),
            tmpr: parseFloat(slider.value)
        }).toString(16).padStart(6, '0');

        const C = parseFloat(slider.value);
        const tmprs = `${C.toFixed(2)}°C/${CtoF(C).toFixed(2)}°F`;
        text_box.innerHTML = tmprs;
        body.style.backgroundColor = `#${color_hex}`;
        log.add(`tempr: ${tmprs},\tcolor: #${color_hex}`);
    }

    text_box.onclick = () => {
        const color_hex = get_color_int({
            high: parseFloat(slider.max),
            low: parseFloat(slider.min),
            mild: parseFloat(ini_temp_val),
            tmpr: parseFloat(ini_temp_val)
        }).toString(16).padStart(6, '0');

        log.clear_data();
        log.clear_screen();
        slider.value = ini_temp_val;
        const C = parseFloat(slider.value);
        const tmprs = `${C.toFixed(2)}°C/${CtoF(C).toFixed(2)}°F`;
        text_box.innerHTML = tmprs;
        body.style.backgroundColor = `#${color_hex}`;
    }
}
