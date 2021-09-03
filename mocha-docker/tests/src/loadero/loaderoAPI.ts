import * as LoaderoController from './lib/loadero_controller';
import {BASE_URL, getConfig, PROJECT_ID, TOKEN, wait} from "~/loadero/global";
import {RunBody} from "~/loadero/lib/loadero_controller/models";
import axios from "axios";
export const projectApi = new LoaderoController.ProjectApi(getConfig());
export const testApi = new LoaderoController.TestApi(getConfig());
export const projectrunApi = new LoaderoController.ProjectrunApi(getConfig());
export const projectresultApi = new LoaderoController.ProjectresultApi(getConfig());
export const possibleNetworkValue = ["default","4g","3g","5packet","10packet","20packet","50packet","100packet","asymmetric","jitter","latency","gprs","edge","hsdpa"]
export const possibleHardwareValue = ["g0.5","g1","g2","g4","g6"];
export const possibleLocationValue = ["eu-central-1","us-west-2"];
export const possibleMediaTypeValue = ["720pAV"];
export const possibleBrowserValue = ["chromeLatest","firefoxLatest"];
export const possibleVideoFeedValue = ["720p"];
export const possibleAudioFeedValue = ["128kbps"];

const DEFAULT_RUN_ID = 51382;

export class LoaderoAPI{
    prodRun = (!!process.env.PROD_RUN) || false;
    testData=null;

    async loadTestsData(){
        if(!this.testData) {
            const result = await testApi.readAllTests(PROJECT_ID);
            this.testData = {};
            for (const test of result.data.results) {
                this.testData[test.name]=test;
            }
        }
    }

    async getTestIdFromName(name:string):Promise<number>{
        await this.loadTestsData();
        const test =this.testData[name];
        if(test){
            return this.testData[name].id;
        }else{
            throw new Error("Test does not exist");
        }
    }

    async execTestAndWaitResult(testID):Promise<RunBody>{
        if(this.prodRun) {
            const res = await this.execPost("/tests/" + testID + "/runs/", {testID, projectID: PROJECT_ID})
            return await this.waitTestResult(res.data.id);
        }else{
            return await this.waitTestResult(DEFAULT_RUN_ID);
        }
    }

    async execPost(path,data){
        return axios.post(BASE_URL+"/projects/"+PROJECT_ID+path,data,{headers:{Authorization:"LoaderoAuth "+TOKEN}})
    }

    async execPut(path,data){
        return axios.put(BASE_URL+"/projects/"+PROJECT_ID+path,data,{headers:{Authorization:"LoaderoAuth "+TOKEN}})
    }

    async execGet(path){
        return axios.get(BASE_URL+"/projects/"+PROJECT_ID+path,{headers:{Authorization:"LoaderoAuth "+TOKEN}})
    }


    async updateParticipantCount(
        testid:number,
        count:number,
        network:string,
        location:string,
        media_type:string,
        compute_unit:string,
        browser:string){
        if(!possibleNetworkValue.includes(network)){
            throw new Error();
        }
        const resultG = await loaderoAPI.execGet("/tests/" + testid+"/groups/");
        const groupID = resultG.data.results[0].id;
        const resultP = await loaderoAPI.execGet("/tests/" + testid+"/groups/"+groupID+"/participants/");
        const participantId = resultP.data.results[0].id;
        const resultPG = await this.execGet("/tests/" + testid+"/groups/"+groupID+"/participants/"+participantId);
        let part = resultPG.data;
        part={
            "count": count || part.count,
            "network":network || part.network,
            "location":location || part.location,
            "media_type":media_type || part.media_type,
            "compute_unit":compute_unit || part.compute_unit,
            "browser": browser || part.browser,
            "name": part.name,
        }
        return await this.execPut("/tests/" + testid+"/groups/"+groupID+"/participants/"+participantId,part);
    }

    async waitTestResult(run_id):Promise<RunBody>{
        let axiosResp = null;
        await wait(async () =>{
            axiosResp = await projectrunApi.readProjectRun(PROJECT_ID, run_id);
            return !!(axiosResp && axiosResp.data && axiosResp.data.id);
        });
        return axiosResp.data
    }

    getRunBodyResult(result:RunBody){
        return result.status === "done" && result.success_rate === 1;
    }

    async getDetailTestResult(runBody:RunBody):Promise<any>{
        const data = await projectresultApi.readAllProjectResults(runBody.id,PROJECT_ID);
        return data.data; // RunResultResponse
    }

    getResultLink(result:RunBody){
        return "https://loadero.com/projects/"+PROJECT_ID+"/tests/"+result.test_id+"/results/"+result.id+"/#summary"
    }
}

export const loaderoAPI = new LoaderoAPI();

/*const getUrl = async (url:any) => {
    // Request options with authorization header and access token
    const OPTIONS = {
        headers: {
            Authorization:
                "LoaderoAuth "+TOKEN
        },
        method: "POST"
    };

    const response = await fetch(url, OPTIONS);
    if(response.status !== 200 && response.status !== 202){
        console.error(response);
        console.error(await response.json());
        throw new Error("invalid response");
    }
    return response.json();
};

const runTest = async (TEST_ID:any) => {
    // Run test
    return await getUrl(`${BASE_URL}/${PROJECT_ID}/tests/${TEST_ID}/runs/`)
};*/
