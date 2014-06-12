test:
	PATH=./test:$$PATH ./node_modules/mocha/bin/mocha

test-cov:
		PATH=./test:$$PATH ./node_modules/istanbul/lib/cli.js cover -- ./node_modules/mocha/bin/_mocha

.PHONY: test test-cov
