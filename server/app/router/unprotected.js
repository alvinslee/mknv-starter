const KoaRouter = require('koa-router')
const PORT = process.env.PORT || 8080
const Config = require('../config')

const unprotectedApi = new KoaRouter()
unprotectedApi.get('/', ctx => {
  ctx.status = 200
  ctx.body = 'Hello! The API is at http://localhost:' + PORT + Config.api.prefix
})

const Authentication = require('../features/authentication')
const Accounts = require('../features/accounts')
unprotectedApi.use(Config.api.prefix + Authentication.routePrefix, Authentication.routes)
unprotectedApi.use(Config.api.prefix + Accounts.routePrefix, Accounts.routes)

module.exports = unprotectedApi
