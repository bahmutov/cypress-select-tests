'use strict'

const debug = require('debug')('itify')
const through = require('through')
const pluralize = require('pluralize')
const { findTests } = require('./find-tests')

const formatTestName = parts => ' - ' + parts.join(' / ')

function process (pickTests, source) {
  // console.log('---processing')
  // console.log(source)
  const foundTests = findTests(source)
  if (!foundTests.length) {
    return source
  }

  console.log('Found %s', pluralize('test', foundTests.length, true))
  console.log(foundTests.map(formatTestName).join('\n'))
  console.log()

  const testNamesToRun = pickTests(foundTests)
  console.log(
    'Will only run %s',
    pluralize('test', testNamesToRun.length, true)
  )
  console.log(foundTests.map(formatTestName).join('\n'))
  console.log()

  return source
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
