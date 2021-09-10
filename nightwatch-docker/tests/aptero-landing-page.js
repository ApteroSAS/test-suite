module.exports = {
    before: function (browser) {

        //Declaring Global Timeout
        browser.globals.waitForConditionTimeout = 7000
    },

    'Validate URL and Text in New Window': function (browser) {
        browser
            .url('https://meet.aptero.co/dcU3wXc/ci-test-twilio?vr_entry_type=2d_now&test=true')
            .openNewWindow(function(result) {
                console.log(result);
              })
        .waitForElementVisible('body', 10*60*1000)//10 min max
          .pause(15*1000/2)
        .assert.visible(".rs-fps-counter");


    }
    }