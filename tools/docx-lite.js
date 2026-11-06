/* ==========================================================================
   docx-lite: write a simple Word (.docx) file with no packages.

   writeDocx(path, blocks)  or  docxBuffer(blocks)
   blocks: [{ type: "title" | "h1" | "h2" | "p" | "bullet" | "small", text }]
   - **bold** inside text becomes a bold run
   - bullets are indented paragraphs starting with "•" (no numbering part needed)
   - fixed timestamps (via zip-lite), so re-running gives identical files
   ========================================================================== */
"use strict";
const fs = require("fs");
const { zip } = require("./zip-lite");

const W = "http://schemas.openxmlformats.org/wordprocessingml/2006/main";
const NS = "http://schemas.openxmlformats.org";
const xmlEsc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function runs(text) {
  return String(text).split(/(\*\*[^*]+\*\*)/g).filter(Boolean).map(part => {
    const bold = /^\*\*[^*]+\*\*$/.test(part);
    const t = bold ? part.slice(2, -2) : part;
    return "<w:r>" + (bold ? "<w:rPr><w:b/></w:rPr>" : "") + '<w:t xml:space="preserve">' + xmlEsc(t) + "</w:t></w:r>";
  }).join("");
}

const STYLE = { title: "Title", h1: "Heading1", h2: "Heading2", small: "Small" };

function documentXml(blocks) {
  const body = blocks.map(b => {
    if (b.type === "bullet")
      return '<w:p><w:pPr><w:ind w:left="360" w:hanging="240"/></w:pPr>' + runs("• " + b.text) + "</w:p>";
    const style = STYLE[b.type];
    return "<w:p>" + (style ? '<w:pPr><w:pStyle w:val="' + style + '"/></w:pPr>' : "") + runs(b.text) + "</w:p>";
  }).join("");
  return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="' + W + '"><w:body>' + body +
    '<w:sectPr><w:pgSz w:w="12240" w:h="15840"/><w:pgMar w:top="1260" w:right="1260" w:bottom="1260" w:left="1260" w:header="720" w:footer="720" w:gutter="0"/></w:sectPr>' +
    "</w:body></w:document>";
}

const STYLES = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:styles xmlns:w="' + W + '">' +
  '<w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial" w:cs="Arial"/><w:sz w:val="21"/><w:szCs w:val="21"/></w:rPr></w:rPrDefault>' +
  '<w:pPrDefault><w:pPr><w:spacing w:after="120" w:line="276" w:lineRule="auto"/></w:pPr></w:pPrDefault></w:docDefaults>' +
  '<w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/></w:style>' +
  '<w:style w:type="paragraph" w:styleId="Title"><w:name w:val="Title"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:pPr><w:spacing w:after="160"/></w:pPr><w:rPr><w:b/><w:color w:val="A31F34"/><w:sz w:val="34"/><w:szCs w:val="34"/></w:rPr></w:style>' +
  '<w:style w:type="paragraph" w:styleId="Heading1"><w:name w:val="heading 1"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:pPr><w:keepNext/><w:spacing w:before="240" w:after="80"/><w:outlineLvl w:val="0"/></w:pPr><w:rPr><w:b/><w:sz w:val="26"/><w:szCs w:val="26"/></w:rPr></w:style>' +
  '<w:style w:type="paragraph" w:styleId="Heading2"><w:name w:val="heading 2"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:pPr><w:keepNext/><w:spacing w:before="200" w:after="60"/><w:outlineLvl w:val="1"/></w:pPr><w:rPr><w:b/><w:color w:val="041D40"/><w:sz w:val="23"/><w:szCs w:val="23"/></w:rPr></w:style>' +
  '<w:style w:type="paragraph" w:styleId="Small"><w:name w:val="Small"/><w:basedOn w:val="Normal"/><w:rPr><w:color w:val="545759"/><w:sz w:val="18"/><w:szCs w:val="18"/></w:rPr></w:style>' +
  "</w:styles>";

function docxBuffer(blocks) {
  return zip([
    ["[Content_Types].xml",
      '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="' + NS + '/package/2006/content-types">' +
      '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>' +
      '<Default Extension="xml" ContentType="application/xml"/>' +
      '<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>' +
      '<Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>' +
      "</Types>"],
    ["_rels/.rels",
      '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="' + NS + '/package/2006/relationships">' +
      '<Relationship Id="rId1" Type="' + NS + '/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>'],
    ["word/_rels/document.xml.rels",
      '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="' + NS + '/package/2006/relationships">' +
      '<Relationship Id="rId1" Type="' + NS + '/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>'],
    ["word/styles.xml", STYLES],
    ["word/document.xml", documentXml(blocks)]
  ]);
}

function writeDocx(path, blocks) { fs.writeFileSync(path, docxBuffer(blocks)); }

module.exports = { writeDocx, docxBuffer };
