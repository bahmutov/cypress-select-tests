const selectTests = require('..')

const pickTests = (filename, foundTests, cypressConfig) => {
  // no tests to run!
}

module.exports = (on, config) => {
  on('file:preprocessor', selectTests(config, pickTests))
}
