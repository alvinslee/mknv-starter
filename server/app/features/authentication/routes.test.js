/* eslint-env jasmine */

const server = require('../../server')
const Config = require('../../config')
const request = require('supertest')
const Users = require('../users')
const User = Users.model
const UserFactory = Users.factory

const Authentication = require('./index')

const routePrefix = Config.api.prefix + Authentication.routePrefix

afterEach(() => {
  server.close()
})

describe('Authentication (Routes)', () => {
  describe('POST ' + routePrefix + '/', () => {
    let route = routePrefix + '/'

    describe('when email not provided', () => {
      let user = UserFactory.valid()
      let params = { password: user.password }
      it('responds with 200, but unsuccessful', async () => {
        await user.save()
        const response = await request(server).post(route).send(params)
        expect(response.status).toEqual(200)
        expect(response.headers['content-type']).toMatch('application/json')
        expect(response.body.success).toEqual(false)
        expect(response.body.token).toBeNull()
      })
    })
    describe('when password not provided', () => {
      let user = UserFactory.valid()
      let params = { email: user.email }
      it('responds with 200, but unsuccessful', async () => {
        await user.save()
        const response = await request(server).post(route).send(params)
        expect(response.status).toEqual(200)
        expect(response.headers['content-type']).toMatch('application/json')
        expect(response.body.success).toEqual(false)
        expect(response.body.token).toBeNull()
      })
    })
    describe('when user with that email not found', () => {
      let user = UserFactory.valid()
      let params = { email: 'nonexistent@test.com', password: user.password }
      it('responds with 200, but unsuccessful', async () => {
        await user.save()
        const response = await request(server).post(route).send(params)
        expect(response.status).toEqual(200)
        expect(response.headers['content-type']).toMatch('application/json')
        expect(response.body.success).toEqual(false)
        expect(response.body.token).toBeNull()
      })
    })
    describe('when password does not match', () => {
      let user = UserFactory.valid()
      let params = { email: user.email, password: 'incorrect password' }
      it('responds with 200, but unsuccessful', async () => {
        await user.save()
        const response = await request(server).post(route).send(params)
        expect(response.status).toEqual(200)
        expect(response.headers['content-type']).toMatch('application/json')
        expect(response.body.success).toEqual(false)
        expect(response.body.token).toBeNull()
      })
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
        expect(response.body.token).not.toBeNull()
      })
    })
  })
})
