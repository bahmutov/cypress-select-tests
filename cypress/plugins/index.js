const onFilePreprocessor = require('./file-preprocessor')

const pickTests = foundTests => {
  return foundTests
}

module.exports = on => {
  on('file:preprocessor', onFilePreprocessor(pickTests))
}
