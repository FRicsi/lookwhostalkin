# Look, who's talkin'

A small static website configured for Firebase Hosting.

## Overview

- Static site served from the `public/` directory.
- Uses `public/index.html` as the main entry point, with `public/script.js` and `public/style.css` for behavior and styling.
- A `firebase.json` file is present for Firebase Hosting configuration.

## Project structure

- public/
  - index.html
  - 404.html
  - script.js
  - style.css
  - style_old.css
  - images/
- firebase.json

## Quick start

Preview locally using the Firebase CLI (recommended):

```bash
npm install -g firebase-tools
firebase login
firebase serve --only hosting
# or
firebase emulators:start --only hosting
```

Preview with a simple static server (from the project root):

```powershell
cd public
python -m http.server 5000
# open http://localhost:5000
```

Or with Node's `http-server`:

```bash
npx http-server public -p 5000
```

## Deploy

Deploy to Firebase Hosting:

```bash
firebase deploy --only hosting
```

## Notes

- Main entry: `public/index.html`.
- Styles: `public/style.css` (older styles kept in `style_old.css`).
- Static assets live in `public/images/`.

If you want, I can also add a short `package.json` or a simple local-run script. Ask if you'd like that.
