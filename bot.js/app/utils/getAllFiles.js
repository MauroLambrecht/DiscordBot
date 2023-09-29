const fs = require("fs");
const path = require("path");

module.exports = (directory, foldersOnly = false) => {
  let fileNames = [];

  const files = fs.readdirSync(directory, { withFileTypes: true });

  for (const file of files) {
    const filePath = path.join(directory, file.name);

    // Exclude files within a folder named "Sub"
    if (file.isDirectory() && file.name === "Sub") {
      continue;
    }

    if (foldersOnly) {
      if (file.isDirectory()) {
        fileNames.push(filePath);
      }
    } else {
      if (file.isFile()) {
        fileNames.push(filePath);
      }
    }

    // Recursively traverse subdirectories if the current file is a directory
    if (file.isDirectory()) {
      const subdirectoryFiles = module.exports(filePath, foldersOnly);
      fileNames.push(...subdirectoryFiles);
    }
  }

  return fileNames;
};
