#!/usr/bin/env node
// Re-box logo SVGs onto the Breathe clear-space rule:
//
//   clear space = 1/8 of the bounding box's shorter side, on all four sides
//   both box dimensions land on the 8pt grid
//   the mark is contained in the inner area and optically centred
//
// The artwork itself is never edited — it is wrapped in a single
// <g transform="translate(...) scale(...)"> and the viewBox is rewritten.
//
//   node tools/logo-bounding-box.mjs --check public/assets/logos
//   node tools/logo-bounding-box.mjs public/assets/logos
//
// ponytail: flattens curves by sampling instead of solving bezier extrema —
// 64 samples is already sub-0.01px on logo-scale curves. Solve analytically
// only if a mark ever shows visible drift.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const PAD_DIVISOR = 8; // clear space = short side / 8
const GRID = 8; // 8pt grid
const SAMPLES = 64;

const round8 = n => Math.max(GRID, Math.round(n / GRID) * GRID);

// ---------------------------------------------------------------- path bounds

const ARGC = { M: 2, L: 2, H: 1, V: 1, C: 6, S: 4, Q: 4, T: 2, A: 7, Z: 0 };

function makeBox() {
  return { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity };
}

function hit(box, x, y) {
  if (x < box.minX) box.minX = x;
  if (x > box.maxX) box.maxX = x;
  if (y < box.minY) box.minY = y;
  if (y > box.maxY) box.maxY = y;
}

function cubic(box, p0, p1, p2, p3) {
  for (let i = 0; i <= SAMPLES; i++) {
    const t = i / SAMPLES;
    const u = 1 - t;
    const a = u * u * u, b = 3 * u * u * t, c = 3 * u * t * t, d = t * t * t;
    hit(box, a * p0[0] + b * p1[0] + c * p2[0] + d * p3[0], a * p0[1] + b * p1[1] + c * p2[1] + d * p3[1]);
  }
}

function pathBounds(d, box) {
  const toks = d.match(/[MmLlHhVvCcSsQqTtAaZz]|-?\d*\.?\d+(?:[eE][-+]?\d+)?/g) || [];
  let i = 0, cx = 0, cy = 0, sx = 0, sy = 0, cmd = 'M';
  let prevCtrl = null; // reflection point for S/T
  while (i < toks.length) {
    if (/[a-zA-Z]/.test(toks[i])) { cmd = toks[i]; i++; }
    const up = cmd.toUpperCase();
    const rel = cmd !== up;
    const n = ARGC[up];
    if (n === undefined) { i++; continue; }
    if (up === 'Z') { cx = sx; cy = sy; hit(box, cx, cy); prevCtrl = null; continue; }
    const a = toks.slice(i, i + n).map(Number);
    if (a.length < n) break;
    i += n;
    const px = cx, py = cy;
    if (up === 'H') { cx = rel ? cx + a[0] : a[0]; hit(box, cx, cy); prevCtrl = null; }
    else if (up === 'V') { cy = rel ? cy + a[0] : a[0]; hit(box, cx, cy); prevCtrl = null; }
    else if (up === 'M' || up === 'L' || up === 'T') {
      cx = rel ? cx + a[0] : a[0];
      cy = rel ? cy + a[1] : a[1];
      hit(box, cx, cy);
      if (up === 'M') { sx = cx; sy = cy; cmd = rel ? 'l' : 'L'; }
      // T's implied control is a reflection; sampling the endpoints plus the
      // reflected control keeps the hull honest without a full quad expansion.
      if (up === 'T' && prevCtrl) hit(box, 2 * px - prevCtrl[0], 2 * py - prevCtrl[1]);
      prevCtrl = up === 'T' ? [2 * px - (prevCtrl ? prevCtrl[0] : px), 2 * py - (prevCtrl ? prevCtrl[1] : py)] : null;
    }
    else if (up === 'C') {
      const c1 = [rel ? px + a[0] : a[0], rel ? py + a[1] : a[1]];
      const c2 = [rel ? px + a[2] : a[2], rel ? py + a[3] : a[3]];
      cx = rel ? px + a[4] : a[4];
      cy = rel ? py + a[5] : a[5];
      cubic(box, [px, py], c1, c2, [cx, cy]);
      prevCtrl = c2;
    }
    else if (up === 'S') {
      const c1 = prevCtrl ? [2 * px - prevCtrl[0], 2 * py - prevCtrl[1]] : [px, py];
      const c2 = [rel ? px + a[0] : a[0], rel ? py + a[1] : a[1]];
      cx = rel ? px + a[2] : a[2];
      cy = rel ? py + a[3] : a[3];
      cubic(box, [px, py], c1, c2, [cx, cy]);
      prevCtrl = c2;
    }
    else if (up === 'Q') {
      const q = [rel ? px + a[0] : a[0], rel ? py + a[1] : a[1]];
      cx = rel ? px + a[2] : a[2];
      cy = rel ? py + a[3] : a[3];
      // quadratic → cubic control points
      cubic(box, [px, py], [px + (2 / 3) * (q[0] - px), py + (2 / 3) * (q[1] - py)],
        [cx + (2 / 3) * (q[0] - cx), cy + (2 / 3) * (q[1] - cy)], [cx, cy]);
      prevCtrl = q;
    }
    else if (up === 'A') {
      // Arcs are absent from these Figma exports; endpoint bounds are enough.
      cx = rel ? px + a[5] : a[5];
      cy = rel ? py + a[6] : a[6];
      hit(box, cx, cy);
      prevCtrl = null;
    }
  }
}

