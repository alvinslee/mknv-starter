/* eslint-env jasmine */

const server = require('../../server')
const Config = require('../../config')
const request = require('supertest')
const Users = require('./index')
const User = Users.model
const UserFactory = Users.factory
const jwt = require('jsonwebtoken')

const routePrefix = Config.api.prefix + Users.routePrefix

let createSavedUser = async () => {
  return UserFactory.valid().save()
}

let createToken = (user) => {
  return jwt.sign({ id: user.id }, Config.jwt.secret)
}

afterEach(() => {
  server.close()
})

describe('Users (Routes)', () => {
  describe('GET ' + routePrefix + '/', () => {
    let route = routePrefix + '/'
//    it('returns 403 if token authentication fails', async () => {
//      const response = await request(server).get(route).set('authorization', 'abc')
//      expect(response.status).toEqual(403)
//    })
    it('responds with an array of Users, as JSON', async () => {
      let user = await createSavedUser()
      let token = await createToken(user)
      let users = await User.find().select('id email')
      const response = await request(server).get(route).set('authorization', token)
      expect(response.status).toEqual(200)
      expect(response.headers['content-type']).toMatch('application/json')
      expect(JSON.stringify(response.body)).toEqual(JSON.stringify(users))
    })
  })
})
