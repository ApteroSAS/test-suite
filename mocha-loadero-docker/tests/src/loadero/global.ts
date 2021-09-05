
import * as mochawesomeAddContext from 'mochawesome/addContext';
import * as LoaderoController from "~/loadero/lib/loadero_controller";

// Loadero API base URL
export const BASE_URL = "https://api.loadero.com/v2";
// The ID of the project we are working with
export const PROJECT_ID = 6735;
// The ID of the test we want to run
// @ts-ignore
export let TOKEN = process.env.LOADERO_TOKEN;
if(!TOKEN){
    console.log(process.cwd());
    require('dotenv').config({ path: './loadero.env' })
    TOKEN = process.env.LOADERO_TOKEN;
    if(!TOKEN) {
        throw new Error("NO loadero token! SET LOADERO_TOKEN in loadero.env");
    }
}
//console.log("loadero token :"+TOKEN)

export function addContext(test,info){
    if(typeof info !== "string") {
        if (!info.value) {
            info.value = info
        }
        if (!info.title) {
            info.title = "default" + Math.random()
        }
    }
    console.log(info);
    mochawesomeAddContext(test,info);
}

export function getConfig(){
    return new LoaderoController.Configuration({apiKey: "LoaderoAuth "+TOKEN})
}

export async function wait(validator, poolingIntervalMs = 60000) {
    return new Promise(async (resolve) => {
        const res = await validator();
        if (res) {
            resolve(res);
        } else {
            setTimeout(async () => {
                const res = await validator();
                if (!res) {
                    resolve(await wait(validator));
                } else {
                    resolve(res);
                }
            }, poolingIntervalMs);
        }
    });
}
