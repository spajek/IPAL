#!/usr/bin/env node
// Simple Node.js script to generate a markdown file containing code from selected directories.
// Usage: node generate-md.js

import fs from "fs";
import path from "path";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const ask = (q) => new Promise((res) => rl.question(q, res));

async function main() {
  const root = process.cwd();
  const srcPath = path.join(root, "src");

  if (!fs.existsSync(srcPath)) {
    console.error("No src/ directory found in this project.");
    process.exit(1);
  }

  const onlySrc = await ask("Listuj tylko pliki z folderu /src? (y/n): ");
  const includeSrcOnly = onlySrc.trim().toLowerCase() === "y";
  rl.close();

  const outFile = path.join(root, "project_code_dump.md");
  const allowedExt = [
    ".ts",
    ".tsx",
    ".css",
    ".scss",
    ".module.css",
    ".module.scss",
  ];

  const results = [];

  function walk(dir) {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      if (item.isDirectory()) {
        walk(fullPath);
      } else {
        const ext = path.extname(item.name);
        if (allowedExt.includes(ext)) {
          const relative = path.relative(root, fullPath);
          if (!includeSrcOnly || relative.startsWith("src")) {
            const content = fs.readFileSync(fullPath, "utf8");
            results.push({ relative, content, ext });
          }
        }
      }
    }
  }

  walk(root);

  let md = "";
  for (const file of results) {
    const lang =
      file.ext === ".ts" ? "ts" : file.ext === ".tsx" ? "tsx" : "css";

    md += `# ${file.relative}:\n\n\
\`\`\`${lang}
${file.content}
\`\`\`\n\n`;
  }

  fs.writeFileSync(outFile, md, "utf8");
  console.log(`Generated: ${outFile}`);
}

main();
