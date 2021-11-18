import { NightwatchBrowser } from 'nightwatch';

module.exports = {
  'Aptero Landing Test': function (browser:NightwatchBrowser) {
    browser
      .url('https://www.aptero.co/')
      .waitForElementVisible('body')
      .assert.titleContains('Aptero');
    browser.end();
  },
}