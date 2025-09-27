import fs from "fs";
import path from "path";

const dirPath = path.resolve("src");
let filesData = {};

function readDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      readDir(fullPath);
    } else if (/\.(ts|tsx|js|jsx|json|css|html)$/.test(file)) {
      filesData[fullPath.replace(dirPath + "/", "")] = fs.readFileSync(
        fullPath,
        "utf-8"
      );
    }
  }
}

readDir(dirPath);

// ✅ اكتب الملف في public
fs.writeFileSync("public/project.json", JSON.stringify(filesData, null, 2));
console.log(
  "✅ Project exported to public/project.json with",
  Object.keys(filesData).length,
  "files"
);
