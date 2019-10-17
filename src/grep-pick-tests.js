/**
 * Returns only the names of the tests we want to run using
 * Cypress env variables "fgrep" and "grep".
 */
const grepPickTests = (filename, foundTests, cypressConfig) => {
  // only leave some of the tests, picking by name
  // each test name is a list of strings
  // [suite name, suite name, ..., test name]

  // we could use Cypress env variables to use same options as Mocha
  // see https://mochajs.org/
  //   --fgrep, -f Only run tests containing this string
  //   --grep, -g Only run tests matching this string or regexp

  // for example, only leave tests where the test name is "works"
  // return foundTests.filter(testName => R.last(testName) === 'works')

  const fgrep = cypressConfig.env.fgrep
  const grep = cypressConfig.env.grep // assume string for now, not regexp

  if (fgrep) {
    console.log('\tJust tests with a name that contains: %s', fgrep)
    if (!filename.includes(fgrep)) {
      console.warn(
        '\tTest filename %s did not match fgrep "%s"',
        filename,
        fgrep
      )
      return
    }
  }
  if (grep) {
    console.log('\tJust tests tagged with: %s', grep)
    return foundTests.filter(testName =>
      testName.some(part => part.includes(grep))
    )
  }

  return foundTests
}

module.exports = { grepPickTests }
