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

      const testInfo = R.project(['title', 'state'], run.tests)
      snapshot({
        'test state': testInfo
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
        'main stats': R.pick(
          ['suites', 'tests', 'passes', 'pending', 'skipped', 'failures'],
          run.stats
        )
      })

      const testInfo = R.project(['title', 'state'], run.tests)
      snapshot({
        'test state': testInfo
      })
    })
})

it.only('only runs tests in spec-2', () => {
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

      const info = R.map(
        run => ({
          stats: pickMainStatsFromRun(run),
          spec: R.pick(['name', 'relative'], run.spec),
          tests: pickTestInfo(run)
        }),
        runs
      )
      snapshot(info)
    })
})
