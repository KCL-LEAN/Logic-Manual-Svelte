const fs = require('fs');
const path = require('path');
const readline = require('readline');
const filePath = path.join(process.cwd(), 'node_modules', 'monaco-editor', 'esm', 'vs', 'editor', 'editor.api.d.ts');

console.log('filePath', filePath);

// // create a readable stream
const readStream = fs.createReadStream(filePath);

// create a writable stream
const writeStream = fs.createWriteStream(filePath, { flags: 'r+' });

// create an interface for reading the file line by line
const rl = readline.createInterface({
  input: readStream,
  output: writeStream,
  terminal: false
});

// read each line of the file
rl.on('line', (line) => {

  // check if the line contains the code you want to comment out
  if (line.includes('let MonacoEnvironment: Environment | undefined;')) {
    line = `// ${ line }`;
  }
  // write the modified line to the file
  writeStream.write(`${ line }\n`);
});

// close the streams when done
rl.on('close', () => {
  readStream.close();
  writeStream.close();
});
