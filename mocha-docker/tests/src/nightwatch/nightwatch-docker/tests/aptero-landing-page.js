var nightwatchConfig = require('../nightwatch.conf.js')

// EXAMPLE ONLY:

module.exports = {
  'Aptero Landing Test': function (browser) {
    browser
      .url('https://www.aptero.co/')
      .waitForElementVisible('body')
      .assert.titleContains('Aptero');
    browser.end();
  },
}
