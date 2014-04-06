rdb-backup-importer
=====================
[![Code Climate](http://img.shields.io/codeclimate/github/eiriksm/rdb-backup-importer.svg)](https://codeclimate.com/github/eiriksm/rdb-backup-importer)
[![Build Status](https://travis-ci.org/eiriksm/rdb-backup-importer.svg)](https://travis-ci.org/eiriksm/rdb-backup-importer)
[![Dependency Status](https://david-dm.org/eiriksm/rdb-backup-importer.svg?theme=shields.io)](https://david-dm.org/eiriksm/rdb-backup-importer)

## Requirements
- wget
- RethinkDB (duh)

## Installation
`[sudo] npm install -g rdb-backup-importer`

This will allow you to have `rdb-backup-importer` available globally.

## Usage
`$ rdb-backup-importer "https://s3-eu-west-1.amazonaws.com/someurl/long-and-with-a-token-and-possibly-without-a-tar-gz-ending?true=false"`

Or you can pass along `rethinkdb-import` parameters to the tool
`$ rdb-backup-importer "https://example.com" -r --force`

## Contributing
It's a simple tool, but if you want to add something, pull requests are always
welcome.

Remember to run tests with `make test`

## Licence
MIT
