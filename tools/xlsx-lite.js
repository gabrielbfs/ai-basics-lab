/* ==========================================================================
   xlsx-lite: write a simple one-sheet Excel (.xlsx) file with no packages.

   writeXlsx(path, { sheet: "Data", columns: [{ key, width }], rows: [ {...} ] })
   - First row = column keys, bold, frozen.
   - Numbers are stored as numbers; everything else as text.
   - Output is deterministic (fixed timestamps), so re-running gives identical files.
   Uses zip-lite.js (Node built-ins only).
   ========================================================================== */
"use strict";
const fs = require("fs");
const { zip } = require("./zip-lite");

const xmlEsc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const colName = n => { let s = ""; n++; while (n > 0) { const m = (n - 1) % 26; s = String.fromCharCode(65 + m) + s; n = Math.floor((n - 1) / 26); } return s; };

function sheetXml(columns, rows) {
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
    columns.map((c, i) => cell(r[c.key], colName(i) + (k + 2), 0)).join("") + "</row>").join("");
  const cols = "<cols>" + columns.map((c, i) => '<col min="' + (i + 1) + '" max="' + (i + 1) + '" width="' + (c.width || 14) + '" customWidth="1"/>').join("") + "</cols>";
  return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
    '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">' +
    '<dimension ref="A1:' + colName(columns.length - 1) + (rows.length + 1) + '"/>' +
    '<sheetViews><sheetView workbookViewId="0"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews>' +
    cols + "<sheetData>" + head + body + "</sheetData></worksheet>";
}

function parts(sheetName, columns, rows) {
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
      '<sheets><sheet name="' + xmlEsc(sheetName) + '" sheetId="1" r:id="rId1"/></sheets></workbook>'],
    ["xl/_rels/workbook.xml.rels",
      '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="' + NS + '/package/2006/relationships">' +
      '<Relationship Id="rId1" Type="' + NS + '/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>' +
      '<Relationship Id="rId2" Type="' + NS + '/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>'],
    ["xl/styles.xml",
      '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><styleSheet xmlns="' + NS + '/spreadsheetml/2006/main">' +
      '<fonts count="2"><font><sz val="11"/><name val="Arial"/></font><font><b/><sz val="11"/><name val="Arial"/></font></fonts>' +
      '<fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills>' +
      '<borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>' +
      '<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>' +
      '<cellXfs count="2"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/><xf numFmtId="0" fontId="1" fillId="0" borderId="0" xfId="0" applyFont="1"/></cellXfs>' +
      '<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles></styleSheet>'],
    ["xl/worksheets/sheet1.xml", sheetXml(columns, rows)]
  ];
}

function writeXlsx(path, { sheet = "Data", columns, rows }) {
  fs.writeFileSync(path, zip(parts(sheet, columns, rows)));
}

module.exports = { writeXlsx };
