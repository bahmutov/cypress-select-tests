# cypress-select-tests

> User space solution for picking Cypress tests to run

[![NPM][npm-icon]][npm-url]

[![Build status][ci-image]][ci-url]
[![semantic-release][semantic-image]][semantic-url]
[![standard][standard-image]][standard-url]
[![renovate-app badge][renovate-badge]][renovate-app]

See [cypress/plugins/index.js](cypress/plugins/index.js)

## Run

```
npm install
npx cypress open
```

## Example

Currently selecting spec files and tests using `fgrep` and `grep` strings similar to Mocha's

For example to run just the tests that have "does" in their name

```
DEBUG=itify npx cypress run --env grep=does
  itify Found 4 tests +1ms
picking tests to run in file cypress/integration/spec.js
  itify  - Example tests / works
  itify  - Example tests / nested / does A
  itify  - Example tests / nested / does B
  itify  - Example tests / nested / does C
  itify  +0ms
  itify Will only run 3 tests +0ms
  itify  - Example tests / nested / does A
  itify  - Example tests / nested / does B
  itify  - Example tests / nested / does C
  itify  +0ms
  itify disabling test [ 'Example tests', 'works' ] +2s
  itify leaving test [ 'Example tests', 'nested', 'does A' ] +0ms
  itify leaving test [ 'Example tests', 'nested', 'does B' ] +0ms
  itify leaving test [ 'Example tests', 'nested', 'does C' ] +1ms
```

And out of 2 specs, only 3 tests in the "spec.js" are executed

```
  Example tests
    - works
    nested
      ✓ does A
      ✓ does B
      ✓ does C


  3 passing (74ms)
  1 pending
```

## Debugging

To see additional debugging output run

```
DEBUG=itify npx cypress open
```

### Small print

Author: Gleb Bahmutov &lt;gleb.bahmutov@gmail.com&gt; &copy; 2018

- [@bahmutov](https://twitter.com/bahmutov)
- [glebbahmutov.com](https://glebbahmutov.com)
- [blog](https://glebbahmutov.com/blog)

"Maniacal Witches Laugh Sound" by [Mike Koenig](http://soundbible.com/1129-Maniacal-Witches-Laugh.html), under license Attribution 3.0

License: MIT - do anything with the code, but don't blame me if it does not work.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/bahmutov/cypress-select-tests/issues) on Github

## MIT License

Copyright (c) 2018 Gleb Bahmutov &lt;gleb.bahmutov@gmail.com&gt;

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
