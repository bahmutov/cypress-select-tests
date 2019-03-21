const onFilePreprocessor = require('./file-preprocessor')
const R = require('ramda')

/**
 * Return only the names of the tests we want to run.
 * The logic is up to us: maybe grep based on CLI arguments and use spec filename?
 * Or grep the test names?
 *
 * TODO: make this function optionally async
 * TODO: how to get to the original Cypress CLI or env values?
 */
const pickTests = (filename, foundTests) => {
  // only leave some of the tests, picking by name
  // each test name is a list of strings
  // [suite name, suite name, ..., test name]

  console.log('picking tests to run in file %s', filename)
  // for example, only leave tests where the test name is "works"
  return foundTests.filter(testName => R.last(testName) === 'works')
}

module.exports = on => {
  on('file:preprocessor', onFilePreprocessor(pickTests))
}
