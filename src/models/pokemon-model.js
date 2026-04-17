const { Schema, default: mongoose } = require('mongoose')

const PokemonSchema = new Schema({
  name: String,
  hp: Number,
  cp: Number,
  picture: String,
  types: [String],
  created: {
    type: Date,
    default: new Date()
  }
})

module.exports = mongoose.model('Pokemon', PokemonSchema)
