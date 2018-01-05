const {interject} = require('./src/utils')
const language = require('./src/language')

module.exports = {
  states: {
    EMPTY: '',
    STARTED: '_STARTED',
  },
  language,
}
