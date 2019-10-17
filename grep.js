const selectTests = require('./src')
const { grepPickTests } = require('./src/grep-pick-tests')

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
const selectTestsWithGrep = config => selectTests(config, grepPickTests)

module.exports = selectTestsWithGrep
