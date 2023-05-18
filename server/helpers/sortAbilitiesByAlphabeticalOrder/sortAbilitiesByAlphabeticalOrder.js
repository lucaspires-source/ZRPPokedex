const sortAbilitiesByAlphabeticalOrder = function (pokemonAbilities) {
  const sorted = [...pokemonAbilities].sort((abilityA, abilityB) =>
    abilityA.ability.name.toLowerCase() > abilityB.ability.name.toLowerCase() ? 1 : -1
  )
  return sorted
    }


module.exports = sortAbilitiesByAlphabeticalOrder