const browserify = require('@cypress/browserify-preprocessor')
const itify = require('./itify')

const onFilePreprocessor = pickTests => {
  const options = {
    browserifyOptions: {
      extensions: ['.js'],
      transform: itify(pickTests)
    }
  }

  return browserify(options)
}

module.exports = onFilePreprocessor
