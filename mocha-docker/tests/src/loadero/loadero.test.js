var expect = require('chai').expect;
const fetch = require("node-fetch");

// Loadero API base URL
const BASE_URL = "https://api.loadero.com/v2/projects";
// The ID of the project we are working with
const PROJECT_ID = 6735;
// The ID of the test we want to run
const TEST_ID = 9348;
// The ID of the test we want to run
const TOKEN = process.env.LOADERO_TOKEN;
console.log(TOKEN)

//https://editor.swagger.io/ + https://api.loadero.com/v2/docs/

const getUrl = async url => {
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

const runTest = async (TEST_ID) => {
    // Run test
    return await getUrl(`${BASE_URL}/${PROJECT_ID}/tests/${TEST_ID}/runs/`)
};


describe('loadero', () => {
    it('load test', async function() {
        this.timeout(0);//diable timeout for this test
        // Run test
        //const res = await runTest(TEST_ID);
        /* response example {
          id: 51382,
          created: '2021-08-31T09:21:13Z',
          updated: '2021-08-31T09:21:13Z',
          test_id: 9348,
          status: 'pending',
          test_mode: 'performance',
          increment_strategy: 'random',
          processing_started: '0001-01-01T00:00:00Z',
          processing_finished: '0001-01-01T00:00:00Z',
          execution_started: '0001-01-01T00:00:00Z',
          execution_finished: '0001-01-01T00:00:00Z',
          script_file_id: 80250,
          test_name: 'CI_test-01',
          start_interval: 10,
          participant_timeout: 1200,
          launching_account_id: 5166
        }
        */
        console.log(res)
        const runId = res.id;
    });
});
