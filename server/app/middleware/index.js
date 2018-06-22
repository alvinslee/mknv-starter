const User = require('../features/users/model')
const Config = require('../config')
const jwt = require('jsonwebtoken')

const setAccessControl = async (ctx, next) => {
  ctx.response.set('Access-Control-Allow-Origin', 'http://localhost:8081')
  ctx.response.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  ctx.response.set('Access-Control-Allow-Headers', 'accepts,content-type')
  ctx.response.set('Access-Control-Allow-Credentials', true)
  if (ctx.request.method === 'OPTIONS') {
    ctx.response.status = 200
  } else {
    return next()
  }
}

const authenticateToken = async (ctx, next) => {
  try {
    const token = ctx.headers.authorization
    if (token) {
      const decoded = await jwt.verify(token, Config.jwt.secret)
      let user = await User.findById(decoded.data.userId)
      ctx.response.authentication = { id: user.id, email: user.email }
      return next()
    }
  } catch (ignore) {
  }
  ctx.response.status = 403
  ctx.body = {
    success: false,
    message: 'User authentication failed'
  }
}

module.exports = {
  authenticateToken,
  setAccessControl
}
