const router = new (require('koa-router'))()
const Config = require('../../config')
const Users = require('../users')
const User = Users.model
const jwt = require('jsonwebtoken')

router.post('/', async (ctx) => {
  let params = ctx.request.body

  ctx.body = { success: false }
  ctx.status = 200

  params.email = params.email || ''
  params.password = params.password || ''
  if (params.email.length && params.password.length) {
    try {
      const user = await User.findOne({ email: params.email })
      if (user) {
        if (await user.validPassword(params.password)) {
          ctx.body.success = true
          const expiresAt = Math.floor(Date.now() / 1000) + Config.session.timeoutSeconds
          ctx.body.token = jwt.sign({
            exp: expiresAt,
            data: {
              userId: user.id
            }
          }, Config.jwt.secret)
          ctx.body.userId = user.id
          ctx.body.expiresIn = Config.session.timeoutSeconds
        } else {
          ctx.body.message = 'Password fail'
        }
      } else {
        ctx.body.message = 'User not found'
      }
    } catch (e) {
      ctx.body.message = e
      ctx.status = 500
    }
  }
})

module.exports = router.routes()
