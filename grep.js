const selectTests = require('./src')

/**
 * Returns only the names of the tests we want to run using
 * Cypress env variables "fgrep" and "grep".
 */
const pickTests = (filename, foundTests, cypressConfig) => {
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
    console.log("\tJust tests with a name that contains: %s", fgrep)
    if (!filename.includes(fgrep)) {
      console.warn('\tTest filename %s did not match fgrep "%s"', filename, fgrep)
      return
    }
  }
  if (grep) {
    console.log("\tJust tests tagged with: %s", grep)
    return foundTests.filter(testName =>
      testName.some(part => part.includes(grep))
    )
  }

  return foundTests
}

/**
 * Selects spec files to run using partial string match (fgrep).
 * Selects tests to run using partial string match in the suite or test name (grep).
 *
 * @example
 ```shell
 ## run tests with "works" in their full titles
 $ npx cypress open --env grep=works
 ## runs only specs with "foo" in their filename
 $ npx cypress run --env fgrep=foo
 ## runs only tests with "works" from specs with "foo"
 $ npx cypress run --env fgrep=foo,grep=works
 ## runs tests with "feature A" in the title
 $ npx cypress run --env grep='feature A'
 ```
 */
const selectTestsWithGrep = config => selectTests(config, pickTests)

module.exports = selectTestsWithGrep
