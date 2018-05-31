const User = require('../features/users/model')
const Config = require('../config')
const jwt = require('jsonwebtoken')

let authenticateToken = async (ctx, next) => {
  try {
    const token = ctx.headers.authorization
    if (token) {
      const decoded = await jwt.verify(token, Config.jwt.secret)
      let user = await User.findById(decoded.id)
      ctx.response.authentication = { id: user.id, email: user.email }
      return next()
    }
  } catch (ignore) {
    console.log(ignore)
  }
  ctx.response.status = 403
  ctx.body = {
    success: false,
    message: 'User authentication failed'
  }
}

module.exports = {
  authenticateToken
}
