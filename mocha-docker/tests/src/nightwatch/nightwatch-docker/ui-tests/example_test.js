var nightwatchConfig = require('../nightwatch.conf.js')

// EXAMPLE ONLY:

module.exports = {
  'Nightwatch.js Test1': function (browser) {
    console.log('Nightwatch ui-tests started')

    browser
      .url(nightwatchConfig.test_settings.default.launch_url)
      .waitForElementVisible('#test', 10000)
      .assert.containsText('#test', 'Hello, Docker World!')
      .saveScreenshot('/home/docker/app/tests_output/screenshots/test.png')
      // .assert.containsText('#test', 'this assertion will fail')
      .end()

    console.log('Nightwatch ui-tests finished')
    console.log('¸¸♬·¯·♩¸¸♪·¯·♫¸¸Happy Dance¸¸♬·¯·♩¸¸♪·¯·♫¸¸')
  },
  'Nightwatch.js Test2': function (browser) {
    console.log('Nightwatch ui-tests started')

    browser
      .url(nightwatchConfig.test_settings.default.launch_url)
      .waitForElementVisible('#test', 10000)
      .assert.containsText('#test', 'Hello, Docker World!')
      .saveScreenshot('/home/docker/app/tests_output/screenshots/test.png')
      // .assert.containsText('#test', 'this assertion will fail')
      .end()

    console.log('Nightwatch ui-tests finished')
    console.log('¸¸♬·¯·♩¸¸♪·¯·♫¸¸Happy Dance¸¸♬·¯·♩¸¸♪·¯·♫¸¸')
  },
}
