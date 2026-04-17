const mongoose = require('mongoose')
const Pokemon = require('../models/pokemon-model')
require('dotenv').config()

const pokemons = [
  { name: 'Bulbizarre', hp: 45, cp: 45, picture: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png', types: ['Plante', 'Poison'] },
  { name: 'Salamèche', hp: 39, cp: 52, picture: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png', types: ['Feu'] },
  { name: 'Carapuce', hp: 44, cp: 48, picture: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png', types: ['Eau'] },
  { name: 'Pikachu', hp: 35, cp: 55, picture: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png', types: ['Électrik'] },
  { name: 'Ronflex', hp: 160, cp: 110, picture: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/143.png', types: ['Normal'] },
  { name: 'Mewtwo', hp: 106, cp: 110, picture: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/150.png', types: ['Psy'] },
  { name: 'Dracaufeu', hp: 78, cp: 84, picture: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/006.png', types: ['Feu', 'Vol'] },
  { name: 'Artikodin', hp: 90, cp: 85, picture: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/144.png', types: ['Glace', 'Vol'] },
  { name: 'Électhor', hp: 90, cp: 90, picture: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/145.png', types: ['Électrik', 'Vol'] },
  { name: 'Sulfura', hp: 90, cp: 100, picture: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/146.png', types: ['Feu', 'Vol'] }
]

const seedPokemons = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost/pokemon-api-rest'
    await mongoose.connect(mongoUri)

    await Pokemon.deleteMany({})
    const created = await Pokemon.insertMany(pokemons)
    console.log(`${created.length} pokémons insérés avec succès`)

    await mongoose.disconnect()
  } catch (error) {
    console.error('Erreur lors du seed:', error.message)
    process.exit(1)
  }
}

seedPokemons()
