const sinon = require('sinon')
const User = require('./model')

const valid = () => {
  return new User({
    firstName: 'John',
    lastName: 'Smith',
    email: 'test@test.com',
    password: 'password'
  })
}

const mock = () => {
  return sinon.mock(valid()).object
}

module.exports = { valid, mock }
