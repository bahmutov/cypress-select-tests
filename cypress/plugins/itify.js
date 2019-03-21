'use strict'

const debug = require('debug')('itify')
const through = require('through')
const pluralize = require('pluralize')
const specParser = require('./spec-parser')

const formatTestName = parts => ' - ' + parts.join(' / ')

const formatTestNames = foundTests =>
  foundTests.map(formatTestName).join('\n') + '\n'

function process (pickTests, source) {
  // console.log('---source')
  // console.log(source)
  const foundTests = specParser.findTests(source)
  if (!foundTests.length) {
    return source
  }

  debug('Found %s', pluralize('test', foundTests.length, true))
  debug(formatTestNames(foundTests))

  const testNamesToRun = pickTests(foundTests)
  debug('Will only run %s', pluralize('test', testNamesToRun.length, true))
  debug(formatTestNames(testNamesToRun))

  const processed = specParser.skipTests(source, testNamesToRun)
  // console.log('---processed')
  // console.log(processed)

  return processed
}

// good example of a simple Browserify transform is
// https://github.com/thlorenz/varify
module.exports = function itify (pickTests) {
  return function itifyTransform (filename) {
    debug('file %s', filename)

    let data = ''

    function ondata (buf) {
      data += buf
    }

    function onend () {
      this.queue(process(pickTests, data))
      this.emit('end')
    }

    return through(ondata, onend)
  }
}
