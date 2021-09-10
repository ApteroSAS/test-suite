if(!process.env.TESTS_DIRECTORY){
    process.env.TESTS_DIRECTORY="tests"
}
const testsDir = process.env.TESTS_DIRECTORY
console.log(testsDir);
// Refer to the online docs for more details: https://nightwatchjs.org/gettingstarted/configuration/
const Services = {}; loadServices();

module.exports = {
  src_folders: [`${testsDir}`],
  test_settings: {
    default: {
      launch_url: 'http://www.google.com',
      desiredCapabilities: {
        browserName: 'chrome',
      },
      screenshots: {
        enabled: true,
        on_failure: true,
        path: 'tests_output/screenshots',
      },
    },
    test_workers: {
        enabled: true,
        workers: 'auto'
    },
    
      
    firefox_local: {
      desiredCapabilities : {
        browserName : 'firefox',
        alwaysMatch: {
          // Enable this if you encounter unexpected SSL certificate errors in Firefox
          // acceptInsecureCerts: true,
          'moz:firefoxOptions': {
            args: [
              // '-headless',
              // '-verbose'
            ],
          }
        }
      },
      webdriver: {
        start_process: true,
        port: 4444,
        server_path: (Services.geckodriver ? Services.geckodriver.path : ''),
        cli_args: [
          // very verbose geckodriver logs
          // '-vv'
        ]
      }
    },

    chrome_local: {
      desiredCapabilities : {
        browserName : 'chrome',
        chromeOptions : {
          // This tells Chromedriver to run using the legacy JSONWire protocol (not required in Chrome 78)
          // w3c: false,
          // More info on Chromedriver: https://sites.google.com/a/chromium.org/chromedriver/
          args: [
            '--use-fake-ui-for-media-stream'
            //'--no-sandbox',
            //'--ignore-certificate-errors',
            //'--allow-insecure-localhost',
            //'--headless'
          ]
        }
      },

      webdriver: {
        start_process: true,
        port: 9516,
        server_path: (Services.chromedriver ? Services.chromedriver.path : ''),
        cli_args: [
          // --verbose
        ]
      }
    },

    
    chrome_selenium: {
      selenium_host: 'hub',
      desiredCapabilities: {
        browserName: 'chrome',
      },
    },
    firefox_selenium: {
      selenium_host: 'hub',
      desiredCapabilities: {
        browserName: 'firefox',
      },
    },
    chromeDebug_selenium: {
      selenium_host: 'hub',
      desiredCapabilities: {
        browserName: 'chrome',
      },
    },
    firefoxDebug_selenium: {
      selenium_host: 'hub',
      desiredCapabilities: {
        browserName: 'firefox',
      },
    },
  },
}

function loadServices() {
  try {
    Services.seleniumServer = require('selenium-server');
  } catch (err) {}

  try {
    Services.chromedriver = require('chromedriver');
  } catch (err) {}

  try {
    Services.geckodriver = require('geckodriver');
  } catch (err) {}
}