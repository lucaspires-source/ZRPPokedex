const axios = require('axios')
const sortAbilitiesByAlphabeticalOrder = require('../helpers/sortAbilitiesByAlphabeticalOrder')
const formatNumbers = require('../helpers/formatNumbers')


 const fetchPokemon = async (req, res) => {
    const { pokemonName } = req.params
    const pokemon = await axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)
      .catch(error => {
        console.log(error)
        return error
      })
    if (!pokemon.data) {
      return res.send(pokemon.response.statusText)
    }
    let { id, abilities , types} = pokemon.data
    const imgURL = pokemon.data.sprites.front_default
    abilities = sortAbilitiesByAlphabeticalOrder(abilities)
    const number = formatNumbers(id)
    console.log(number)
    console.log(`get at /api/pokemons/${pokemonName}`)
    return res.json({ abilities, imgURL, pokemonName, types, number})
  }

module.exports = fetchPokemon