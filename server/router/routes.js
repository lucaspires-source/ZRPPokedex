const express = require('express');

const router = express.Router();

const fetchPokemon = require('../controller/pokemonController.js');

router.get('/pokemons/:pokemonName', fetchPokemon);

module.exports = router;
