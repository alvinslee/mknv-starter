const app = new (require('koa'))()
const router = require('./router')
const Middleware = require('./middleware')
const bodyParser = require('koa-bodyparser')
const morgan = require('koa-morgan')

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'))
}

app
  .use(Middleware.setAccessControl)
  .use(bodyParser())
  .use(router.protected.routes())
  .use(router.protected.allowedMethods())
  .use(router.unprotected.routes())
  .use(router.unprotected.allowedMethods())

module.exports = app
