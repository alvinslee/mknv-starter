/* eslint-env jasmine */

const server = require('../../server')
const Config = require('../../config')
const request = require('supertest')
const Accounts = require('./index')
const Users = require('../users')
const UserFactory = Users.factory
const User = Users.model

const routePrefix = Config.api.prefix + Accounts.routePrefix
const itHasBehavior = require('../../jest/itHasBehavior')

afterEach(() => {
  server.close()
})

describe('Accounts (Routes)', () => {
  describe('PUT ' + routePrefix + '/', () => {
    const method = 'put'
    const route = routePrefix + '/'
    const email = 'new-user@test.com'
    const password = 'password'
    describe('when email not provided', () => {
      let params = { password }
      itHasBehavior('responds with 200, but unsuccessful', { method, route, params })
    })
    describe('when password not provided', () => {
      let params = { email }
      itHasBehavior('responds with 200, but unsuccessful', { method, route, params })
    })
    describe('when email already taken', () => {
      let user = UserFactory.valid()
      let params = { email: user.email, password }
      itHasBehavior('responds with 200, but unsuccessful', {
        method,
        route,
        params,
        before: async () => user.save()
      })
    })
    describe('when password invalid', () => {
      let params = { email, passsword: 'short' }
      itHasBehavior('responds with 200, but unsuccessful', { method, route, params })
    })
    describe('when email and password valid', () => {
      let params = { email, password }
      it('responds with 200 and is successful, but does not authenticate user', async () => {
        const response = await request(server).put(route).send(params)
        expect(response.status).toEqual(200)
        expect(response.body.success).toEqual(true)
        expect(response.body.token).toBeUndefined()
      })
      it('creates a new User with given email and password', async () => {
        await request(server).put(route).send(params)
        let foundUser = await User.findOne({ email: email })
        expect(await foundUser.validPassword(password)).toBe(true)
      })
    })
  })
})
