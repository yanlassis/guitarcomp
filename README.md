# GuitarComp

Learn to play guitar easier by looping certain parts of the song you would like to learn.

Repository: https://github.com/yanlassis/guitarcomp

## MVP features

- Choose an audio file stored on the user's device.
- Play, pause, and seek through the audio.
- Practice at 50%, 75%, or 100% speed.
- Mark two points and repeat the selected A–B interval.

## Privacy and session behavior

The selected audio stays on the user's device and is not uploaded. GuitarComp has no account, back-end, or database. Audio, playback position, speed, and loop points reset when the page is refreshed.

## Run locally

1. Open the project folder in Visual Studio Code.
2. Serve `index.html` with the Live Preview extension.
3. Open the local address provided by Live Preview.

A local server is required because the browser loads the JavaScript files as modules.

## Project structure

- `index.html` defines the page and its controls.
- `styles.css` controls appearance and responsive layout.
- `script.js` connects user actions to the audio player.
- `utils.js` contains reusable formatting and validation functions.
- `utils.test.js` tests the functions in `utils.js`.
- `package.json` defines the JavaScript module type and the test command.

## Deployment

GitHub Pages will host the static application. The public address will be added after the first deployment.
