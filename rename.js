#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const minimist = require('minimist');

const argv = minimist(process.argv.slice(2));

const fileExists = file => {
  try {
    fs.accessSync(file, fs.constants.F_OK);

    return true;
  } catch (err) {
    return false;
  }
};

const main = () => {
  const debug = argv.debug === 'true';

  try {
    const dirname = argv.dirname;
    const pattern = argv.pattern;
    const replacement = argv.replacement;

    if (!dirname) {
      throw new Error('Missing --dirname argument');
    }

    if (!pattern) {
      throw new Error('Missing --pattern argument');
    }

    if (!replacement) {
      throw new Error('Missing --replacement argument');
    }

    const reverse = argv.reverse;
    const counter = argv.counter;
    const counterBase = argv['counter-base'] !== undefined
      ? parseInt(argv['counter-base'])
      : 1;
    const counterStep = argv['counter-step'] !== undefined
      ? parseInt(argv['counter-step'])
      : 1;
    const regex = new RegExp(pattern);

    fs.readdirSync(dirname)
      .filter(file =>
        !file.startsWith('.') &&
        regex.test(file)
      )
      .sort((fileA, fileB) => {
        if (fileA < fileB) {
          return reverse ? 1 : -1;
        }
        if (fileA > fileB) {
          return reverse ? -1 : 1;
        }
        return 0;
      })
      .forEach((file, index) => {
        let finalReplacement = replacement;

        console.log(`renaming ${file}...`);

        if (counter) {
          const count = counterBase + (index * counterStep);

          finalReplacement = finalReplacement.replace(/\$\{counter\}/g, count);
        }

        const newfile = file.replace(regex, finalReplacement);
        const oldPath = path.join(dirname, file);
        const newPath = path.join(dirname, newfile);

        if (fileExists(newPath)) {
          throw new Error(`Can't rename ${oldPath} in ${newPath}, it already exists`);
        }

        fs.renameSync(oldPath, newPath);
      });

    console.log('rename completed !');
  } catch (err) {
    if (debug) {
      console.error(err);
    } else {
      console.log('Error:', err.message);
    }
  }
};

main();
