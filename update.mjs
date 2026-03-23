const fs = await import('fs/promises');
const path = await import('path');

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
        if (!file.endsWith('page.tsx')) continue;
        if (file.includes(path.normalize('src/app/[hotel]/page.tsx'))) continue;

        let content = await fs.readFile(file, 'utf8');

        // 1. Add import
        if (!content.includes('useHotel')) {
            content = content.replace('"use client";', '"use client";\nimport { useHotel } from "@/lib/hotelContext";');
        }

        // 2. Add const hotel = useHotel();
        // Match `export default function XYZ() {` and add `const hotel = useHotel();` inside
        if (!content.includes('const hotel = useHotel();')) {
            content = content.replace(/(export default function \w+\(\)\s*{)/, '$1\n    const hotel = useHotel();');
        }

        // 3. Replace static image paths in components
        // e.g. src="/about/something.webp" -> src={`/${hotel.imagePrefix}-about/something.webp`}
        // e.g. img: "/about/something.webp" -> img: `/${hotel.imagePrefix}-about/something.webp`

        // This regex looks for double quotes and starting with / but not /common/ and ending with .webp
        content = content.replace(/"\/([^c][^"]*\.webp)"/g, '`/${hotel.imagePrefix}-$1`');

        // Same for JSX src prop natively: src={`/${...}`}
        content = content.replace(/src=`\/\$\{hotel\.imagePrefix\}-/g, 'src={`/${hotel.imagePrefix}-'); // cleanup just in case

        // Ensure that `src=` works with template strings: `src="` was replaced by `src=`` which is invalid JSX! 
        // Need to change `src=`` to `src={``}`
        content = content.replace(/src=(`\/\$\{hotel\.imagePrefix\}-[^`]+`)/g, 'src={$1}');

        await fs.writeFile(file, content);
        console.log('Updated ' + file);
    }
}

run().catch(console.error);
