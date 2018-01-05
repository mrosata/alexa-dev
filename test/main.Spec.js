const mocha = require('mocha')
const chai = require('chai')
chai.config.includeStack = true

// Should we use real database during tests
if (process.env['PERSISTENCE']) {
  process.env['DYNAMODB_TABLE'] = ''
}

const newSessionTests = require('./handlers/newSessionHandlers.Spec')
