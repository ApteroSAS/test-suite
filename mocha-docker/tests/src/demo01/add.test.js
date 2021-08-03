var add = require('./add.js');
var expect = require('chai').expect;

describe('demo01', function() {
  it('demo01-01', function() {
    expect(add(1, 1)).to.be.equal(2);
  });
});
