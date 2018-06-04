let database = { url: 'mongodb://localhost:27017/' }
switch (process.env.NODE_ENV) {
  case 'test':
    database.name = 'mknv-starter-test'
    break
  case 'production':
    database.name = 'mknv-starter'
    break
  default:
    database.name = 'mknv-starter-dev'
    break
}

let api = {
  prefix: '/api'
}

let jwt = {
  secret: 'rEplaCE tHiS w1th y0Ur oWn 5ecr3t!'
}

let session = {
  timeoutSeconds: 60 * 60 // 1 hour
}

module.exports = {
  database,
  jwt,
  api,
  session
}
