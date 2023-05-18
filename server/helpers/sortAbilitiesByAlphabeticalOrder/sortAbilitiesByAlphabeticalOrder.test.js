const sortAbilitiesByAlphabeticalOrder = require('./sortAbilitiesByAlphabeticalOrder');

describe('sortAbilitiesByAlphabeticalOrder', () => {
  it('should sort an array of pokemon abilities by alphabetical order of ability names', () => {
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

    const result = sortAbilitiesByAlphabeticalOrder(pokemonAbilities);

    expect(result).toEqual(expected);
  });
});
