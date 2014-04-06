var util = require('util');
var s = require('shelljs');
var program = require('commander');
require('colors');

var init = function(shell) {
  if (!shell) {
    shell = s;
  }
  // Find own version.
  var v = require('./package').version;

  program
    .version(v)
    .usage('<URL> [options]')
    .option('-r, --rdboptions <list>', 'Options to pass to rethinkdb importer')
    .parse(process.argv);

  var err = [];
  // URL should be first argument.
  if (!program.args || !program.args[0]) {
    err.push('No URL specified');
  }
  var url = program.args[0];

  // See if we have wget.
  if (!shell.which('wget')) {
    err.push('No installation of wget found');
  }

  // See if we have rethinkdb
  if (!shell.which('rethinkdb')) {
    err.push('No installation of rethinkdb found');
  }

  if (err && err.length > 0) {
    console.error('This script will not be able to run for the following %s:'.yellow, err.length === 1 ? 'reason' : 'reasons');
    for (var i = 0, len = err.length; i < len; i++) {
      console.error(('- ' + err[i]).red);
    }
    return false;
  }

  // Download and be awesome.
  var filename = util.format('%s/rethinkdb%s.tar.gz', shell.tempdir(), Date.now());
  var wg = shell.exec('wget "' + url + '" -O ' + filename, {silent: true});
  if (wg.code !== 0) {
    console.error('The download was not successful. Command output:'.red);
    console.error(wg.output.yellow);
    return false;
  }
  var rdboptions = program.rdboptions ? program.rdboptions : '';
  shell.exec('rethinkdb restore ' + filename + ' ' + rdboptions);
  return true;
};

module.exports = init;
