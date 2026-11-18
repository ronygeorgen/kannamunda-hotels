/**
 * Shrink oversized images in /public to web-ready dimensions.
 * Usage: node scripts/resize-public-images.mjs
 *
 * - Handles .webp and .png (case-insensitive), everywhere under /public
 * - Only touches images whose longest side is larger than MAX_SIDE
 * - Resizes to fit within MAX_SIDE x MAX_SIDE (aspect ratio kept, never enlarged)
 * - Keeps the same file name and format, so no code changes are needed
 * - Only overwrites a file if the new version is actually smaller
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = path.resolve(__dirname, "..", "public");

const MAX_SIDE = 2560;
const WEBP_QUALITY = 85;
const EXTS = new Set([".webp", ".png"]);

function walk(dir, out = []) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) walk(full, out);
        else if (EXTS.has(path.extname(entry.name).toLowerCase())) out.push(full);
    }
    return out;
}

const mb = (bytes) => (bytes / 1024 / 1024).toFixed(1) + " MB";

// Let sharp read the file fully into memory so we can overwrite it afterwards.
sharp.cache(false);

const files = walk(PUBLIC);
let before = 0;
let after = 0;
let resized = 0;
let skipped = 0;
const failures = [];

for (const file of files) {
    const rel = path.relative(PUBLIC, file);
    const original = fs.readFileSync(file);
    before += original.length;

    try {
        const meta = await sharp(original).metadata();
        const longest = Math.max(meta.width ?? 0, meta.height ?? 0);
        if (longest <= MAX_SIDE) {
            after += original.length;
            skipped++;
            continue;
        }

        const ext = path.extname(file).toLowerCase();
        let pipeline = sharp(original)
            .rotate() // respect EXIF orientation before resizing
            .resize({ width: MAX_SIDE, height: MAX_SIDE, fit: "inside", withoutEnlargement: true });
        pipeline = ext === ".png"
            ? pipeline.png({ compressionLevel: 9, palette: false })
            : pipeline.webp({ quality: WEBP_QUALITY, effort: 5 });

        const output = await pipeline.toBuffer();
        if (output.length >= original.length) {
            after += original.length;
            skipped++;
            continue;
        }

        fs.writeFileSync(file, output);
        after += output.length;
        resized++;
        const outMeta = await sharp(output).metadata();
        console.log(`resized  ${rel}  ${meta.width}x${meta.height} -> ${outMeta.width}x${outMeta.height}  ${mb(original.length)} -> ${mb(output.length)}`);
    } catch (err) {
        after += original.length;
        failures.push(`${rel}: ${err.message}`);
    }
}

console.log("\n──────── summary ────────");
console.log(`files scanned : ${files.length}`);
console.log(`resized       : ${resized}`);
console.log(`left as-is    : ${skipped} (already ${MAX_SIDE}px or smaller)`);
console.log(`failed        : ${failures.length}`);
failures.forEach((f) => console.log("  ! " + f));
console.log(`total size    : ${mb(before)} -> ${mb(after)}`);
