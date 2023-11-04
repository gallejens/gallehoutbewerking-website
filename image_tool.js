/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const fs = require('fs');

function generateData(dir) {
  const allPathsInDir = fs.readdirSync(dir);

  const dataForPath = {};

  for (const pathInDir of allPathsInDir) {
    const absolutePath = path.join(dir, pathInDir);
    // if path is folder let recursion handle it
    if (fs.statSync(absolutePath).isDirectory()) {
      dataForPath[pathInDir] = generateData(absolutePath);
      continue;
    }

    dataForPath[pathInDir] = [];
  }

  return dataForPath;
}

const imagePath = path.join('public', 'images');
const data = generateData(imagePath);

const jsonString = JSON.stringify(data, undefined, 2);
fs.writeFile(
  './images_data_template.json',
  jsonString,
  err => err && console.error(err)
);

// run 'node image_tool.js' from repo root
