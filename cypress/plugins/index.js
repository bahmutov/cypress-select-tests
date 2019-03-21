const onFilePreprocessor = require('./file-preprocessor')
const R = require('ramda')

/**
 * Return only the names of the tests we want to run.
 * The logic is up to us: maybe grep based on CLI arguments and use spec filename?
 * Or grep the test names?
 *
 * TODO: make this function optionally async
 */
const pickTests = (filename, foundTests, cypressConfig) => {
  // only leave some of the tests, picking by name
  // each test name is a list of strings
  // [suite name, suite name, ..., test name]

  console.log('picking tests to run in file %s', filename)

  // we could use Cypress env variables to use same options as Mocha
  // see https://mochajs.org/
  //   --fgrep, -f Only run tests containing this string
  //   --grep, -g Only run tests matching this string or regexp

  // for example, only leave tests where the test name is "works"
  // return foundTests.filter(testName => R.last(testName) === 'works')

  const fgrep = cypressConfig.env.fgrep
  const grep = cypressConfig.env.grep // assume string for now, not regexp
  if (!fgrep && !grep) {
    // run all tests
    return foundTests
  }

  if (fgrep) {
    if (!filename.includes(fgrep)) {
      console.log('spec filename %s not matching fgrep "%s"', filename, fgrep)
      return
    }
  }

  return foundTests
}

module.exports = (on, config) => {
  console.log('config', config)
  on('file:preprocessor', onFilePreprocessor(config, pickTests))
}
