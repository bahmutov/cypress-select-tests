// for https://github.com/bahmutov/cypress-select-tests/issues/33
// where we need custom browserify + grep selection
const browserify = require('@cypress/browserify-preprocessor')
// utility function to process source in browserify
const itify = require('../src/itify')
// actual picking tests based on environment variables in the config file
const { grepPickTests } = require('../src/grep-pick-tests')

module.exports = (on, config) => {
  let customBrowserify

  // we need custom browserify transformation
  on('before:browser:launch', (browser = {}) => {
    const options = browserify.defaultOptions
    const envPreset = options.browserifyOptions.transform[1][1].presets[0]
    options.browserifyOptions.transform[1][1].presets[0] = [
      envPreset,
      {
        ignoreBrowserslistConfig: true,
        targets: { [browser.name]: browser.majorVersion }
      }
    ]

    // notice how we add OUR select tests transform to the list of browserify options
    options.browserifyOptions.transform.push(itify(config, grepPickTests))
    customBrowserify = browserify(options)
  })

  on('file:preprocessor', file => customBrowserify(file))
}
