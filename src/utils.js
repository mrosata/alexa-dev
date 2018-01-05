
const interject = text => `<say-as interpret-as="interjection">${text}</say-as>`

/**
 * Get random item from an array
 * @param {array<*>} list
 * @return {*} 
 */
const getRandomItem = (list = []) => list && list[rand(Math.floor(Math.random() * list.length))]

module.exports = {
  getRandomItem,
  interject,
}
