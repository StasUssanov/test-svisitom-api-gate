const fs = require('fs');

fs.readdirSync('src/modules', { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name)
  .forEach((moduleName) => {
    fs.readdirSync(`src/modules/${moduleName}/schema`, { withFileTypes: true })
      .filter((dirent) => dirent.isFile())
      .forEach((fileName) => {
        const distDir = `dist/modules/${moduleName}/schema`;
        if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true });
        fs.copyFileSync(`src/modules/${moduleName}/schema/${fileName.name}`, `${distDir}/${fileName.name}`);
      });
  });
