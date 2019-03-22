const selectTestsWithGrep = require('../../grep')
module.exports = (on, config) => {
  on('file:preprocessor', selectTestsWithGrep(config))
}
