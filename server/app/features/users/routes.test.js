/* eslint-env jasmine */

const server = require('../../server')
const Config = require('../../config')
const request = require('supertest')
const Users = require('./index')
const UserController = Users.controller
const UserFactory = Users.factory
const jwt = require('jsonwebtoken')

const routePrefix = Config.api.prefix + Users.routePrefix

let createSavedUser = async () => {
  return UserFactory.valid().save()
}

let createToken = (user) => {
  const expiresAt = Math.floor(Date.now() / 1000) + Config.session.timeoutSeconds
  return jwt.sign({ exp: expiresAt, data: { userId: user.id } }, Config.jwt.secret)
}

afterEach(() => {
  server.close()
})

describe('Users (Routes)', () => {
  describe('GET ' + routePrefix + '/', () => {
    const route = routePrefix + '/'
    it('calls authenticateToken() middleware', async () => {
    })
    it('responds with an array of Users, as JSON', async () => {
      let user = await createSavedUser()
      let token = await createToken(user)
      const spy = jest.spyOn(UserController, 'getAll')
      const response = await request(server).get(route).set('authorization', token)
      expect(response.status).toEqual(200)
      expect(Array.prototype.isPrototypeOf(response.body)).toBe(true)
      expect(spy).toHaveBeenCalled()
    })
  })
})
