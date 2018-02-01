#!/usr/bin/env node

const main = require('../');

const program = require('commander');

program
  .version('0.0.1')
  .option('-u, --url <url>', 'Start URL')
  .option('-o, --output <path>', 'Output path', './screenshots')
  .option('-w, --width <width>', 'Window width', parseInt, 960)
  .option('-h, --height <height>', 'Window height', parseInt, 1200)
  .option('-s, --device-scale-factor <factor>', 'Like device pixel ratio in CSS', parseFloat, 1.5)
  .option('-u, --user-agent <agent>', 'User Agent string')
  .option('-s, --seperator <sep>', 'Used to replace / in path when save screeshota', '-')
  .option('-b, --black-list <file>', 'Black list file, pathname in lines')
  .option('-v, --verbose', 'Print status')
  .option('-d, --debug', 'Debug mode')
  .parse(process.argv);

if (!program.url) {
  program.help();
}

main(program);
