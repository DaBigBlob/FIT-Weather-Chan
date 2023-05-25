"use strict";

import { InteractionType, InteractionResponseType, RouteBases, Routes } from 'discord-api-types/v10';
import { APIPingInteraction } from 'discord-api-types/payloads/v10/_interactions/ping';
import { fitweather_credentials } from '../../../secrets';
import { createAndGetChannelWebhook, discordAuthed, getChannelWebhook } from '../discord-utils';
import { WeatherAPIEndpoint, Period, WeatherData } from './weather-types';
import { discord_channels } from './others.json';
import { CtoF, Err, FtoC, Ok, Result, dateIsoToUnixSec, exists, get_color_int, udef } from '../utils';
import { host_url } from '../main';

const fetch_headers = {
    body: null,
    method: 'GET',
    headers: {
        'User-Agent': `${fitweather_credentials.name}/1.0 (Florida Institute of Technology Weather Discord Bot (Student Run), https://github.com/DaBigBlob/FIT-Weather-Chan)`,
        'Accept': "application/geo+json"
    }
};

//=====place for actual stuff=====
export async function dealFITWeatherBot(req: Request): Promise<Response> {

    if (!(await discordAuthed(req, fitweather_credentials.public_key))) {
        return new Response(
            JSON.stringify({message: "no. 🙃"}, null, 4),
            {headers: {"Content-Type": "application/json"}, status: 401 }
        );
    }

    const intr = await req.json() as APIPingInteraction;

    //do the thing, Bart
    if (intr.type === InteractionType.Ping) {
        return new Response(
            JSON.stringify({ type: InteractionResponseType.Pong }),
            {headers: {"Content-Type": "application/json"}, status: 200 }
        );
    }

    //log intr data if authorized cuz nothing else to do
    console.log(
        `FIT Weather Bot\n`+
        JSON.stringify(intr.data, null, 4)
    );

    //nothing 💀
    return new Response(
        JSON.stringify({message: "Why must you make me suffer?"}, null, 4),
        {headers: {"Content-Type": "application/json"}, status: 404 }
    );
}

//=====place for the other actual stuff=====
export async function dealFITWeatherScheduler(): Promise<void> {
    const now = Date.now();

    //get hourly weather
    const wthr: Result<Period> = await (async () => {
        const proto_res = (await (await fetch(`${WeatherAPIEndpoint}/hourly`, fetch_headers)).json()) as WeatherData|undefined;
        if (!exists(proto_res) || !exists(proto_res.properties.periods)) return new Err(`No data from ${WeatherAPIEndpoint}/hourly`);

        const result = proto_res.properties.periods.filter(p => (dateIsoToUnixSec(p.startTime)*1000 > now))[0];
        if (exists(result)) return new Ok(result);

        return new Err("Data too old");
    })();
    if (!wthr.isOk()) return;

    //get overall day dorcast
    const day_forcase = await (async () => {
        const proto_res = (await (await fetch(WeatherAPIEndpoint, fetch_headers)).json()) as WeatherData|undefined;
        if (!exists(proto_res) || !exists(proto_res.properties.periods)) return new Err(`No data from ${WeatherAPIEndpoint}`);

        const result = proto_res.properties.periods.find(p => (p.number == 1));
        if (exists(result)) return new Ok(result);

        return new Err("Today's data not found");
    })();

    const payload = JSON.stringify({
        content: null,
        username: "FIT Weather Chan",
        avatar_url: "https://raw.githubusercontent.com/DaBigBlob/FIT-Weather-Chan/main/avatar.png", //og awatar
        allowed_mentions: {users: [], roles: []},
        embeds: [{
            description: `**Weather** <t:${dateIsoToUnixSec(wthr.ok.startTime)}:R> **to** <t:${dateIsoToUnixSec(wthr.ok.endTime)}:R>\n[>project source code here<](https://github.com/DaBigBlob/FIT-Weather-Chan)`,
            color: get_color_int((wthr.ok.temperatureUnit == "F") ? FtoC(wthr.ok.temperature) : wthr.ok.temperature),
            thumbnail: { url: udef(wthr.ok.icon, "") },
            fields: [
                { name: "TL;DR", value: `${wthr.ok.shortForecast}`, inline: false },
                { name: "Temperature", value: `${Math.floor(wthr.ok.temperature)}°${wthr.ok.temperatureUnit}/${Math.floor(FtoC(wthr.ok.temperature))}°C`, inline: true },
                { name: "Wind", value: `${wthr.ok.windSpeed} ${wthr.ok.windDirection}`, inline: true },
                { name: "Dewpoint", value: `${Math.floor(CtoF(wthr.ok.dewpoint.value))}°F/${Math.floor(wthr.ok.dewpoint.value)}°C`, inline: true },
                { name: "Relative Humidity", value: `${wthr.ok.relativeHumidity.value}%`, inline: true },
                { name: "Probability of Rain", value: `${wthr.ok.probabilityOfPrecipitation.value}%`, inline: true }
            ].concat((day_forcase.isOk()) ? [
                { name: `Overall ${day_forcase.ok.name}`, value: `${day_forcase.ok.detailedForecast}`, inline: false },
            ] : []),
            image: { url: `${host_url}/fitweather/dist/${crypto.randomUUID()}` } //to circumvent discord's media caching ✨nightmare✨
        }]
    });

    //for each discord channel
    for (let i=0; i<discord_channels.length; i++) {
        const got_hook = await (async () => {
            const cid = discord_channels[i];
            const proto_res1 = await getChannelWebhook(fitweather_credentials, cid);
            if (exists(proto_res1) && exists(proto_res1.token)) return proto_res1;
            const proto_res2 = await createAndGetChannelWebhook(fitweather_credentials, cid);
            if (exists(proto_res2) && exists(proto_res2.token)) return proto_res2;
            return null;
        })();
        if (!exists(got_hook)) continue;

        await fetch(`${RouteBases.api}${Routes.webhook(got_hook.id, got_hook.token)}`, {
            body: payload,
            method: 'POST',
            headers: {'content-type': 'application/json'}
        });
    }
        
}