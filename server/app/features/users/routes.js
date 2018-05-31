const User = require('./model')
const router = new (require('koa-router'))()

router.get('/', async (ctx) => {
  try {
    let users = await User.find().select('id email')
    ctx.status = 200
    ctx.body = users
  } catch (e) {
    ctx.status = 500
    ctx.body = e
  }
})

module.exports = router.routes()
