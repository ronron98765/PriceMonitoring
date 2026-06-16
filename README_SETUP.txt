MARKET PRICE MONITORING - SETUP GUIDE

FILES INCLUDED
1. index.html  - main website file
2. style.css   - design file
3. script.js   - website function file
4. Code.gs     - Google Apps Script backend
5. Records_Sheet_Headers.csv - sample header file for Google Sheet

GOOGLE SHEET SETUP
1. Open your Google Sheet.
2. Create one sheet/tab named: Records
3. Put these headers in Row 1:
   Date | Market | DataJson | UpdatedAt

APPS SCRIPT SETUP
1. Open the Google Sheet.
2. Go to Extensions > Apps Script.
3. Delete existing code in Code.gs.
4. Paste the included Code.gs.
5. Save.
6. Click Deploy > New deployment.
7. Select Web app.
8. Execute as: Me
9. Who has access: Anyone
10. Click Deploy and authorize.
11. Copy the Web App URL ending in /exec.

WEBSITE SETUP
1. Open script.js.
2. Find this line:
   const GOOGLE_SCRIPT_URL = 'PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';
3. Replace it with your Web App URL.
4. Upload index.html, style.css, and script.js to GitHub Pages or your hosting.

TEST
1. Open the website.
2. Go to + Entry.
3. Enter prices.
4. Click Save Entry.
5. Check the Records sheet.
