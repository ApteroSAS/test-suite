import {
    loaderoAPI,
    possibleBrowserValue,
    possibleHardwareValue, possibleLocationValue,
    possibleMediaTypeValue,
    possibleNetworkValue
} from "~/loadero/loaderoAPI";
var expect = require('chai').expect;
import {addContext} from "~/loadero/global";


export function createSingleTest(testName:string,network:string,hardware:string,participantNumber:number,webcam:string,browser:string,location:string,enduranceNumber:number){
        const testNameStr = "loadero-multi-"+testName+"-" + network + "-" + hardware +"-"+participantNumber+"-"+webcam+"-"+browser+"-"+location+"-x"+enduranceNumber;
        it(testNameStr, async function () {
            this.timeout(0);
            const testid = await loaderoAPI.getTestIdFromName(testName);
            addContext(this, testNameStr);
            //setup test parameters
            await loaderoAPI.updateParticipantCount(testid, participantNumber,network,location,webcam,hardware,browser);
            //execute test
            for(let i=0;i<enduranceNumber;i++){
                const result = await loaderoAPI.execTestAndWaitResult(testid);
                expect(!!result).to.be.equal(true);
                addContext(this,{"title":"result","value":result});
                addContext(this,loaderoAPI.getResultLink(result));
                expect(loaderoAPI.getRunBodyResult(result)).to.be.equal(true);
            }
        });
}

export function combination(data:{
    testNameList:string[],
    networkList:string[],
    hardwareList:string[],
    participantNumberList:number[],
    webcamList:string[],
    browserList:string[],
    locationList:string[],
    enduranceNumberList:number[]
},callback:(testName:string,network:string,hardware:string,participantNumber:number,webcam:string,browser:string,location:string,enduranceNumber:number)=>void){
    for (const testName of data.testNameList) {
        for (const network of data.networkList) {
            for (const hardware of data.hardwareList) {
                for (const participantNumber of data.participantNumberList) {
                    for (const webcam of data.webcamList) {
                        for (const browser of data.browserList) {
                            for (const location of data.locationList) {
                                for (const enduranceNumber of data.enduranceNumberList) {
                                    callback(testName,network,hardware,participantNumber,webcam,browser,location,enduranceNumber);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

/*
{
  "id": 101905,
  "created": "2021-08-03T15:16:15Z",
  "updated": "2021-09-03T14:22:38Z",
  "group_id": 52586,
  "test_id": 9348,
  "name": "Main",
  "count": 2,
  "profile_id": 40341,
  "record_audio": false,
  "compute_unit": "g2",
  "browser": "chromeLatest",
  "network": "default",
  "location": "us-west-2",
  "media_type": "720pAV",
  "video_feed": "720p",
  "audio_feed": "128kbps"
}
 */
export function getDefaultCombination(){
    let testlist = ["CI_test_dialog"]
    if(process.env.LOADERO_TEST){
        testlist = ["CI_test_"+process.env.LOADERO_TEST]
    }
    return {
        testNameList:testlist,
        networkList:["default"],
        hardwareList:["g2"],
        participantNumberList:[20],
        webcamList:["720pAV"],
        browserList:["chromeLatest"],
        locationList:["eu-central-1"],
        enduranceNumberList:[1]
    }
}

let globalNumberOfParticipant = 0;
let globalNumberOfCU = 0;

export function createTestCombination(data:{
    testNameList:string[],
    networkList:string[],
    hardwareList:string[],
    participantNumberList:number[],
    webcamList:string[],
    browserList:string[],
    locationList:string[],
    enduranceNumberList:number[]
}){
    //integrity check
    for (const network of data.networkList) {
        if (possibleNetworkValue.indexOf(network) < 0) {
            throw new Error("invalid combination");
        }
    }
    for (const hardware of data.hardwareList) {
        if (possibleHardwareValue.indexOf(hardware) < 0) {
            throw new Error("invalid combination");
        }
    }
    for (const webcam of data.webcamList) {
        if (possibleMediaTypeValue.indexOf(webcam) < 0) {
            throw new Error("invalid combination");
        }
    }
    for (const browser of data.browserList) {
        if (possibleBrowserValue.indexOf(browser) < 0) {
            throw new Error("invalid combination");
        }
    }
    for (const location of data.locationList) {
        if (possibleLocationValue.indexOf(location) < 0) {
            throw new Error("invalid combination");
        }
    }
    let totalNumberOfParticipant = 0;
    let totalNumberOfCU = 0;
    combination(data,(testName:string,network:string,hardware:string,participantNumber:number,webcam:string,browser:string,location:string,enduranceNumber:number)=>{
        totalNumberOfParticipant+=participantNumber;
        totalNumberOfCU+=participantNumber * parseFloat(hardware.replace("g",""))
    });
    globalNumberOfParticipant +=totalNumberOfParticipant;
    globalNumberOfCU += totalNumberOfCU;
    console.log("totalNumberOfParticipant :"+totalNumberOfParticipant);
    console.log("totalNumberOfCU :"+totalNumberOfCU);
    console.log("globalNumberOfParticipant :"+globalNumberOfParticipant);
    console.log("globalNumberOfCU :"+globalNumberOfCU);
    if(globalNumberOfCU>10000){
        throw new Error("cost too high");
    }
    //create and launch test
    combination(data,createSingleTest);
}
