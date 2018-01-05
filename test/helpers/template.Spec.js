const chai = require('chai')
const main = require('../../index')


/**
 * @description
 *   What is the point of this test suite?
 */
describe('Some test suite', function () {

  before('optional description', function() {
    // runs before all tests in this block
  })

  after(function() {
    // runs after all tests in this block
  })

  beforeEach('optional description', function() {
    // runs before each test in this block
  })

  afterEach(function() {
    // runs after each test in this block
  })

  it('should do something', function () {
    // test goes here
  })
  
  it('should also...', function () {
    // another test goes here
  })

})
