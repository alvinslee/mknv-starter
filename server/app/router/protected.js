const KoaRouter = require('koa-router')
const Middleware = require('../middleware')
const Config = require('../config')

const protectedApi = new KoaRouter()
protectedApi.use(Middleware.authenticateToken)

const Users = require('../features/users')
protectedApi.use(Config.api.prefix + Users.routePrefix, Users.routes)

module.exports = protectedApi
