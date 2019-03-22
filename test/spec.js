// @ts-check
const R = require('ramda')
const la = require('lazy-ass')
const snapshot = require('snap-shot-it')
const path = require('path')
// @ts-ignore
const cypress = require('cypress')

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
      run => console.log('%O', run)

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
      run => console.log('%O', run)

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
