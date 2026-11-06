/* ==========================================================================
   zip-lite: build a .zip (deflate) in memory with no packages.

   zip([[name, contents], ...]) -> Buffer
   - contents: a string (written as UTF-8) or a Buffer
   - names ending in "/" become folders
   - fixed timestamps, so the same input always gives the same bytes
   Used by xlsx-lite.js, docx-lite.js and the generators that make .zip downloads.
   Needs Node 20.15+ for zlib.crc32.
   ========================================================================== */
"use strict";
const zlib = require("zlib");

function zip(files) {
  const DOS_TIME = 0, DOS_DATE = ((2026 - 1980) << 9) | (1 << 5) | 1;   // 2026-01-01 00:00
  const locals = [], centrals = [];
  let offset = 0;
  for (const [name, contents] of files) {
    const isDir = name.endsWith("/");
    const nameBuf = Buffer.from(name, "utf8");
    const data = isDir ? Buffer.alloc(0) : Buffer.isBuffer(contents) ? contents : Buffer.from(String(contents), "utf8");
    const method = isDir ? 0 : 8;
    const comp = isDir ? data : zlib.deflateRawSync(data);
    const crc = isDir ? 0 : zlib.crc32(data) >>> 0;
    const lh = Buffer.alloc(30);
    lh.writeUInt32LE(0x04034b50, 0); lh.writeUInt16LE(20, 4); lh.writeUInt16LE(0x0800, 6); lh.writeUInt16LE(method, 8);
    lh.writeUInt16LE(DOS_TIME, 10); lh.writeUInt16LE(DOS_DATE, 12); lh.writeUInt32LE(crc, 14);
    lh.writeUInt32LE(comp.length, 18); lh.writeUInt32LE(data.length, 22); lh.writeUInt16LE(nameBuf.length, 26); lh.writeUInt16LE(0, 28);
    const ch = Buffer.alloc(46);
    ch.writeUInt32LE(0x02014b50, 0); ch.writeUInt16LE(20, 4); ch.writeUInt16LE(20, 6); ch.writeUInt16LE(0x0800, 8); ch.writeUInt16LE(method, 10);
    ch.writeUInt16LE(DOS_TIME, 12); ch.writeUInt16LE(DOS_DATE, 14); ch.writeUInt32LE(crc, 16);
    ch.writeUInt32LE(comp.length, 20); ch.writeUInt32LE(data.length, 24); ch.writeUInt16LE(nameBuf.length, 28);
    ch.writeUInt16LE(0, 30); ch.writeUInt16LE(0, 32); ch.writeUInt16LE(0, 34); ch.writeUInt16LE(0, 36);
    ch.writeUInt32LE(isDir ? 0x10 : 0, 38); ch.writeUInt32LE(offset, 42);
    locals.push(lh, nameBuf, comp);
    centrals.push(ch, nameBuf);
    offset += lh.length + nameBuf.length + comp.length;
  }
  const cd = Buffer.concat(centrals);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0); end.writeUInt16LE(0, 4); end.writeUInt16LE(0, 6);
  end.writeUInt16LE(files.length, 8); end.writeUInt16LE(files.length, 10);
  end.writeUInt32LE(cd.length, 12); end.writeUInt32LE(offset, 16); end.writeUInt16LE(0, 20);
  return Buffer.concat([...locals, cd, end]);
}

module.exports = { zip };
