import { NightwatchBrowser } from 'nightwatch';
var nightwatchConfig = require('../nightwatch.conf.js')

module.exports = {
  'Nightwatch.js Test': (browser: NightwatchBrowser) => {
    console.log('Nightwatch tests started')

    browser
      .url(nightwatchConfig.test_settings.default.launch_url)
      .waitForElementVisible('#test', 10000)
      .assert.containsText('#test', 'Hello, Docker World!')
      .saveScreenshot('/home/docker/app/tests_output/screenshots/test.png')
      // .assert.containsText('#test', 'this assertion will fail')
      .end()

    console.log('Nightwatch tests finished')
    console.log('¸¸♬·¯·♩¸¸♪·¯·♫¸¸Happy Dance¸¸♬·¯·♩¸¸♪·¯·♫¸¸')
  },
}
