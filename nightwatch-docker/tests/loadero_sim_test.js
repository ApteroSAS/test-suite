var nightwatchConfig = require('../nightwatch.conf.js')

const loaderoTest = function(client) {
    client
        // Open page
        .url('https://meet.aptero.co/dcU3wXc/ci-test-twilio?vr_entry_type=2d_now&test=true')            
        // Waits for 'body' element to be visible
        .waitForElementVisible('body', 10*60*1000)//10 min max
        .pause(3*60*1000)//wait 3 min
        .assert.visible(".rs-fps-counter")
         
    client
        // Takes screenshot of search results
        .takeScreenshot('result.png');
}

module.exports = {
  'Loadero Test': loaderoTest,
}
