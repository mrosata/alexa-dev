const {states} = require('../../config')
const baseHandlers = require('./baseHandlers')

// hasAttributes :: Object -> Bool
const hasAttributes = t => Reflect.ownKeys(t.attributes).length

module.exports = {
  ...baseHandlers,

  NewSession() {
    if (!hasAttributes(this))
      this.attributes = {
        score: 0,
        name: '',
      }
    
    // Update the state so next request uses different handlers
    this.handler.state = states.STARTED
    this.emitWithState('CustomAlexaIntent')
  },
  
  LaunchRequest (req) {
    this.state = states.STARTED
    this.emitWithState('CustomAlexaIntent')
  },
}
