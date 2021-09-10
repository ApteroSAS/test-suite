import { NightwatchBrowser } from 'nightwatch';
import {urlFromStub} from "./module/url.module";

// Load a room
// look at using execute
// click
// check if mixin in right position https://stackoverflow.com/questions/37650415/how-to-run-window-js-command-in-nightwatch-js/37650595
// check if error in console
module.exports = {
    'animation': (browser: NightwatchBrowser) => {
        browser
            .url(urlFromStub('/oWbXSM2?vr_entry_type=2d_now&test=true'))
            .waitForElementVisible('body', 10*60*1000)//10 min max
            .pause(20000)//wait
            browser.execute(function(data) {
                //TODO check the state of the mixin annimation
                return window.navigator.userAgent;
            }, [], function(result) {
                console.log(result.value);
            });
        browser.end();
    }
}