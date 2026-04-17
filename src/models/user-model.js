const { Schema, default: mongoose } = require('mongoose')

const UserSchema = new Schema({
  username: String,
  password: String,
  created: {
    type: Date,
    default: new Date()
  }
})

module.exports = mongoose.model('User', UserSchema)
