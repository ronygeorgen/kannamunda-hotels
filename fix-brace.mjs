import fs from 'fs/promises';
import path from 'path';

async function getFiles(dir) {
    const dirents = await fs.readdir(dir, { withFileTypes: true });
    const files = await Promise.all(dirents.map((dirent) => {
        const res = path.resolve(dir, dirent.name);
        return dirent.isDirectory() ? getFiles(res) : res;
    }));
    return Array.prototype.concat(...files);
}

async function run() {
    const files = await getFiles('./src/app/[hotel]');
    for (const file of files) {
        if (!file.endsWith('.tsx')) continue;
        let content = await fs.readFile(file, 'utf8');

        const original = content;
        // Fix: src={`/${hotel.imagePrefix}-path/file.webp` alt=... 
        // Notice the missing } after `
        content = content.replace(/src=\{(\`\/\$\{hotel\.imagePrefix\}-[^`]+\.webp\`)(?!\})/g, 'src={$1}');

        if (content !== original) {
            await fs.writeFile(file, content);
            console.log('Fixed brace in ' + file);
        }
    }
}

run().catch(console.error);
