const browserify = require('@cypress/browserify-preprocessor')

module.exports = (on) => {
  const options = {
    browserifyOptions: {
      extensions: ['.js'],
      // plugin: [
      //   []
      // ]
    }
  }

  on('file:preprocessor', browserify(options))
}
