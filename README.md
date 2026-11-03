# Your Numbers App — Static Site

This entire app is 100% static. There is no backend, no server code, and no
database. Every calculation runs in the visitor's own browser using
JavaScript, and every result is saved only on that visitor's own device
using the browser's local storage. Nothing is sent to any server.

The only outside request the app makes is loading two Google Fonts over
HTTPS for styling. If you want the app to work completely offline with zero
outside requests, you can safely delete the two `<link ... fonts.googleapis
...>` lines from the top of each HTML file — the app will just fall back to
the browser's default fonts.

## Files

- `index.html` — the start page (enter your details here first)
- `dashboard.html` — your home base after calculating, with a snapshot of every section, a search box, and a rotating tip
- `overview.html`, `personality.html`, `career.html`, `compatibility.html`,
  `life-path.html`, `health.html`, `rhythms.html`, `daily.html` — the core
  result pages
- `quiz.html` — a self-check quiz comparing your own sense of yourself to your numbers (all 14 traits)
- `family.html` — save people you check often, compare any two of them, and see compatibility at a glance
- `glossary.html` — look up any number's meaning, no profile required
- `mydata.html` — your personal notebook, backup/restore, a shareable sync link, milestones, and a downloadable summary card
- `qa.html` — an in-browser self-test that checks your copy of the app is working correctly
- `shared.css` — one shared stylesheet used by every page
- `engine-data.js`, `engine-content.js`, `engine-ui.js` — the app's logic, split into three files for readability (must load in that order, which every page already does): calculations first, then the written content dictionaries, then the interactive/UI layer

All files must stay together in the same folder, because the pages link
to each other by file name. If you move the files, keep them all in one place.

## How To Use It

**Just open it locally:** double-click `index.html` and it will open in your
default browser. This works with no setup at all.

**Or host it for free, with no server needed**, using any static hosting
service:

- **GitHub Pages** — put these files in a GitHub repository and turn on
  Pages in the repository settings. No build step is needed.
- **Netlify Drop** — go to Netlify's drag-and-drop upload page and drop the
  whole folder in. It gives you a live link in seconds.
- **Cloudflare Pages / Vercel** — both support plain static folders the same
  way, with no server code to configure.

Because there is no backend anywhere, any of these will work without extra
setup, cost, or maintenance.
