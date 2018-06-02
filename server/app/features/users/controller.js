const User = require('./model')

async function getAll () {
  try {
    return User.find().select('id email')
  } catch (e) {
    throw new Error('There was an error retrieving your users.')
  }
}

module.exports = { getAll }
