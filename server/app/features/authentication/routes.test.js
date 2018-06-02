/* eslint-env jasmine */

const server = require('../../server')
const Config = require('../../config')
const request = require('supertest')
const Users = require('../users')
const UserFactory = Users.factory
const jwt = require('jsonwebtoken')
const itHasBehavior = require('../../jest/itHasBehavior')

const Authentication = require('./index')

const routePrefix = Config.api.prefix + Authentication.routePrefix

afterEach(() => {
  server.close()
})

function itRespondsWithNoToken ({ method, route, params, user }) {
  it('expects response.body not to include token', async () => {
    await user.save()
    const response = await request(server).post(route).send(params)
    expect(response.body.token).toBeUndefined()
  })
  itHasBehavior('responds with 200, but unsuccessful', {
    route,
    method,
    params,
    before: async () => user.save()
  })
}

describe('Authentication (Routes)', () => {
  describe('POST ' + routePrefix + '/', () => {
    let method = 'post'
    let route = routePrefix + '/'

    describe('when email not provided', () => {
      let user = UserFactory.valid()
      let params = { password: user.password }
      itRespondsWithNoToken({ method, route, params, user })
    })
    describe('when password not provided', () => {
      let user = UserFactory.valid()
      let params = { email: user.email }
      itRespondsWithNoToken({ method, route, params, user })
    })
    describe('when user with that email not found', () => {
      let user = UserFactory.valid()
      let params = { email: 'nonexistent@test.com', password: user.password }
      itRespondsWithNoToken({ method, route, params, user })
    })
    describe('when password does not match', () => {
      let user = UserFactory.valid()
      let params = { email: user.email, password: 'incorrect password' }
      itRespondsWithNoToken({ method, route, params, user })
    })
    describe('when password matches for the found user', () => {
      let user = UserFactory.valid()
      let params = { email: user.email, password: user.password }
      it('responds with 200 with a JSON web token', async () => {
        await user.save()
        const response = await request(server).post(route).send(params)
        expect(response.status).toEqual(200)
        expect(response.headers['content-type']).toMatch('application/json')
        expect(response.body.success).toEqual(true)
        expect(response.body.token).not.toBeUndefined()
        const tokenContents = await jwt.verify(response.body.token, Config.jwt.secret)
        expect(tokenContents.id).toEqual(user.id)
      })
    })
  })
})
