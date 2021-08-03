var add = require('../src/add.js');
var expect = require('chai').expect;

describe('Demo03', function() {
  it('Demo03-01', function() {
    expect(add(1, 1)).to.be.equal(2);
  });

  it('Demo03-02', function() {
    expect(add(1, 0)).to.be.equal(1);
  });
});
