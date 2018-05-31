const router = new (require('koa-router'))()
const Config = require('../../config')
const Users = require('../users')
const User = Users.model
const jwt = require('jsonwebtoken')

router.post('/', async (ctx) => {
  let params = ctx.request.body
  let success = false
  let token = null

  ctx.status = 200

  params.email = params.email || ''
  params.password = params.password || ''
  if (params.email.length && params.password.length) {
    try {
      const user = await User.findOne({ email: params.email })
      if (user) {
        if (await user.validPassword(params.password)) {
          success = true
          token = jwt.sign({}, Config.jwt.secret)
        }
      }
    } catch (e) {
      console.log(e)
      ctx.status = 500
    }
  }
  ctx.body = { success, token }
})

module.exports = router.routes()
