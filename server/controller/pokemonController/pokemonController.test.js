const PokemonService = require('../../services/PokemonService/PokemonService');
const fetchPokemon = require('./pokemonController');

jest.mock('../../services/PokemonService/PokemonService');

describe('fetchPokemon', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch and return Pikachu data successfully', async () => {
    const pokemonName = 'pikachu';
    const req = {
      params: {
        pokemonName,
      },
    };
    const res = {
      json: jest.fn(),
    };
    const pokemonData = {
        abilities: [
            {
                ability: {
                  name: 'lightning-rod',
                  url: 'https://pokeapi.co/api/v2/ability/31/',
                },
                is_hidden: true,
                slot: 3,
              },
            {
              ability: {
                name: 'static',
                url: 'https://pokeapi.co/api/v2/ability/9/',
              },
              is_hidden: false,
              slot: 1,
            },
          ],
      imgURL: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
      pokemonName,
      types: [
        {
          slot: 1,
          type: {
            name: 'electric',
            url: 'https://pokeapi.co/api/v2/type/13/',
          },
        },
      ],
      number: '025',
    };

    PokemonService.fetchPokemonData.mockResolvedValueOnce(pokemonData);

    await fetchPokemon(req, res);

    expect(PokemonService.fetchPokemonData).toHaveBeenCalledWith(pokemonName);
    expect(res.json).toHaveBeenCalledWith(pokemonData);
  });

  it('should handle errors and return an error response', async () => {
    const pokemonName = 'pikachu';
    const req = {
      params: {
        pokemonName,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const errorMessage = 'Internal Server Error';

    PokemonService.fetchPokemonData.mockRejectedValueOnce(new Error(errorMessage));

    await fetchPokemon(req, res);

    expect(PokemonService.fetchPokemonData).toHaveBeenCalledWith(pokemonName);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
  });
});
