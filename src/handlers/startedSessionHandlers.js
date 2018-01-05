const Alexa = require('alexa-sdk')
const {states} = require('../../config')
const baseHandlers = require('./baseHandlers')

module.exports = Alexa.CreateStateHandler(states.STARTED, {
  ...baseHandlers,

  CustomAlexaIntent () {
    this.response.speak(this.t('WELCOME_MESSAGE'))
      .listen(this.t('REPROMPT_WELCOME'))
    this.emit(':responseReady')
  },

  Unhandled () {
    this.emit(':ask', this.t('HELP_MESSAGE'), this.t('HELP_REPROMPT'))
  },

})
