var util = require('util');
var shell = require('shelljs');
var program = require('commander');

// Find own version.
var v = require('./package').version;

program
  .version(v)
  .usage('<URL> [options]')
  .option('-o --options [options]', 'Options to pass along to importer')
  .parse(process.argv);

// URL should be first argument.
if (!program.args || !program.args[0]) {
  console.error('Problemos');
  process.exit(1, 'No URL specified');
}
var url = program.args[0];

// See if we have wget.
if (!shell.which('wget')) {
  console.log('no wget');
}

// See if we have rethinkdb
if (!shell.which('rethinkdb')) {
  console.log('no rethink');
}

// Download and be awesome.
var filename = util.format('%s/rethinkdb%s.tar.gz', shell.tempdir(), Date.now());
var wg = shell.exec('wget "' + url + '" -O ' + filename, {silent: true});
console.log(wg);
if (wg.code !== 0) {
  console.log('arg');
}
var rdb = shell.exec('rethinkdb restore ' + filename + ' ' + program.options);

