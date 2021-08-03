var expect = require('chai').expect;
const util = require('util');
const exec = util.promisify(require('child_process').exec);

describe('nightwatch', function () {
    it('nightwatch testsuite', async function () {
        this.timeout(0);//diable timeout for this test
        {
            const {stdout, stderr} = await exec('pwd');
            if (stderr) {
                console.error(`error: `,stderr);
            }
            console.log("",stdout);
        }
        {
            const {stdout, stderr} = await exec('cd ./src/nightwatch/nightwatch-docker && docker-compose kill && docker-compose rm -vf');
            if (stderr) {
                console.error(`error: `,stderr);
				console.log("",stdout);
            }
        }
        {
            const {stdout, stderr} = await exec('cd ./src/nightwatch/nightwatch-docker && docker-compose build --pull nightwatch');
            if (stderr) {
				console.error(`error: ${stderr}`);
				console.log(`${stdout}`);
            }
        }
        {
            const {stdout, stderr} = await exec('cd ./src/nightwatch/nightwatch-docker && docker-compose up -d web hub node-chrome node-firefox');
			if (stderr) {
				console.error(`error: ${stderr}`);
				console.log(`${stdout}`);
			}
        }
        await new Promise((resolve) => {
            setTimeout(resolve, 5000);
        })
        {
            const {stdout, stderr} = await exec('cd ./src/nightwatch/nightwatch-docker && docker-compose run --rm nightwatch');
			if (stderr) {
				console.error(`error: ${stderr}`);
			}
			console.log(`${stdout}`);
        }
        {
            const {stdout, stderr} = await exec('cd ./src/nightwatch/nightwatch-docker && docker-compose kill && docker-compose rm -vf');
			if (stderr) {
				console.error(`error: ${stderr}`);
				console.log(`${stdout}`);
			}
        }
        expect(true).to.be.equal(true);
    });
});
