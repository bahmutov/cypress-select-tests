const onFilePreprocessor = require('./file-preprocessor')
const R = require('ramda')

/**
 * Return only the names of the tests to run.
 *
 * TODO: make this function optionally async
 */
const pickTests = foundTests => {
  // only leave some of the tests, picking by name
  // each test name is a list of strings
  // [suite name, suite name, ..., test name]

  // for example, only leave tests where the test name is "works"
  return foundTests.filter(testName => R.last(testName) === 'works')
}

module.exports = on => {
  on('file:preprocessor', onFilePreprocessor(pickTests))
}
