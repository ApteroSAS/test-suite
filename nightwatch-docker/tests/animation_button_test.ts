import { NightwatchBrowser } from 'nightwatch';
import { avatarLookAtObject} from "./module/avatar.module";
import {waitSceneReady} from "./module/scene.module";
import {execOnElement} from "./module/elements.module";

// Load a room
// look at using execute
// click
// check if mixin in right position https://stackoverflow.com/questions/37650415/how-to-run-window-js-command-in-nightwatch-js/37650595
// check if error in console
// Check repetitions in actionAnimation start at infinity
// AFRAME.scene[0].children => #environment-root > gltf-model-plus > CI-animation-test >
// AFRAME.scenes[0].children[12].children[0].children[0].components["animation-mixer"]
module.exports = {
    'animation': (browser: NightwatchBrowser) => {
        waitSceneReady(browser,'/oWbXSM2?vr_entry_type=2d_now');
        avatarLookAtObject(browser,"Model");
        browser.pause(500)//wait
        browser.mouseButtonClick(0);
        browser.pause(5000)//wait
        execOnElement(browser,"environment-scene",function processEl(el){
            return el.children[0].components["animation-mixer"].mixer._actions[0].repetitions;
        }).then(value => {
            browser.assert.equal(value, 1);
            console.log(value);
            browser.pause(5000)//wait
            browser.end();
        });
    }
}