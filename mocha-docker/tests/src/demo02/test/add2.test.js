var add = require('../src/add.js');
var expect = require('chai').expect;

describe('demo02', function() {
  it('demo02-01', function() {
    expect(add(1, 1)).to.be.equal(2);
  });

  it('demo02-02', function() {
    expect(add(1, 0)).to.be.equal(4);
  });
});