const attr = (tag, name) => {
  const m = tag.match(new RegExp('(?:^|[\\s])' + name + '="([^"]*)"'));
  return m ? m[1] : null;
};
const num = (tag, name, fallback = 0) => {
  const v = attr(tag, name);
  return v === null ? fallback : Number(v);
};

// ---------------------------------------------------------------- svg parsing

function parse(src) {
  const open = src.match(/<svg\b[^>]*>/);
  const root = open[0];
  const inner = src.slice(open.index + root.length, src.lastIndexOf('</svg>'));
  const vb = attr(root, 'viewBox').trim().split(/[\s,]+/).map(Number);
  return { root, inner, vb };
}

// <defs> holds clip/mask geometry that is not ink.
const stripDefs = s => s.replace(/<defs\b[\s\S]*?<\/defs>/g, '');

function inkBounds(inner) {
  const body = stripDefs(inner);
  const box = makeBox();
  for (const m of body.matchAll(/\bd="([^"]+)"/g)) pathBounds(m[1], box);
  for (const m of body.matchAll(/<rect\b([^>]*?)\/?>/g)) {
    const t = m[1];
    hit(box, num(t, 'x'), num(t, 'y'));
    hit(box, num(t, 'x') + num(t, 'width'), num(t, 'y') + num(t, 'height'));
  }
  for (const m of body.matchAll(/<circle\b([^>]*?)\/?>/g)) {
    const t = m[1], r = num(t, 'r');
    hit(box, num(t, 'cx') - r, num(t, 'cy') - r);
    hit(box, num(t, 'cx') + r, num(t, 'cy') + r);
  }
  return box;
}

// A full-bleed coloured <rect> is the plate, not the mark: it must stay
// flush to the new box while the mark is inset within it.
function splitPlate(inner, vw, vh) {
  const m = inner.match(/^\s*<rect\b([^>]*?)\/?>/);
  if (!m) return { plate: null, rest: inner };
  const t = m[1];
  const fill = attr(t, 'fill');
  const covers = Math.abs(num(t, 'x')) < 0.5 && Math.abs(num(t, 'y')) < 0.5 &&
    Math.abs(num(t, 'width') - vw) < 0.5 && Math.abs(num(t, 'height') - vh) < 0.5;
  if (!covers || !fill || fill === 'none') return { plate: null, rest: inner };
  return { plate: t, rest: inner.slice(m[0].length) };
}

// ---------------------------------------------------------------- the re-box

// A file we have already re-boxed carries our wrapper. Unwrap it so every run
// measures the untouched artwork and re-emits one group — never a nest of them.
const WRAPPER = /^<g transform="translate\(([-\d.]+) ([-\d.]+)\) scale\(([-\d.]+)\)">([\s\S]*)<\/g>$/;

function unwrap(rest) {
  const m = rest.trim().match(WRAPPER);
  if (!m) return { content: rest, tx: 0, ty: 0, scale: 1 };
  return { content: m[4], tx: Number(m[1]), ty: Number(m[2]), scale: Number(m[3]) };
}

