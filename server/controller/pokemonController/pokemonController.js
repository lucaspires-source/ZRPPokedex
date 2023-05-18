const PokemonService = require('../../services/PokemonService/PokemonService');

const fetchPokemon = async (req, res) => {
  try {
    const { pokemonName } = req.params;
    const pokemonData = await PokemonService.fetchPokemonData(pokemonName);
    return res.json(pokemonData);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = fetchPokemon;
