const Alexa = require('alexa-sdk')
const AWS = require('aws-sdk')
AWS.config.region = 'us-east-1'
const {language} = require('./config')
const newSessionHandlers = require('./src/handlers/newSessionHandlers')
const startedSessionHandlers = require('./src/handlers/startedSessionHandlers')


exports.handler = function(event, context, callback) {
  // Setup Alexa for current request
  const alexa = Alexa.handler(event, context, callback)
  // Setup language resources
  alexa.resources = language
  // Add persistent storage with dynamoDB
  alexa.dynamoDBTableName = process.env['DYNAMODB_TABLE']
  // Setup handlers and then run the skill
  alexa.registerHandlers(newSessionHandlers, startedSessionHandlers)
  // And Execute the Alexa Skill (it calls callback for us)
  alexa.execute()
}
