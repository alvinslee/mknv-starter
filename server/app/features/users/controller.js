const User = require('./model')

exports.getUsers = async (context) => {
  const users = await User.find({})
  if (!users) {
    throw new Error('There was an error retrieving your users.')
  } else {
    context.body = users
  }
}
