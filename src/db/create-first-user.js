const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const User = require('../models/user-model')
require('dotenv').config()

const createFirstUser = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost/pokemon-api-rest'
    await mongoose.connect(mongoUri)

    const hashedPassword = await bcrypt.hash('pikachu', 10)
    const user = await User.create({
      username: 'pikachu',
      password: hashedPassword
    })

    console.log('First user created:', user)
    await mongoose.disconnect()
  } catch (error) {
    console.error('Error creating first user:', error.message)
  }
}

createFirstUser()

module.exports = { createFirstUser }
