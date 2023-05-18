const axios = require('axios');
const sortAbilitiesByAlphabeticalOrder = require('../../helpers/sortAbilitiesByAlphabeticalOrder/sortAbilitiesByAlphabeticalOrder');
const formatNumbers = require('../../helpers/formatNumbers/formatNumbers');

const fetchPokemonData = async (pokemonName) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
    const pokemonData = response.data;

    if (!pokemonData) {
      throw new Error('Pokemon data not found');
    }

    let { id, abilities, types } = pokemonData;
    const imgURL = pokemonData.sprites.front_default;
    abilities = sortAbilitiesByAlphabeticalOrder(abilities);
    const number = formatNumbers(id);

    console.log(`GET at /api/pokemons/${pokemonName}`);

    return { abilities, imgURL, pokemonName, types, number };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = { fetchPokemonData };
