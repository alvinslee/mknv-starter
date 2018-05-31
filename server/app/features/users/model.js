const mongoose = require('../../mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10

let userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    validate: {
      validator: isEmailUnique,
      message: 'A user with this email already exists.'
    }
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters'],
    trim: true
  }
})

async function isEmailUnique () {
  const email = this.email
  let unique = false
  try {
    let users = await mongoose.models['User'].find({ email })
    unique = (users.length === 0 || users[0].id === this.id)
  } catch (e) {
    console.log(e)
  }
  return unique
}

userSchema.methods = {
  validPassword: async function (unhashedPassword) {
    try {
      const match = await bcrypt.compare(unhashedPassword, this.password)
      return match
    } catch (e) {
      return false
    }
  }
}

userSchema.pre('save', async function () {
  this.email = this.email.toLowerCase()

  if (this.isModified('password')) {
    const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR)
    this.password = bcrypt.hashSync(this.password, salt)
  }
})

module.exports = mongoose.model('User', userSchema)
