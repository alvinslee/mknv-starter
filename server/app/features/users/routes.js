const Controller = require('./controller')
const router = new (require('koa-router'))()

router.get('/', async (ctx) => {
  try {
    ctx.body = await Controller.getAll()
    ctx.status = 200
  } catch (e) {
    console.log(e)
    ctx.status = 500
    ctx.body = e
  }
})

module.exports = router.routes()
