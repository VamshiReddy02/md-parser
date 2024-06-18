#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const yargs = require('yargs');
const matter = require('gray-matter');

// Define the CLI commands and options using yargs
yargs.command({
  command: 'template',
  describe: 'Find markdown files by language',
  builder: {
    lang: {
      describe: 'Language to filter by',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    const language = argv.lang;
    findFilesByLanguage(language);
  }
}).help().argv;

function findFilesByLanguage(language) {
  const dir = path.join(__dirname, 'markdown-files');
  fs.readdir(dir, (err, files) => {
    if (err) {
      return console.error('Could not list the directory.', err);
    }

    files.forEach((file, index) => {
      const filePath = path.join(dir, file);

      fs.readFile(filePath, 'utf8', (err, content) => {
        if (err) {
          return console.error('Error reading file.', err);
        }

        const parsed = matter(content);
        if (parsed.data.language.toLowerCase() === language.toLowerCase()) {
          console.log(file);
        }
      });
    });
  });
}
