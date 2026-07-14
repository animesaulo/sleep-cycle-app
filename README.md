# Sleep Cycle App

An ad-free, beginner-friendly sleep cycle calculator built with plain HTML, CSS, and JavaScript.

This project is meant to be a clean alternative to online sleep calculator sites or apps that may include ads, distractions, or unnecessary clutter.

## Features

- Calculate recommended bedtimes from a wake-up time
- Calculate recommended wake-up times from a bedtime
- Compare bedtime and wake-up results with and without the 15-minute fall-asleep estimate
- Use 90-minute sleep cycles
- Start from the current time with the Sleep Now button
- Responsive layout for phones, tablets, and desktops
- No ads, trackers, accounts, or external dependencies
- Installable from supported browsers as a Progressive Web App

## How it works

Most sleep cycle calculators estimate sleep in 90-minute cycles. This app uses 3 to 6 full cycles.

It also accounts for the fact that people usually do not fall asleep the instant they get into bed. A common estimate is that it takes about 15 minutes to fall asleep, so the app shows results with that buffer included:

- When calculating bedtimes from a wake-up time, "Get in bed by" is 15 minutes earlier than "Sleep starts at."
- When calculating wake-up times from a bedtime, "After 15 min" shows what changes if sleep starts about 15 minutes after getting into bed.

These times are estimates, not medical advice. Your own sleep needs may vary.

## Run locally

For a quick preview, open `index.html` in a web browser. No build tools or dependencies are required.

To test installability and offline support, serve the folder from a local web server:

```bash
python3 -m http.server 4173
```

Then open `http://127.0.0.1:4173/`.

## Install as an app

This project includes a web manifest and service worker so supported browsers can install it as a Progressive Web App.

- Chrome or Edge: use the install icon in the address bar or the browser menu.
- Android Chrome: choose Install app or Add to Home screen.
- iPhone or iPad Safari: use Share, then Add to Home Screen.
- Desktop Safari support depends on your macOS and Safari version.
- The page shows browser-specific install help only when it is opened as a website, not when it is already running as an installed app.

Install prompts usually require HTTPS when the app is hosted online. Localhost works for testing.
