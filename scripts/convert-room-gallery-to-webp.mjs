/**
 * Convert room + gallery images under Erattupetta / Poonjar to WebP.
 * Usage: node scripts/convert-room-gallery-to-webp.mjs
 *
 * - Reads jpg/jpeg/png (case-insensitive)
 * - Writes sibling .webp files (keeps originals)
 * - Skips if .webp already exists
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PUBLIC = path.join(ROOT, "public");

const TARGET_DIRS = [
  // Erattupetta rooms
  "Erattupetta/erattupetta-deluxe-room",
  "Erattupetta/erattupetta-executive-room",
  "Erattupetta/erattupetta-single-room",
  "Erattupetta/erattupetta-standard-room",
  "Erattupetta/erattupetta-non-ac-double-room",
  // Erattupetta gallery
  "Erattupetta/erattupetta-gallery",
  // Poonjar rooms
  "Poonjar/poonjar-deluxe-room",
  "Poonjar/poonjar-standard-room",
  "Poonjar/poonjar-non-ac-double-room",
  // Poonjar gallery
  "Poonjar/poonjar-gallery",
  // Bakery
  "BAKERY",
];

const SOURCE_EXTS = new Set([".jpg", ".jpeg", ".png"]);
const QUALITY = 82;

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

async function convertOne(srcPath) {
  const ext = path.extname(srcPath).toLowerCase();
  if (!SOURCE_EXTS.has(ext)) return { status: "skip-ext" };

  const webpPath = srcPath.slice(0, -ext.length) + ".webp";
  if (fs.existsSync(webpPath)) return { status: "skip-exists", webpPath };

  await sharp(srcPath)
    .rotate() // honor EXIF orientation
    .webp({ quality: QUALITY })
    .toFile(webpPath);

  return { status: "converted", webpPath };
}

async function main() {
  let converted = 0;
  let skippedExists = 0;
  let skippedExt = 0;
  let failed = 0;

  for (const rel of TARGET_DIRS) {
    const abs = path.join(PUBLIC, rel);
    if (!fs.existsSync(abs)) {
      console.warn(`[missing] ${rel}`);
      continue;
    }

    const files = walk(abs);
    console.log(`\n=== ${rel} (${files.length} files scanned) ===`);

    for (const file of files) {
      try {
        const result = await convertOne(file);
        const short = path.relative(PUBLIC, file).replaceAll("\\", "/");

        if (result.status === "converted") {
          converted++;
          console.log(`  ✓ ${short} → ${path.basename(result.webpPath)}`);
        } else if (result.status === "skip-exists") {
          skippedExists++;
        } else {
          skippedExt++;
        }
      } catch (err) {
        failed++;
        console.error(`  ✗ ${path.relative(PUBLIC, file)} — ${err.message}`);
      }
    }
  }

  console.log("\n── Summary ──");
  console.log(`Converted:      ${converted}`);
  console.log(`Already .webp:  ${skippedExists}`);
  console.log(`Skipped (ext):  ${skippedExt}`);
  console.log(`Failed:         ${failed}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
