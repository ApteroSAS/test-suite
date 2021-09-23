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
    'animation': async (browser: NightwatchBrowser) => {
        await waitSceneReady(browser,'/oWbXSM2?vr_entry_type=2d_now');
        await avatarLookAtObject(browser,"Model");
        let value = await execOnElement(browser,"environment-scene",function processEl(el){
            return ""+(el.children[0].components["animation-mixer"].mixer._actions[0].repetitions);
        });
        await browser.assert.equal(value, "Infinity");
        await browser.pause(500)//wait
        await browser.mouseButtonClick(0);
        await browser.pause(5000)//wait
        value = await execOnElement(browser,"environment-scene",function processEl(el){
            return ""+(el.children[0].components["animation-mixer"].mixer._actions[0].repetitions);
        });
        await browser.assert.equal(value, "1");
        await browser.pause(5000)//wait
        await browser.end();

    }
}