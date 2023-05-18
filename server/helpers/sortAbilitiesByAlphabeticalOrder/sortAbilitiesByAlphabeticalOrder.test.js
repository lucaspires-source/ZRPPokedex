// Import the function to be tested
const sortAbilitiesByAlphabeticalOrder = require('./sortAbilitiesByAlphabeticalOrder');

describe('sortAbilitiesByAlphabeticalOrder', () => {
  it('should sort an array of pokemon abilities by alphabetical order of ability names', () => {
    // Test case
    const pokemonAbilities = [
      { ability: { name: 'Speed' } },
      { ability: { name: 'Agility' } },
      { ability: { name: 'Strength' } },
      { ability: { name: 'Intelligence' } },
    ];
    const expected = [
      { ability: { name: 'Agility' } },
      { ability: { name: 'Intelligence' } },
      { ability: { name: 'Speed' } },
      { ability: { name: 'Strength' } },
    ];

    // Call the function to sort the abilities
    const result = sortAbilitiesByAlphabeticalOrder(pokemonAbilities);

    // Assert the result
    expect(result).toEqual(expected);
  });
});