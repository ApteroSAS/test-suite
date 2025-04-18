var fs = require('fs');
var path = require('path');
var handlebars = require('handlebars');

module.exports = {
  write : function(results, options, done) {

    var reportFilename = "report" + (Math.floor(Date.now() / 1000)) + '.html';
    var reportFilePath = path.join(__dirname, "results", reportFilename);

    // read the html template
    fs.readFile('html-reporter.hbs', function(err, data) {
      if (err) throw err;

      var template = data.toString();

      // merge the template with the test results data
      var html = handlebars.compile(template)({
        results   : results,
        options   : options,
        timestamp : new Date().toString(),
        browser   : "report".split('_').join(' ')
      });

      // write the html to a file
      fs.writeFile(reportFilePath, html, function(err) {
        if (err) throw err;
        console.log('Report generated: ' + reportFilePath);
        done();
      });
    });
  }
};