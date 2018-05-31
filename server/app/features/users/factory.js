const User = require('./model')

let valid = () => {
  return new User({
    email: 'test@test.com',
    password: 'password'
  })
}

module.exports = { valid }
