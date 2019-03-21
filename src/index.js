const browserify = require('@cypress/browserify-preprocessor')
const itify = require('./itify')

const onFilePreprocessor = (config, pickTests) => {
  const options = {
    browserifyOptions: {
      extensions: ['.js'],
      transform: itify(config, pickTests)
    }
  }

  return browserify(options)
}

module.exports = onFilePreprocessor
