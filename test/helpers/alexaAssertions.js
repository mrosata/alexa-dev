const {expect} = require('chai')


function assertAlexaSpeech(expectedSpeech) {
  return data => {
    expect(data).to.be.a('object')
      .to.have.nested.property('response.outputSpeech.ssml')
      .to.contain(expectedSpeech)
    return data
  }
}

module.exports = {
  assertAlexaSpeech,
}