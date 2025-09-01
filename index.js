// index.js
const fs = require('fs');
const path = require('path');

function charToDigit(ch) {
  if (ch >= '0' && ch <= '9') return ch.charCodeAt(0) - 48;
  ch = ch.toLowerCase();
  if (ch >= 'a' && ch <= 'z') return ch.charCodeAt(0) - 87; // 'a' -> 10
  throw new Error(`Invalid digit character: ${ch}`);
}

function parseToBigInt(str, base) {
  // Parse an arbitrary-length string `str` in given base (<=36) to BigInt
  let res = 0n;
  const b = BigInt(base);
  for (let i = 0; i < str.length; i++) {
    const d = charToDigit(str[i]);
    if (d >= base) throw new Error(`Digit '${str[i]}' not valid for base ${base}`);
    res = res * b + BigInt(d);
  }
  return res;
}

function computeConstant(obj) {
  if (!obj.keys || typeof obj.keys.k === 'undefined') {
    throw new Error('JSON must contain keys.k');
  }
  const k = Number(obj.keys.k);
  // Collect root keys (ignore the "keys" top-level entry), sort numerically
  const rootKeys = Object.keys(obj)
    .filter(k2 => k2 !== 'keys')
    .sort((a, b) => Number(a) - Number(b));

  if (rootKeys.length < k) {
    throw new Error(`Need at least k=${k} roots, found ${rootKeys.length}`);
  }

  const selected = rootKeys.slice(0, k); // take first k roots
  let product = 1n;
  for (const key of selected) {
    const entry = obj[key];
    const base = Number(entry.base);
    const val = String(entry.value);
    const root = parseToBigInt(val, base);
    product *= root;
  }

  if (k % 2 === 1) product = -product; // (-1)^k
  return product;
}

(function main() {
  const inputPath = process.argv[2] || 'input.json';
  const full = path.resolve(inputPath);
  if (!fs.existsSync(full)) {
    console.error('Input file not found:', full);
    process.exit(1);
  }
  const raw = fs.readFileSync(full, 'utf8');
  const obj = JSON.parse(raw);
  try {
    const c = computeConstant(obj);
    console.log(c.toString());
  } catch (e) {
    console.error('Error:', e.message);
    process.exit(2);
  }
})();
