const app = require('./app')
const PORT = process.env.PORT || 8080
const server = app.listen(PORT).on('error', error => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(error)
  }
})

module.exports = server
