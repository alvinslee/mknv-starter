const router = new (require('koa-router'))()
const User = require('../users/model')

router.put('/', async (ctx) => {
  let params = ctx.request.body

  ctx.body = { success: false }
  ctx.status = 200

  params.email = params.email || ''
  params.password = params.password || ''
  if (params.email.length && params.password.length) {
    try {
      let user = new User({ email: params.email, password: params.password })
      await user.save()
      ctx.body.success = true
    } catch (error) {
      ctx.body.message = error
    }
  }
})

module.exports = router.routes()
