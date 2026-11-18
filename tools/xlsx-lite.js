/* ==========================================================================
   xlsx-lite: write a simple one-sheet Excel (.xlsx) file with no packages.

   writeXlsx(path, { sheet: "Data", columns: [{ key, width, format? }], rows: [ {...} ], filter? })
   - First row = column keys, bold, frozen.
   - Numbers are stored as numbers; everything else as text.
   - format: "date" stores a "YYYY-MM-DD" text value as a real Excel date (shown as 2025-01-31);
             "usd" shows a number as $1,234.50. Columns without format are unchanged.
   - filter: true turns on the filter arrows in the header row.
   - Output is deterministic (fixed timestamps), so re-running gives identical files.
   Uses zip-lite.js (Node built-ins only).
   ========================================================================== */
"use strict";
const fs = require("fs");
const { zip } = require("./zip-lite");

const xmlEsc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const colName = n => { let s = ""; n++; while (n > 0) { const m = (n - 1) % 26; s = String.fromCharCode(65 + m) + s; n = Math.floor((n - 1) / 26); } return s; };

// cellXfs index: 0 normal, 1 bold header, 2 date, 3 usd
const FMT_STYLE = { date: 2, usd: 3 };
const excelDate = s => {                    // "2025-01-31" -> days since 1899-12-30 (Excel's date serial)
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(s));
  return m ? (Date.UTC(+m[1], +m[2] - 1, +m[3]) - Date.UTC(1899, 11, 30)) / 86400000 : s;
};

function sheetXml(columns, rows, filter) {
  const cell = (v, ref, style) => {
    const s = style ? ' s="' + style + '"' : "";
    if (typeof v === "number" && isFinite(v)) return '<c r="' + ref + '"' + s + "><v>" + v + "</v></c>";
    if (v === null || v === undefined || v === "") return "";
    const t = String(v);
    const sp = /^\s|\s$/.test(t) ? ' xml:space="preserve"' : "";
    return '<c r="' + ref + '"' + s + ' t="inlineStr"><is><t' + sp + ">" + xmlEsc(t) + "</t></is></c>";
  };
  const head = '<row r="1">' + columns.map((c, i) => cell(c.key, colName(i) + "1", 1)).join("") + "</row>";
  const body = rows.map((r, k) => '<row r="' + (k + 2) + '">' +
    columns.map((c, i) => cell(c.format === "date" ? excelDate(r[c.key]) : r[c.key], colName(i) + (k + 2), FMT_STYLE[c.format] || 0)).join("") + "</row>").join("");
  const lastRef = colName(columns.length - 1) + (rows.length + 1);
  const cols = "<cols>" + columns.map((c, i) => '<col min="' + (i + 1) + '" max="' + (i + 1) + '" width="' + (c.width || 14) + '" customWidth="1"/>').join("") + "</cols>";
  return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
    '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">' +
    '<dimension ref="A1:' + lastRef + '"/>' +
    '<sheetViews><sheetView workbookViewId="0"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews>' +
    cols + "<sheetData>" + head + body + "</sheetData>" +
    (filter ? '<autoFilter ref="A1:' + lastRef + '"/>' : "") + "</worksheet>";
}

function parts(sheetName, columns, rows, filter) {
  const NS = "http://schemas.openxmlformats.org";
  return [
    ["[Content_Types].xml",
      '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="' + NS + '/package/2006/content-types">' +
      '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>' +
      '<Default Extension="xml" ContentType="application/xml"/>' +
      '<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>' +
      '<Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>' +
      '<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>' +
      "</Types>"],
    ["_rels/.rels",
      '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="' + NS + '/package/2006/relationships">' +
      '<Relationship Id="rId1" Type="' + NS + '/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>'],
    ["xl/workbook.xml",
      '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="' + NS + '/spreadsheetml/2006/main" xmlns:r="' + NS + '/officeDocument/2006/relationships">' +
      '<sheets><sheet name="' + xmlEsc(sheetName) + '" sheetId="1" r:id="rId1"/></sheets>' +
      // Excel expects this hidden name when a sheet has filter arrows
      (filter ? '<definedNames><definedName name="_xlnm._FilterDatabase" localSheetId="0" hidden="1">\'' + xmlEsc(sheetName).replace(/'/g, "''") +
        "'!$A$1:$" + colName(columns.length - 1) + "$" + (rows.length + 1) + "</definedName></definedNames>" : "") +
      "</workbook>"],
    ["xl/_rels/workbook.xml.rels",
      '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="' + NS + '/package/2006/relationships">' +
      '<Relationship Id="rId1" Type="' + NS + '/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>' +
      '<Relationship Id="rId2" Type="' + NS + '/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>'],
    ["xl/styles.xml",
      '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><styleSheet xmlns="' + NS + '/spreadsheetml/2006/main">' +
      '<numFmts count="2"><numFmt numFmtId="164" formatCode="yyyy-mm-dd"/><numFmt numFmtId="165" formatCode="&quot;$&quot;#,##0.00"/></numFmts>' +
      '<fonts count="2"><font><sz val="11"/><name val="Arial"/></font><font><b/><sz val="11"/><name val="Arial"/></font></fonts>' +
      '<fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills>' +
      '<borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>' +
      '<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>' +
      '<cellXfs count="4"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/><xf numFmtId="0" fontId="1" fillId="0" borderId="0" xfId="0" applyFont="1"/>' +
      '<xf numFmtId="164" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1"/><xf numFmtId="165" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1"/></cellXfs>' +
      '<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles></styleSheet>'],
    ["xl/worksheets/sheet1.xml", sheetXml(columns, rows, filter)]
  ];
}

function writeXlsx(path, { sheet = "Data", columns, rows, filter = false }) {
  fs.writeFileSync(path, zip(parts(sheet, columns, rows, filter)));
}

module.exports = { writeXlsx };
