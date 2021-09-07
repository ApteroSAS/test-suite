var nightwatchConfig = require('../nightwatch.conf.js')

function screenshoot(client){
    if(client.takeScreenshot){
        client.takeScreenshot("result-"+Math.random()+".png");
    }else{
        client.saveScreenshot("./tests_output/screenshots/result-"+Math.random()+".png");
    }
}

module.exports = {
  'Aptero Landing Test': function (browser) {
    browser
      .url('https://www.aptero.co/')
      .waitForElementVisible('body')
      .assert.titleContains('Aptero');
      
    screenshoot(browser);
    browser.end();
  },
}
