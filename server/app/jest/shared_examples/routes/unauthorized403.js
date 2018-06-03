/* eslint-env jasmine */

const server = require('../../../server')
const request = require('supertest')

module.exports = async ({ method, route, params }) => {
  describe('when authorization token is malformed', () => {
    const token = 'abc'
    it('returns 403', async () => {
      const response = await request(server)[method || 'get'](route).send(params || {}).set('authorization', token)
      expect(response.status).toEqual(403)
    })
  })
  describe('when no authorization token given', () => {
    const token = null
    it('returns 403', async () => {
      const response = await request(server)[method || 'get'](route).send(params || {}).set('authorization', token)
      expect(response.status).toEqual(403)
    })
  })
  xdescribe('when token has expired', () => {
  })
  xdescribe('when token has been revoked', () => {
  })
}
