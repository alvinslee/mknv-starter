/* eslint-env jest */

beforeEach(async () => {
  const MongoClient = require('mongodb').MongoClient
  const Config = require('../config')
  try {
    const client = await MongoClient.connect(Config.database.url)
    const db = client.db(Config.database.name)
    db.dropDatabase()
  } catch (e) {
    console.log('Encountered error when cleaning up test database')
    console.log(e)
  }
  jest.setTimeout(10000)
})
