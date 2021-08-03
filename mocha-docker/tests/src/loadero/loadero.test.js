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
        console.log(await runTest(TEST_ID))
    });
});
