var nightwatchConfig = require('../nightwatch.conf.js');




//loadero code start
function test(client) {
    //nightwatch loadero compatibility lib ////////////
    function screenshoot(client){
        const file = "result-"+Math.random()+".png";
        console.log(file);
        if(client.takeScreenshot){
            client.takeScreenshot(file);
        }else{
            client.saveScreenshot("./tests_output/screenshots/"+file);
        }
    }
    ///////////////////////////////////////////////////
    const url = 'https://meet.aptero.co/dcU3wXc/ci-test-twilio?vr_entry_type=2d_now&test=true';
    //const test_duration = 3*60*1000;//wait 3 min
    const test_duration = 15*1000;
    //const expectedClients = 2;
    client
        // Open page
        .url(url)            
        // Waits for 'body' element to be visible
        .openNewWindow(function(result) {
            console.log(result);
        })
        .waitForElementVisible('body', 10*60*1000)//10 min max
        .pause(test_duration/2)//wait
        .assert.visible(".rs-fps-counter");
    client.getAttribute('#test-throw-error-state', 'innerHTML', function(result) { 
         client.assert.equal(result.value, 'false');
    });
    client.getAttribute('#test-console-error-state', 'innerHTML', function(result) { 
         client.assert.equal(result.value, 'false');
    });
    client.getAttribute('#test-mic-error-state', 'innerHTML', function(result) { 
         client.assert.equal(result.value, 'false');
    });
    client.getAttribute('#test-all-data', 'innerHTML', function(result) {
        const clientData = JSON.parse(result.value).clients;
        let allConnected = true;
        Object.keys(clientData).forEach((key)=>{
            if(!clientData[key].displayName.startsWith("TEST_BOT")){
                return;
            }
            if(!clientData[key].connected){
                console.log("client disconnected :"+clientData[key]);
                allConnected=false;
            }
        });
        client.assert.equal(allConnected, true);
        //client.assert.equal(Object.keys(clientData).length, expectedClients);
    });
    client.pause(test_duration/2);//wait
    screenshoot(client);
    client.end();
}
//note no ";" at the end for loadero
//loadero code end

module.exports = {
  'Loadero Test': test,
};