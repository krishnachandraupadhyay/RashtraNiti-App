const fs = require('fs');
const path = require('path');

const wwwDir = path.join(__dirname, '..', 'www');
if (fs.existsSync(wwwDir)) {
  fs.rmSync(wwwDir, { recursive: true, force: true });
}
fs.mkdirSync(wwwDir, { recursive: true });

// Copy root files
const filesToCopy = ['index.html', 'style.css', 'manifest.json', 'sw.js'];
for (const file of filesToCopy) {
  const src = path.join(__dirname, '..', file);
  const dest = path.join(wwwDir, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
  }
}

// Copy directory recursively
function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

const srcDir = path.join(__dirname, '..', 'src');
if (fs.existsSync(srcDir)) {
  copyDir(srcDir, path.join(wwwDir, 'src'));
}

console.log('✓ www directory prepared successfully (Cross-Platform Node.js)');
