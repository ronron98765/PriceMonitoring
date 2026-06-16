/**
 * Google Apps Script backend for the Cagayan de Oro Market Monitoring website.
 *
 * Google Sheet setup:
 * Sheet name: Records
 * Headers: Date | Market | DataJson | UpdatedAt
 *
 * Deployment:
 * Deploy > New deployment > Web app
 * Execute as: Me
 * Who has access: Anyone
 * Copy the /exec URL and paste it in script.js as GOOGLE_SCRIPT_URL.
 */
const SPREADSHEET_ID = '1n2JFClMhHKXt5kn6qlE_mPXQreZOQJKtPVab4eZA3q0';
const SHEET_NAME = 'Records';

function doGet(e) {
  const action = ((e && e.parameter && e.parameter.action) || 'list').toLowerCase();

  if (action === 'list' || action === 'getrecords') {
    return jsonResponse({
      success: true,
      records: getRecords_()
    });
  }

  return jsonResponse({
    success: false,
    message: 'Unknown action.'
  });
}

function doPost(e) {
  try {
    const params = e && e.parameter ? e.parameter : {};
    const action = (params.action || '').toLowerCase();

    if (action === 'save' || action === 'saveentry') {
      const raw = params.record || params.records || '';
      if (!raw) {
        return jsonResponse({
          success: false,
          message: 'Missing record data.'
        });
      }

      const record = JSON.parse(raw);
      saveRecord_(record);

      return jsonResponse({
        success: true,
        message: 'Entry saved successfully.',
        records: getRecords_()
      });
    }

    return jsonResponse({
      success: false,
      message: 'Unknown action.'
    });

  } catch (err) {
    return jsonResponse({
      success: false,
      message: err.toString()
    });
  }
}

function getSheet_() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }

  const headers = ['Date', 'Market', 'DataJson', 'UpdatedAt'];
  const firstRow = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
  const hasHeaders = headers.every((h, i) => firstRow[i] === h);

  if (!hasHeaders) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  }

  return sheet;
}

function getRecords_() {
  const sheet = getSheet_();
  const lastRow = sheet.getLastRow();

  if (lastRow < 2) {
    return [];
  }

  const values = sheet.getRange(2, 1, lastRow - 1, 4).getValues();

  return values
    .filter(row => row[0] && row[2])
    .map(row => {
      const date = row[0] instanceof Date
        ? Utilities.formatDate(row[0], Session.getScriptTimeZone(), 'yyyy-MM-dd')
        : String(row[0]);

      const record = JSON.parse(row[2]);
      record.date = record.date || date;
      record.market = record.market || String(row[1] || 'cogon');
      record.data = record.data || {};

      return record;
    })
    .sort((a, b) => {
      return String(a.date).localeCompare(String(b.date)) ||
             String(a.market).localeCompare(String(b.market));
    });
}

function saveRecord_(record) {
  if (!record || !record.date) {
    throw new Error('Record date is required.');
  }

  record.market = record.market || 'cogon';
  record.data = record.data || {};

  const sheet = getSheet_();
  const lastRow = sheet.getLastRow();
  const key = record.date + '|' + record.market;
  let targetRow = lastRow + 1;

  if (lastRow >= 2) {
    const keys = sheet.getRange(2, 1, lastRow - 1, 2).getValues().map(row => {
      const date = row[0] instanceof Date
        ? Utilities.formatDate(row[0], Session.getScriptTimeZone(), 'yyyy-MM-dd')
        : String(row[0]);
      return date + '|' + String(row[1] || 'cogon');
    });

    const index = keys.indexOf(key);
    if (index >= 0) {
      targetRow = index + 2;
    }
  }

  sheet.getRange(targetRow, 1, 1, 4).setValues([[
    record.date,
    record.market,
    JSON.stringify(record),
    new Date()
  ]]);
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
