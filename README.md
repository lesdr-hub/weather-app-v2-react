# Weather App

A small React + Vite weather app backed by the OpenWeatherMap API.

## Features

- **Search** - look up weather for any city by name (debounced, searches as you type)
- **Current conditions** - temperature, "feels like," humidity, wind speed, and condition icon for the selected location
- **Hourly forecast** - upcoming 3-hour steps, scrollable
- **Multi-day forecast** - daily high/low, derived by grouping the 3-hour steps by calendar day
- **Unit toggle** - switch between metric (°C, km/h) and imperial (°F, mph); your choice is remembered across visits (localStorage)
- **Default location** - loads to Vancouver, BC on first visit; search replaces it
- Loading and error states throughout (e.g. bad search query, network failure, invalid/missing API key)

## Why not 7-day / true hourly data?

OpenWeatherMap's free tier gives you the `/weather` (current) and `/forecast` (3-hour steps, ~5 days out) endpoints. The richer "One Call 3.0" endpoint - which has real daily/hourly arrays out to 8 days - requires a separate subscription (still free for the first 1,000 calls/day, but needs a card on file). To keep this runnable on a plain free API key with zero billing setup, this app only uses the two endpoints above, and derives both the hourly and daily views from the single 3-hour forecast list.

## Setup

\`\`\`bash
npm install
cp .env.example .env   # then add your OpenWeatherMap API key
npm run dev
\`\`\`

## Scripts

- `npm run dev` - start the dev server
- `npm run build` - production build
- `npm run lint` - run ESLint