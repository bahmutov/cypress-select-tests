# cypress-select-tests

## DEPRECATED

You probably want to use [cypress-grep](https://github.com/bahmutov/cypress-grep) instead: no TypeScript or JavaScript parsing problems.

## OLD README

> User space solution for picking Cypress tests to run

[![NPM][npm-icon]][npm-url]

[![Build status][ci-image]][ci-url]
[![semantic-release][semantic-image]][semantic-url]
[![standard][standard-image]][standard-url]
[![renovate-app badge][renovate-badge]][renovate-app]

## Install

Assuming [Cypress](https://www.cypress.io) has been installed:

```shell
npm install --save-dev cypress-select-tests
```

### Warning ⚠️

- this package assumes JavaScript specs
- this package might conflict and/or overwrite other Cypress Browserify preprocessor settings

## Mocha-like selection

[Mocha](https://mochajs.org/) has `--fgrep`, `--grep` and `--invert` CLI arguments to select spec files and tests to run. This package provides imitation using strings. In your `cypress/plugins/index.js` use:

```js
const selectTestsWithGrep = require('cypress-select-tests/grep')
module.exports = (on, config) => {
  on('file:preprocessor', selectTestsWithGrep(config))
}
```

Then open or run Cypress and use environment variables to pass strings to find. There are various ways to [pass environment variables](https://on.cypress.io/environment-variables), here is via CLI arguments:

```shell
 ## run tests with "works" in their full titles
 $ npx cypress open --env grep=works
 ## runs only specs with "foo" in their filename
 $ npx cypress run --env fgrep=foo
 ## runs only tests with "works" from specs with "foo"
 $ npx cypress run --env fgrep=foo,grep=works
 ## runs tests with "feature A" in the title
 $ npx cypress run --env grep='feature A'
 ## runs only specs NOT with "foo" in their filename
 $ npx cypress run --env fgrep=foo,invert=true
 ## runs tests NOT with "feature A" in the title
 $ npx cypress run --env grep='feature A',invert=true
 ```

The test picking function is available by itself in [src/grep-pick-tests.js](src/grep-pick-tests.js) file.

## Write your own selection logic

In your `cypress/plugins/index.js` use this module as a file preprocessor and write your own `pickTests` function.

```js
const selectTests = require('cypress-select-tests')

// return test names you want to run
const pickTests = (filename, foundTests, cypressConfig) => {
  // found tests will be names of the tests found in "filename" spec
  // it is a list of names, each name an Array of strings
  // ['suite 1', 'suite 2', ..., 'test name']

  // return [] to skip ALL tests
  // OR
  // let's only run tests with "does" in the title
  return foundTests.filter(fullTestName => fullTestName.join(' ').includes('does'))
}

module.exports = (on, config) => {
  on('file:preprocessor', selectTests(config, pickTests))
}
```

Using `pickTests` allows you to implement your own test selection logic. All tests filtered out will be shown / counted as pending.

## Combine custom browserify with grep picker

If you are adjusting Browserify options, and would like to use the above Mocha-like grep test picker, see [test/plugin-browserify-with-grep.js](test/plugin-browserify-with-grep.js) file. In essence, you want add the grep transform to the list of Browserify plugins. Something like

```js
const browserify = require('@cypress/browserify-preprocessor')
// utility function to process source in browserify
const itify = require('cypress-select-tests/src/itify')
// actual picking tests based on environment variables in the config file
const { grepPickTests } = require('cypress-select-tests/src/grep-pick-tests')

module.exports = (on, config) => {
  let customBrowserify

  // get the browserify options, then push another transform
  options.browserifyOptions.transform.push(itify(config, grepPickTests))
  customBrowserify = browserify(options)

  on('file:preprocessor', file => customBrowserify(file))
}
```

## Examples

- [cypress-select-tests-example](https://github.com/bahmutov/cypress-select-tests-example)
- [cypress-example-recipes grep](https://github.com/cypress-io/cypress-example-recipes/tree/master/examples/preprocessors__grep)

## Debugging

To see additional debugging output run

```
DEBUG=cypress-select-tests npx cypress open
```

### Small print

Author: Gleb Bahmutov &lt;gleb.bahmutov@gmail.com&gt; &copy; 2019

- [@bahmutov](https://twitter.com/bahmutov)
- [glebbahmutov.com](https://glebbahmutov.com)
- [blog](https://glebbahmutov.com/blog)

License: MIT - do anything with the code, but don't blame me if it does not work.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/bahmutov/cypress-select-tests/issues) on Github

## MIT License

Copyright (c) 2019 Gleb Bahmutov &lt;gleb.bahmutov@gmail.com&gt;

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

[npm-icon]: https://nodei.co/npm/cypress-select-tests.svg?downloads=true
[npm-url]: https://npmjs.org/package/cypress-select-tests
[ci-image]: https://circleci.com/gh/bahmutov/cypress-select-tests.svg?style=svg
[ci-url]: https://circleci.com/gh/bahmutov/cypress-select-tests
[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[standard-url]: http://standardjs.com/
[renovate-badge]: https://img.shields.io/badge/renovate-app-blue.svg
[renovate-app]: https://renovateapp.com/
