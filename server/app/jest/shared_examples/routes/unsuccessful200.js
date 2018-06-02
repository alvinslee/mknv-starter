/* eslint-env jasmine */

const server = require('../../../server')
const request = require('supertest')

module.exports = async (options) => {
  it('responds with 200, but unsuccessful', async () => {
    if (typeof options.before === 'function') {
      await options.before()
    }
    const response = await (request(server)[options.method || 'get'](options.route).send(options.params || {}))
    expect(response.status).toEqual(200)
    expect(response.body.success).toEqual(false)
    if (options.responseMessage) {
      expect(response.body.message).toEqual(options.responseMessage)
    }
  })
}
