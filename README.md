# Market Entry Offline Website

Standalone offline market price entry app using browser `localStorage` only.

## Files

- `index.html` - main website page
- `style.css` - website design and table layout
- `script.js` - offline saving, table computation, CSV export, JSON backup/import
- `Code.gs` - optional Google Apps Script hosting file only
- `README.md` - this guide

## GitHub Pages setup

1. Upload all files to a GitHub repository.
2. Make sure the main file is named `index.html`.
3. Go to **Settings > Pages**.
4. Choose **Deploy from branch**.
5. Select branch `main` and folder `/root`.
6. Open the GitHub Pages link.

## Important

This version does not use Google Sheets or AppSheet.
Data is saved only in the browser/device where the website is used.

Use **Export JSON Backup** regularly if you need to transfer or protect records.
Use **Import JSON** to restore records on another device/browser.

## Offline use

After opening the site once, users can add it to their phone home screen:

- Android Chrome: menu > Add to Home screen
- iPhone Safari: Share > Add to Home Screen

Note: Because this is localStorage only, clearing browser data will delete saved records.
