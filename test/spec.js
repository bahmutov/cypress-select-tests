// @ts-check
require('mocha-banner').register()
const R = require('ramda')
const la = require('lazy-ass')
const snapshot = require('snap-shot-it')
const path = require('path')
// @ts-ignore
const cypress = require('cypress')

const pickMainStatsFromRun = R.compose(
  R.pick(['suites', 'tests', 'passes', 'pending', 'skipped', 'failures']),
  R.prop('stats')
)

const pickTestInfo = R.compose(
  R.project(['title', 'state']),
  R.prop('tests')
)

const pickRunInfo = run => ({
  stats: pickMainStatsFromRun(run),
  spec: R.pick(['name', 'relative'], run.spec),
  tests: pickTestInfo(run)
})

it('runs only tests with "does" in their name from spec.js', () => {
  return cypress
    .run({
      env: {
        grep: 'does'
      },
      config: {
        video: false,
        videoUploadOnPasses: false,
        pluginsFile: path.join(__dirname, 'plugin-selects-does.js')
      },
      spec: 'cypress/integration/spec.js'
    })
    .then(R.prop('runs'))
    .then(runs => {
      la(runs.length === 1, 'expected single run', runs)
      return runs[0]
    })
    .then(run => {
      snapshot({
        'main stats': pickMainStatsFromRun(run)
      })

      snapshot({
        'test state': pickTestInfo(run)
      })
    })
})

it('runs tests without "does" in their name from spec.js with grep invert', () => {
  return cypress
    .run({
      env: {
        grep: 'does',
        invert: 'true'
      },
      config: {
        video: false,
        videoUploadOnPasses: false,
        pluginsFile: path.join(__dirname, 'plugin-does-grep.js')
      },
      spec: 'cypress/integration/spec.js'
    })
    .then(R.prop('runs'))
    .then(runs => {
      la(runs.length === 1, 'expected single run', runs)
      return runs[0]
    })
    .then(run => {
      // 1 pass without "does", 3 pending with "does"
      snapshot({
        'main stats': pickMainStatsFromRun(run)
      })

      snapshot({
        'test state': pickTestInfo(run)
      })
    })
})

it('runs no tests', () => {
  return cypress
    .run({
      config: {
        video: false,
        videoUploadOnPasses: false,
        pluginsFile: path.join(__dirname, 'plugin-selects-no-tests.js')
      },
      spec: 'cypress/integration/spec.js'
    })
    .then(R.prop('runs'))
    .then(runs => {
      la(runs.length === 1, 'expected single run', runs)
      return runs[0]
    })
    .then(run => {
      snapshot({
        'main stats': pickMainStatsFromRun(run)
      })

      snapshot({
        'test state': pickTestInfo(run)
      })
    })
})

it('only runs tests in spec-2', () => {
  return cypress
    .run({
      env: {
        fgrep: 'spec-2'
      },
      config: {
        video: false,
        videoUploadOnPasses: false,
        pluginsFile: path.join(__dirname, 'plugin-does-grep.js')
      },
      spec: 'cypress/integration/*'
    })
    .then(R.prop('runs'))
    .then(runs => {
      la(runs.length === 2, 'expected two specs', runs)

      const info = R.map(pickRunInfo, runs)
      snapshot(info)
    })
})

it('runs tests except selected files with fgrep invert', () => {
  return cypress
    .run({
      env: {
        fgrep: '-2',
        invert: 'true'
      },
      config: {
        video: false,
        videoUploadOnPasses: false,
        pluginsFile: path.join(__dirname, 'plugin-does-grep.js')
      },
      spec: 'cypress/integration/*'
    })
    .then(R.prop('runs'))
    .then(runs => {
      la(runs.length === 2, 'expected two specs', runs)

      const info = R.map(pickRunInfo, runs)
      // only tests from cypress/integration/spec.js should run
      snapshot(info)
    })
})

it('combines custom browserify with grep picker', () => {
  return cypress
    .run({
      env: {
        // should run only tests that have "does B" in their title
        grep: 'does B'
      },
      config: {
        video: false,
        videoUploadOnPasses: false,
        pluginsFile: path.join(__dirname, 'plugin-browserify-with-grep.js')
      },
      spec: 'cypress/integration/spec.js'
    })
    .then(R.prop('runs'))
    .then(runs => {
      la(runs.length === 1, 'expected single run', runs)
      return runs[0]
    })
    .then(run => {
      const mainStats = pickMainStatsFromRun(run)
      const testState = pickTestInfo(run)

      // should be 1 test passing, the rest pending
      snapshot({
        'main stats': mainStats
      })

      // only the test "does B" should pass
      snapshot({
        'test state': testState
      })
    })
})
