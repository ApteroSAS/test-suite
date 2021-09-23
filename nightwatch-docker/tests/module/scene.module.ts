import {urlFromStub} from "./url.module";

export async function waitSceneReady(browser,stub){
    browser
        .url(urlFromStub(stub))
        .waitForElementVisible('body', 10*60*1000)//10 min max
    browser.pause(10000)//wait loaded TODO find a beter way to wait for scene ready
}