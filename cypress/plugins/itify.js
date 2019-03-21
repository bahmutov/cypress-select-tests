'use strict'

var path = require('path')
var through = require('through')

function process (code) {
  return code
}

module.exports = function itify (filepath, options) {
  var data = ''

  var stream = through(write, end)

  function write (buf) {
    data += buf
  }

  function end () {
    stream.queue(process(data))
    stream.queue(null)
  }

  return stream
}
