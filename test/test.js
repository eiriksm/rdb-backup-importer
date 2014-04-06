var should = require('should');
var rdbi = require('..');

describe('Export and error handling', function() {
  it('Should export a init function', function() {
    rdbi.should.be.an.instanceOf(Function);
  });

  it('Should return an error if we just run it', function() {
    var r = rdbi();
    should(r).equal(false);
  });

  it('Should bail for many reasons if it can not find programs', function() {
    var s = {
      which: function() {
        return false;
      }
    };
    var r = rdbi(s);
    should(r).equal(false);
  });

  it('Should return an error if we just give it stupid stuff', function() {
    process.argv[2] = 'bogus.domain';
    var r = rdbi();
    should(r).equal(false);
  });

  it('Should return an error if we give it erroring URLs', function() {
    process.argv[2] = 'http://httpstat.us/403';
    var r = rdbi();
    should(r).equal(false);
  });

  it('Should be good if we give it good URL', function() {
    process.argv[2] = 'http://httpstat.us/200';
    var r = rdbi();
    should(r).equal(true);
  });

  it('Should pass along options to rethinkdb if we specify them', function(done) {
    // Monkey patch all the things.
    process.argv.push('-r');
    process.argv.push('testoption');
    var s = require('shelljs');
    s.exec = function(string) {
      if (string.match(/^rethinkdb restore .*tar.gz testoption/)) {
        done();
      }
      return {code: 0};
    };
    rdbi(s);
  });

});
