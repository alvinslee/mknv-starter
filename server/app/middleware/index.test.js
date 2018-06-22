/* eslint-env jasmine */

const Middleware = require('./index')
const Config = require('../config')
const Users = require('../features/users')
const UserFactory = Users.factory
const jwt = require('jsonwebtoken')
const sinon = require('sinon')

describe('Middleware', () => {
  describe('setAccessControl()', () => {
  })
  describe('authenticateToken()', () => {
    const stubCtx = (token) => {
      return { headers: { authorization: token }, response: {}, body: {} }
    }
    describe('when authorization token is malformed', () => {
      it('sets response status to 403', async () => {
        let ctx = stubCtx('abc')
        await Middleware.authenticateToken(ctx)
        expect(ctx.response.status).toEqual(403)
      })
      it('does not call next', async () => {
        let ctx = stubCtx('abc')
        let next = sinon.spy()
        await Middleware.authenticateToken(ctx, next)
        expect(next.called).toEqual(false)
      })
    })
    describe('when no authorization token given', () => {
      it('sets response status to 403', async () => {
        let ctx = stubCtx(null)
        await Middleware.authenticateToken(ctx)
        expect(ctx.response.status).toEqual(403)
      })
      it('does not call next', async () => {
        let ctx = stubCtx(null)
        let next = sinon.spy()
        await Middleware.authenticateToken(ctx, next)
        expect(next.called).toEqual(false)
      })
    })
    describe('when token has expired', () => {
      it('sets response status to 403', async () => {
        let user = await UserFactory.valid().save()
        const expiresAt = Math.floor(Date.now() / 1000) - 5
        let token = jwt.sign({ exp: expiresAt, data: { userId: user.id } }, Config.jwt.secret)
        let ctx = stubCtx(token)
        await Middleware.authenticateToken(ctx)
        expect(ctx.response.status).toEqual(403)
      })
      it('does not call next', async () => {
        let user = await UserFactory.valid().save()
        const expiresAt = Math.floor(Date.now() / 1000) - 5
        let token = jwt.sign({ exp: expiresAt, data: { userId: user.id } }, Config.jwt.secret)
        let ctx = stubCtx(token)
        let next = sinon.spy()
        await Middleware.authenticateToken(ctx, next)
        expect(next.called).toEqual(false)
      })
    })
    describe('when token is valid', async () => {
      it('sets response authentication', async () => {
        let user = await UserFactory.valid().save()
        const expiresAt = Math.floor(Date.now() / 1000) + Config.session.timeoutSeconds
        let token = jwt.sign({ exp: expiresAt, data: { userId: user.id } }, Config.jwt.secret)
        let ctx = stubCtx(token)
        await Middleware.authenticateToken(ctx)
        expect(ctx.response.authentication.id).toEqual(user.id)
      })
      it('calls next', async () => {
        let user = await UserFactory.valid().save()
        const expiresAt = Math.floor(Date.now() / 1000) + Config.session.timeoutSeconds
        let token = jwt.sign({ exp: expiresAt, data: { userId: user.id } }, Config.jwt.secret)
        let ctx = stubCtx(token)
        let next = sinon.spy()
        await Middleware.authenticateToken(ctx, next)
        expect(next.called).toEqual(true)
      })
    })
  })
})
