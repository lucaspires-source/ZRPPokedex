const axios = require('axios');
const PokemonService = require('./PokemonService');

jest.mock('axios');

describe('fetchPokemonData', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch and process Pikachu data successfully', async () => {
    const pokemonName = 'pikachu';
    const mockedResponse = {
      data: {
        id: 25,
        abilities: [
          {
            ability: {
              name: 'static',
              url: 'https://pokeapi.co/api/v2/ability/9/',
            },
            is_hidden: false,
            slot: 1,
          },
          {
            ability: {
              name: 'lightning-rod',
              url: 'https://pokeapi.co/api/v2/ability/31/',
            },
            is_hidden: true,
            slot: 3,
          },
        ],
        types: [
          {
            slot: 1,
            type: {
              name: 'electric',
              url: 'https://pokeapi.co/api/v2/type/13/',
            },
          },
        ],
        sprites: {
          front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
        },
      },
    };

    axios.get.mockResolvedValueOnce(mockedResponse);

    const expectedResult = {
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
      pokemonName: 'pikachu',
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

    const result = await PokemonService.fetchPokemonData(pokemonName);

    expect(axios.get).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/pikachu');
    expect(result).toEqual(expectedResult);
  });

  it('should throw an error when Pokemon data is not found', async () => {
    const pokemonName = 'unknown';
    const mockedResponse = {
      data: null,
    };

    axios.get.mockResolvedValueOnce(mockedResponse);

    await expect(PokemonService.fetchPokemonData(pokemonName)).rejects.toThrow('Pokemon data not found');
  });

  it('should throw an error when an error occurs during the API request', async () => {
    const pokemonName = 'pikachu';
    const mockedError = new Error('API request failed');

    axios.get.mockRejectedValueOnce(mockedError);

    await expect(PokemonService.fetchPokemonData(pokemonName)).rejects.toThrow('API request failed');
  });
});
