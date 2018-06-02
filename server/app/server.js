const app = new (require('koa'))()
const unprotectedApi = new (require('koa-router'))()
const protectedApi = new (require('koa-router'))()
const Middleware = require('./middleware')
const bodyParser = require('koa-bodyparser')
// const morgan = require('koa-morgan')
const Config = require('./config')
const PORT = process.env.PORT || 8080

unprotectedApi.get('/', ctx => {
  ctx.status = 200
  ctx.body = 'Hello! The API is at http://localhost:' + PORT + Config.api.prefix
})

const Authentication = require('./features/authentication')
unprotectedApi.use(Config.api.prefix + Authentication.routePrefix, Authentication.routes)

const Accounts = require('./features/accounts')
unprotectedApi.use(Config.api.prefix + Accounts.routePrefix, Accounts.routes)

const Users = require('./features/users')
protectedApi.use(Config.api.prefix + Users.routePrefix, Users.routes)

app
  .use(bodyParser())
//  .use(morgan('dev'))
  .use(unprotectedApi.routes())
  .use(unprotectedApi.allowedMethods())
  .use(Middleware.authenticateToken)
  .use(protectedApi.routes())
  .use(protectedApi.allowedMethods())

const server = app.listen(PORT).on('error', error => {
  console.log(error)
})

module.exports = server
