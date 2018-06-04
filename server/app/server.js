const app = new (require('koa'))()
const unprotectedApi = new (require('koa-router'))()
const protectedApi = new (require('koa-router'))()
const Middleware = require('./middleware')
const bodyParser = require('koa-bodyparser')
const morgan = require('koa-morgan')
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

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'))
}

app.use(async (ctx, next) => {
  ctx.response.set('Access-Control-Allow-Origin', 'http://localhost:8081')
  ctx.response.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  ctx.response.set('Access-Control-Allow-Headers', 'accepts,content-type')
  ctx.response.set('Access-Control-Allow-Credentials', true)
  if (ctx.request.method === 'OPTIONS') {
    ctx.response.status = 200
  } else {
    return next()
  }
})

app
  .use(bodyParser())
  .use(unprotectedApi.routes())
  .use(unprotectedApi.allowedMethods())
  .use(Middleware.authenticateToken)
  .use(protectedApi.routes())
  .use(protectedApi.allowedMethods())

const server = app.listen(PORT).on('error', error => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(error)
  }
})

module.exports = server
