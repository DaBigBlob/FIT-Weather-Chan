# FIT-Weather-Chan
Hourly weather updates for Florida Institute of Technology campus

<center> <img src="sample0.png" alt="logo" width="100%" style="border-radius: 20px"> </center>

## How do I add/use it?

1. [**Add the bot**](https://discord.com/api/oauth2/authorize?client_id=952765140468654100&permissions=536870912&scope=bot) to your FIT-related server. (only needs `Manage Webhooks` permission)

2. Make a pull request appending your channel ID to the `discord_channels` array in [`others.json`](https://github.com/DaBigBlob/FIT-Weather-Chan/blob/main/others.json). Or [contact me on discord](https://discord.com/users/710693649662476359).

3. Done. Your FIT-related server channel should start receaving hourly weather updates as above.

**NOTE: Make sure the bot has `Manage Webhooks` permission in the channel you're adding in step 2**

## Why is the embed color so ugly?

Right. So, the embed color is not static but is decided based on the temperature. ([code here](https://github.com/DaBigBlob/FIT-Weather-Chan/blob/c20dd69188d8c4955dba3ac691aa9a76d7d3c335/once_upon_a_closed_source.ts#L42))

## Nerd stuff

### Where is the rest of the code?

```ts
import { InteractionType, InteractionResponseType, RouteBases, Routes } from 'discord-api-types/v10';
import { APIPingInteraction } from 'discord-api-types/payloads/v10/_interactions/ping';
import { fitweather_credentials } from '../../../secrets';
import { createAndGetChannelWebhook, discordAuthed, getChannelWebhook } from '../discord-utils';
import { WeatherAPIEndpoint, Period, WeatherData } from './weather-types';
import { discord_channels } from './others.json';
import { CtoF, Err, FtoC, Ok, Result, dateIsoToUnixSec, exists, get_color_int, udef } from '../utils';
import { host_url } from '../main';
```
**Where is the code for these imports?** \
Most of these imports either in this repository or are from [NPM packages](https://github.com/DaBigBlob/FIT-Weather-Chan/blob/main/package.json).
FIT Weather Chan runs on my **private** API backend and uses some of the shared libraries. **But** I've collected all relevant imported code into [`once_upon_a_closed_source.ts`](https://github.com/DaBigBlob/FIT-Weather-Chan/blob/main/once_upon_a_closed_source.ts) to make this project 100% open source. ✨

### There are spelling mistakes in variable names
I dont care.

### There are improvements to be made
Please start making pull requests.

## Special thanks
- [NATIONAL WEATHER SERVICE](https://www.weather.gov/) for the weather data.
- [WillowTheFuta#2396](https://discord.com/users/710302678323953676) for the avatar and inspiration for *this*.