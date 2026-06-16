// Optional Google Apps Script file
// Use this only if you want to host the same standalone app using Google Apps Script.
// The app still uses browser localStorage only. It does not save to Google Sheets.

function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('Market Entry Offline')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}
