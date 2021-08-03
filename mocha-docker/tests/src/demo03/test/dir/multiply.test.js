var multiply = require('../../src/multiply');
var expect = require('chai').expect;

describe('demo03-mul', function() {
  it('demo03-mul-01', function() {
    expect(multiply(1, 1)).to.be.equal(1);
  });
})
