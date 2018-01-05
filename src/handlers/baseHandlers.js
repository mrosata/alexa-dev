
module.exports = {
  Unknown () {
    this.emit(':tell', this.t('SORRY_MESSAGE'))
  },

  'AMAZON.HelpIntent' () {
    this.emit(':ask', this.t('HELP_MESSAGE'), this.t('HELP_REPROMPT'))
  },

  'AMAZON.StopIntent' () {
    this.emit( ':tell', this.t('EXIT_SKILL'))
  },
}