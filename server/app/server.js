const app = require('./app')
const PORT = process.env.PORT || 8080
let server = null
if (process.env.NODE_ENV === 'test') {
  server = app.callback()
} else {
  server = app.listen(PORT).on('error', error => {
    if (process.env.NODE_ENV !== 'test') {
      console.log(error)
    }
  })
}

module.exports = server
