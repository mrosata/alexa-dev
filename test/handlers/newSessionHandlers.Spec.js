const {expect} = require('chai')
const main = require('../../index')
const alexaConvoTestRunner = require('../helpers/alexaConvoTestRunner')
const {assertAlexaSpeech} = require('../helpers/alexaAssertions')

const conversation = [
  {
    intent: 'CustomAlexaIntent',
    test: assertAlexaSpeech('Welcome to the machine'),
  },
  {
    intent: 'AMAZON.StopIntent',
    test:assertAlexaSpeech(
      'So long for now'
    ),
  },
]

/**
 * @description
 *   Tests that launching the Alexa skill without previous
 *   session should setup a session for the user.
 */
describe('New Session', function () {
  const handler = main.handler

  it('Has entry point ".handler" function', function () {
    expect(main).to.be.an('object')
      .to.have.property('handler')
      .to.be.a('function')
  })

  it('uses welcome messages', function (done) {
    (async function () {
      await alexaConvoTestRunner(handler, conversation)
      done()
    }.bind(this)())
    .catch(done)
  })

})
