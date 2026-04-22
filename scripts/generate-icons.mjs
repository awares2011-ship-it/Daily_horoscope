import sharp from 'sharp';
import { mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'public', 'icons');
mkdirSync(outDir, { recursive: true });

const svgIcon = (size) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><defs><radialGradient id="bg" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#1a1530"/><stop offset="100%" stop-color="#0a0612"/></radialGradient><radialGradient id="orb" cx="40%" cy="35%" r="60%"><stop offset="0%" stop-color="#a29bfe"/><stop offset="50%" stop-color="#6C5CE7"/><stop offset="100%" stop-color="#2d1b69"/></radialGradient></defs><rect width="${size}" height="${size}" rx="${Math.round(size*0.22)}" fill="url(#bg)"/><circle cx="${size/2}" cy="${size/2}" r="${size*0.42}" fill="#fd79a8" fill-opacity="0.15"/><ellipse cx="${size*0.5}" cy="${size*0.74}" rx="${size*0.18}" ry="${size*0.04}" fill="#4a3b8c" opacity="0.5"/><rect x="${size*0.43}" y="${size*0.68}" width="${size*0.14}" height="${size*0.06}" rx="${size*0.02}" fill="#4a3b8c"/><circle cx="${size/2}" cy="${size*0.44}" r="${size*0.32}" fill="url(#orb)"/><circle cx="${size*0.41}" cy="${size*0.34}" r="${size*0.09}" fill="white" opacity="0.25"/><circle cx="${size*0.39}" cy="${size*0.33}" r="${size*0.04}" fill="white" opacity="0.5"/><circle cx="${size*0.55}" cy="${size*0.42}" r="${size*0.018}" fill="#ffeaa7" opacity="0.9"/><circle cx="${size*0.48}" cy="${size*0.52}" r="${size*0.013}" fill="#fd79a8" opacity="0.8"/><circle cx="${size*0.44}" cy="${size*0.38}" r="${size*0.01}" fill="#55efc4" opacity="0.8"/></svg>`;

const sizes = [72, 96, 128, 144, 152, 192, 384, 512, 180, 32];
for (const size of sizes) {
  const name = size === 180 ? 'apple-touch-icon' : `icon-${size}x${size}`;
  await sharp(Buffer.from(svgIcon(size))).png().toFile(join(outDir, `${name}.png`));
  console.log(`✅ ${name}.png`);
}
console.log('\n🎉 All icons generated!');