function plan(src) {
  const { root, inner, vb } = parse(src);
  const [, , vw, vh] = vb;
  const split = splitPlate(inner, vw, vh);
  const plate = split.plate;
  const prev = unwrap(split.rest);
  const rest = prev.content;
  const ink = inkBounds(rest);
  if (!isFinite(ink.minX)) return null;

  const artW = ink.maxX - ink.minX;
  const artH = ink.maxY - ink.minY;

  // The box keeps the size it already has, snapped to the 8pt grid. Clear
  // space is a MINIMUM, so the mark is only ever scaled down to honour it —
  // a box that is already generous stays generous.
  const boxW = round8(vw);
  const boxH = round8(vh);
  const pad = Math.min(boxW, boxH) / PAD_DIVISOR;

  const scale = Math.min(1, (boxW - pad * 2) / artW, (boxH - pad * 2) / artH);
  const tx = (boxW - artW * scale) / 2 - ink.minX * scale;
  const ty = (boxH - artH * scale) / 2 - ink.minY * scale;

  // Smallest gap between the mark and the box edge once re-boxed.
  const clear = Math.min((boxW - artW * scale) / 2, (boxH - artH * scale) / 2);

  // Compare against what the file already renders, not against raw artwork —
  // otherwise an already-correct file reports as needing a fix on every run.
  const drift = Math.max(
    Math.abs(scale - prev.scale) * Math.max(artW, artH),
    Math.abs(tx - prev.tx),
    Math.abs(ty - prev.ty)
  );

  return { root, inner, plate, rest, vw, vh, artW, artH, boxW, boxH, pad, clear, scale, tx, ty, drift };
}

const fmt = n => Number(n.toFixed(4)).toString();

function rewrite(src) {
  const p = plan(src);
  if (!p) return null;
  const root = p.root
    .replace(/\swidth="[^"]*"/, ` width="${p.boxW}"`)
    .replace(/\sheight="[^"]*"/, ` height="${p.boxH}"`)
    .replace(/\sviewBox="[^"]*"/, ` viewBox="0 0 ${p.boxW} ${p.boxH}"`);

  let out = root;
  if (p.plate) {
    const plate = p.plate
      .replace(/\swidth="[^"]*"/, ` width="${p.boxW}"`)
      .replace(/\sheight="[^"]*"/, ` height="${p.boxH}"`);
    out += `<rect${plate}/>`;
  }
  out += `<g transform="translate(${fmt(p.tx)} ${fmt(p.ty)}) scale(${fmt(p.scale)})">${p.rest}</g></svg>\n`;
  return { svg: out, p };
}

export { plan, rewrite, round8, PAD_DIVISOR, GRID };

// ---------------------------------------------------------------------- cli

const invokedDirectly = process.argv[1] &&
  path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));
if (invokedDirectly) {

const args = process.argv.slice(2);
const check = args.includes('--check');
const targets = args.filter(a => !a.startsWith('--'));

const files = [];
for (const t of targets) {
  const st = fs.statSync(t);
  if (st.isFile()) { files.push(t); continue; }
  const walk = dir => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const f = path.join(dir, e.name);
      if (e.isDirectory()) walk(f);
      else if (e.name.endsWith('.svg')) files.push(f);
    }
  };
  walk(t);
}

const rows = [];
let written = 0;
for (const f of files.sort()) {
  const src = fs.readFileSync(f, 'utf8');
  const r = rewrite(src);
  if (!r) { rows.push({ file: f, note: 'no geometry — skipped' }); continue; }
  const { p } = r;
  const changed = p.boxW !== p.vw || p.boxH !== p.vh || p.drift > 0.5;
  rows.push({
    file: path.relative(process.cwd(), f).split(path.sep).join('/'),
    box: p.boxW === p.vw && p.boxH === p.vh ? `${p.boxW}×${p.boxH}` : `${p.vw}×${p.vh} → ${p.boxW}×${p.boxH}`,
    need: fmt(p.pad),
    clear: fmt(Math.round(p.clear * 10) / 10),
    art: `${fmt(Math.round(p.artW * p.scale * 10) / 10)}×${fmt(Math.round(p.artH * p.scale * 10) / 10)}`,
    scale: fmt(Math.round(p.scale * 1e4) / 1e4),
    plate: p.plate ? 'plate' : '',
    action: changed ? (check ? 'would fix' : 'fixed') : 'ok'
  });
  if (!check && changed) { fs.writeFileSync(f, r.svg); written++; }
}

console.table(rows);
console.log(check ? `${rows.filter(r => r.action === 'would fix').length} of ${files.length} need re-boxing` : `${written} of ${files.length} re-boxed`);

}
