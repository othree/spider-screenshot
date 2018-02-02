#!/usr/bin/env node

const main = require('../');

const program = require('commander');

program
  .version('0.0.1')
  .description('Web spider and take screenshot for input URL. Only spider the same domain, under the same pathname.')
  .usage('[options] <url>')
  .option('-u, --url <url>', 'Start URL')
  .option('-c, --constrain-url <url>', 'Constrain URL, only URL match this URL will be screenshot')
  .option('-o, --output <path>', 'Output path', './screenshots')
  .option('-w, --width <width>', 'Window width', parseInt, 960)
  .option('-h, --height <height>', 'Window height', parseInt, 1200)
  .option('-s, --device-scale-factor <factor>', 'Like device pixel ratio in CSS', parseFloat, 1.5)
  .option('-u, --user-agent <agent>', 'User agent string')
  .option('-s, --seperator <sep>', 'Used to replace / in path when save screeshota', '-')
  .option('-l, --level <level>', 'Web spider level on page depth, -1 is infinity.', parseInt, 10)
  .option('-b, --black-list <file>', 'Black list file, pathname in lines')
  .option('--setup-script <file>', 'Setup script, will executes before start crawler')
  .option('-v, --verbose', 'Print status')
  .option('-d, --debug', 'Debug mode')
  .parse(process.argv);

if (!program.url && !program.args[0]) {
  program.help();
}

main(program);
