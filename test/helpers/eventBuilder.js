const baseEvent = require('./alexa-event.template')
const merge = require('ramda/src/mergeDeepRight')
const assocPath = require('ramda/src/assocPath')
const assoc = require('ramda/src/assoc')
const prop = require('ramda/src/prop')
const path = require('ramda/src/path')

module.exports = {
  base () {
    return merge(baseEvent, {})
  },

  merge (config = {}) {
    return merge(baseEvent, config)
  },
  
  makeNew: assoc('new', true),

  makeOld: assoc('new', false),

  getSession: path(['session', 'sessionId']),

  setSession: assocPath('sessionId'),

  continueSession(oldEvent) {
    return assoc('session', oldEvent.session)
  },

  newSession(event = {}) {
    return assocPath(
      ['session', 'sessionId'], 
      (Math.random() * Math.pow(38969999992,2)).toString(16),
      event
    )
  },

  withIntent (name, slots = {}) {
    return merge(baseEvent, {
      request: {
        type: "IntentRequest",
        requestId: "EdwRequestId.d10a288d-aa8d-4a0d-90e1-be1d88e2a960",
        intent: { name, slots },
        locale: "en-US",
        timestamp: "2018-01-04T17:40:50Z"
      }
    })
  }
}
