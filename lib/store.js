import fs from "fs";
import path from "path";
import crypto from "crypto";

// Simple JSON-file persistence, scoped to Clinic and Doctor records only —
// Patient data and the assembled requisition are intentionally never
// written here; they live only in browser state for the lifetime of a
// session. Swap readAll/writeAll for real DB calls (Postgres/Mongo) later
// without touching the API route handlers.

const DATA_DIR = path.join(process.cwd(), "data");

function filePathFor(collection) {
  return path.join(DATA_DIR, `${collection}.json`);
}

function readAll(collection) {
  const file = filePathFor(collection);
  if (!fs.existsSync(file)) return [];
  const raw = fs.readFileSync(file, "utf-8").trim();
  if (!raw) return [];
  return JSON.parse(raw);
}

function writeAll(collection, records) {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(filePathFor(collection), JSON.stringify(records, null, 2));
}

export function listRecords(collection) {
  return readAll(collection);
}

export function upsertRecord(collection, record) {
  const records = readAll(collection);
  if (record.id) {
    const idx = records.findIndex((r) => r.id === record.id);
    if (idx >= 0) {
      records[idx] = { ...records[idx], ...record };
      writeAll(collection, records);
      return records[idx];
    }
  }
  const saved = { ...record, id: record.id || crypto.randomUUID() };
  records.push(saved);
  writeAll(collection, records);
  return saved;
}

export function deleteRecord(collection, id) {
  const records = readAll(collection).filter((r) => r.id !== id);
  writeAll(collection, records);
}
