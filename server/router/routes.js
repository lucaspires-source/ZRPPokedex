const express = require('express');

const router = express.Router();

const fetchPokemon = require('../controller/pokemonController/pokemonController');

router.get('/pokemons/:pokemonName', fetchPokemon);

module.exports = router;
