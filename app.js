let express = require('express')
let path = require('path')
let logger = require('morgan')
let bodyParser = require('body-parser')

// let book = require('./routes/book')
let app = express()

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: 'false'}))
app.use(express.static(path.join(__dirname, 'dist')))
// app.use('/books', express.static(path.join(__dirname, 'dist')))
// app.use('/book', book)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  let err = new Error('Not Found')
  err.status = 404
  next(err)
})

// restful api error handler
app.use(function (err, req, res, next) {
  console.log(err)

  if (req.app.get('env') !== 'development') {
    delete err.stack
  }

  res.status(err.statusCode || 500).json(err)
})

module.exports = app
