'use strict'

const debug = require('debug')('cypress-select-tests')
const through = require('through')
const pluralize = require('pluralize')
const specParser = require('./spec-parser')

const formatTestName = parts => ' - ' + parts.join(' / ')

const formatTestNames = foundTests =>
  foundTests.map(formatTestName).join('\n') + '\n'

function process (config, pickTests, filename, source) {
  // console.log('---source')
  // console.log(source)
  debug('Cypress config %O', config)

  const foundTests = specParser.findTests(source)
  if (!foundTests.length) {
    return source
  }

  debug('Found %s', pluralize('test', foundTests.length, true))
  debug(formatTestNames(foundTests))

  // if pickTests returns undefined,
  // assume the user does not want any tests from this file
  const testNamesToRun = pickTests(filename, foundTests, config) || []
  debug('Will only run %s', pluralize('test', testNamesToRun.length, true))
  debug(formatTestNames(testNamesToRun))

  const processed = specParser.skipTests(source, testNamesToRun)
  // console.log('---processed')
  // console.log(processed)

  return processed
}

// good example of a simple Browserify transform is
// https://github.com/thlorenz/varify
module.exports = function itify (config, pickTests) {
  return function itifyTransform (filename) {
    debug('file %s', filename)

    let data = ''

    function ondata (buf) {
      data += buf
    }

    function onend () {
      this.queue(process(config, pickTests, filename, data))
      this.emit('end')
    }

    return through(ondata, onend)
  }
}
