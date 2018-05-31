const Config = require('../config')

const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
mongoose
  .connect(Config.database.url + Config.database.name)
  .then((response) => {
  })
  .catch((error) => {
    console.log('Error connecting to mongo')
    console.log(error)
  })

module.exports = mongoose
