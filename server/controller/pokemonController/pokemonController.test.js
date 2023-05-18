// Import the necessary dependencies and the fetchPokemon function
const axios = require('axios');
const fetchPokemon = require('./pokemonController');

// Mock the axios library to simulate API responses
jest.mock('axios');

// Define a test suite
describe('fetchPokemon', () => {
  // Define a test case for a successful request
  it('should fetch and format Pokemon data', async () => {
    // Mock the API response
    const pokemonData = {
      data: {
        id: 258,
        abilities: [
          { ability: {name: 'torrent', url: 'https://pokeapi.co/api/v2/ability/67/' }},
          { ability: { name: 'damp', url: 'https://pokeapi.co/api/v2/ability/6/' }}
        ],
        types: [
          { name: 'water', url: 'https://pokeapi.co/api/v2/type/11/' }
        ],
        sprites: {
          front_default: 'https://example.com/mudkip.png'
        }
      }
    };
    axios.get.mockResolvedValueOnce(pokemonData);

    // Define the mock request and response objects
    const req = { params: { pokemonName: 'mudkip' } };
    const res = {
      send: jest.fn(),
      json: jest.fn()
    };

    // Call the fetchPokemon function
    await fetchPokemon(req, res);

    // Check the expectations
    expect(axios.get).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/mudkip');
    expect(res.json).toHaveBeenCalledWith({
      abilities: [ 
        { ability: { name: 'damp', url: 'https://pokeapi.co/api/v2/ability/6/' }},
        { ability: {name: 'torrent', url: 'https://pokeapi.co/api/v2/ability/67/' }}
    ],
      imgURL: 'https://example.com/mudkip.png',
      pokemonName: 'mudkip',
      types:  [{"name": "water","url": "https://pokeapi.co/api/v2/type/11/"}],
      number: '258'
    });
    expect(res.send).not.toHaveBeenCalled();
  });

  // Define a test case for an error response
  it('should handle API errors', async () => {
    // Mock the error response
    const errorMessage = 'Pokemon not found';
    const errorResponse = {
      response: {
        statusText: errorMessage
      }
    };
    axios.get.mockRejectedValueOnce(errorResponse);

    // Define the mock request and response objects
    const req = { params: { pokemonName: 'charizard' } };
    const res = {
      send: jest.fn(),
      json: jest.fn()
    };

    // Call the fetchPokemon function
    await fetchPokemon(req, res);

    // Check the expectations
    expect(axios.get).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/charizard');
    expect(res.send).toHaveBeenCalledWith(errorMessage);
    expect(res.json).not.toHaveBeenCalled();
  });
});