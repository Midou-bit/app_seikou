const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// MongoDB connection
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost/pokemon-api-rest'
mongoose.connect(mongoUri)

// Auth middleware (applied to all routes except /api/login)
const authMiddleware = require('./src/auth/auth')

// Routes without auth
const { userLogin } = require('./src/routes/user-route')
app.post('/api/login', userLogin)

// Routes with auth
app.use(authMiddleware)

const {
  findAllPokemons,
  findPokemonByPk,
  createPokemon,
  updatePokemon,
  deletePokemon
} = require('./src/routes/pokemon-route')

app.get('/api/pokemons', findAllPokemons)
app.get('/api/pokemons/:id', findPokemonByPk)
app.post('/api/pokemons', createPokemon)
app.put('/api/pokemons/:id', updatePokemon)
app.delete('/api/pokemons/:id', deletePokemon)

// 404 catch-all
app.use((req, res) => {
  res.status(404).json({ message: 'notfound' })
})

app.listen(8000, () => {
  console.log('App listening on port 8000')
})
