
const axios = require('axios');
const fetchPokemon = require('./pokemonController');

jest.mock('axios');

describe('fetchPokemon', () => {
  it('should fetch and format Pokemon data', async () => {
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

    const req = { params: { pokemonName: 'mudkip' } };
    const res = {
      send: jest.fn(),
      json: jest.fn()
    };

 
    await fetchPokemon(req, res);


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


  it('should handle API errors', async () => {

    const errorMessage = 'Pokemon not found';
    const errorResponse = {
      response: {
        statusText: errorMessage
      }
    };
    axios.get.mockRejectedValueOnce(errorResponse);

    const req = { params: { pokemonName: 'charizard' } };
    const res = {
      send: jest.fn(),
      json: jest.fn()
    };


    await fetchPokemon(req, res);

    expect(axios.get).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/charizard');
    expect(res.send).toHaveBeenCalledWith(errorMessage);
    expect(res.json).not.toHaveBeenCalled();
  });
});