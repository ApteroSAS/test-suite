var nightwatchConfig = require('../nightwatch.conf.js')

// EXAMPLE ONLY:

module.exports = {
  'Loadero Test': function (client) {
    console.log('Loadero tests started')

    client.assert.equal(1, 1, "1 OK");

    console.log('Loadero tests finished ♬♪♩')
  },
}
