import {urlFromStub} from "./url.module";

export async function waitSceneReady(browser,stub){
    await browser.url(urlFromStub(stub));
    await browser.waitForElementVisible('body', 10*60*1000);//10 min max
    await browser.pause(10000)//wait loaded TODO find a beter way to wait for scene ready
}