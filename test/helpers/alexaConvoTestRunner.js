const prom = require('./promisify')
const evt = require('./eventBuilder')

const isObj = o => o && typeof o === 'object'
const isFn = f => typeof f === 'function'
const isPromise = (p) => isObj(p) && isFn(p.then)

/**
 * Creates a function which reduces a conversation into a promise chain
 * that has Alexa handle a request, test the response and continue until
 * the chain ends or an assertion throws.
 * 
 * @param {function} handler the alexa handler function (main lambda handler)
 * @param {object?} [baseEvent] an event object to be merged with the one
 *   that this function first creates. So if you wanted to overwrite the 
 *   sessionId, you could pass {session: {sessionId: 'some-session-id'}}
 */
function createAlexaConvoReducerFn (handler, baseEvent = {}) {
  // Create function to keep using same new session
  // setSession :: Event -> Event
  const setSession = evt.continueSession(
    evt.merge(evt.merge(evt.newSession()), baseEvent)
  )

  // Create function to set {new: false}, except on first event
  // ageEven :: Int -> (Event -> Event)
  const ageEvent = index => index > 0 ? evt.makeOld : evt.makeNew

  /**
   * Reducer function which builds a promise chain which will take
   * each part of a tested conversation, build a request, give that
   * request to Alexa handler, run tests on the response and if those
   * tests pass, continue on to the next conversation part 
   * 
   * @param {*} response response from the previous request (if any)
   * @param {object} request configuration for current part of conversation
   * @param {string} request.intent name of intent to set on event
   * @param {object?} request.slots slots to add to the intent object 
   * @param {function?} request.test tests to run on response to this request
   * @param {object?} request.custom merge object with current request event 
   * @param {number} index current conversation array index
   */
  return async function alexaConvoReducerFn (response, request, index) {
    
    // Wait for the (previous) response from Alexa
    const data = await response
    
    const {intent, slots, test, custom} = request
    
    // Build the event for our next request
    const event = setSession(ageEvent(index)(evt.withIntent(intent, slots)))
    const res = await handler(event, {})
    // Run test on the response from Alexa
    if (typeof test === 'function') test(res)
    return res
  }
}


/**
 * Alexa Convo Test Runner
 * Takes a sequence of conversation configurations and test functions
 * and returns a promise that runs the conversation with Alexa, testing
 * the different responses along the way with any included test functions. 
 * 
 * @param {[{intent:string,slots:[object],test:function,custom:object?}]} convo
 * @param {object} [baseEvent] optionally pass a base event to merge into first
 *   event object in conversation
 * @returns {Promise}
 */
module.exports = function alexaConvoTestRunner (handler, convo = [], baseEvent = {}) {
  // Denodify the Alexa Handler into a Promise
  const handlerPromise = isPromise(handler) ? handler : prom(handler)
  
  return convo.reduce(
    createAlexaConvoReducerFn(handlerPromise, baseEvent),
    Promise.resolve('initial request placeholder')
  )
}
