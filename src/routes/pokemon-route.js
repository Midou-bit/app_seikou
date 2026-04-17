const Pokemon = require('../models/pokemon-model')

const findAllPokemons = async (req, res) => {
  try {
    const pokemons = await Pokemon.find()
    res.json(pokemons)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const findPokemonByPk = async (req, res) => {
  try {
    const pokemon = await Pokemon.findOne({ _id: req.params.id })
    res.json(pokemon)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const createPokemon = async (req, res) => {
  try {
    const pokemon = await Pokemon.create(req.body)
    res.status(201).json(pokemon)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const updatePokemon = async (req, res) => {
  try {
    const id = req.params.id
    const pokemon = await Pokemon.findOneAndUpdate(
      { _id: id },
      req.body,
      { new: true }
    )
    res.json(pokemon)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const deletePokemon = async (req, res) => {
  try {
    const id = req.params.id
    await Pokemon.findById({ _id: id })
    await Pokemon.deleteOne({ _id: id })
    res.json({ message: 'pokemon deleted' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

module.exports = {
  findAllPokemons,
  findPokemonByPk,
  createPokemon,
  updatePokemon,
  deletePokemon
}
