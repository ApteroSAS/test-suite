var expect = require('chai').expect;

// The ID of the project we are working with
const PROJECT_ID = 6735;
// The ID of the test we want to run
const TEST_ID = 9348;
// The ID of the test we want to run
const RUN_ID = 51382;

const TOKEN = process.env.LOADERO_TOKEN;
//https://editor.swagger.io/ + https://api.loadero.com/v2/docs/
var LoaderoController = require('loadero_controller');
var defaultClient = LoaderoController.ApiClient.instance;

var ApiKeyAuth = defaultClient.authentications['ApiKeyAuth'];
console.log(defaultClient.authentications)
ApiKeyAuth.apiKey = TOKEN;

describe('loadero', () => {
    it('load test', async function() {
        this.timeout(0);//diable timeout for this testvar
        const apiInstance = new LoaderoController.ProjectrunApi();
        apiInstance.readProjectRun(PROJECT_ID, RUN_ID, (error, data, response) => {
            if (error) {
                console.error(error);
            } else {
                console.log('API called successfully. Returned data: ' + data);
            }
        });
    });
});
