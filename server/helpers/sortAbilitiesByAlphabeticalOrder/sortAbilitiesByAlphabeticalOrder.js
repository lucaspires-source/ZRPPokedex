const sortAbilitiesByAlphabeticalOrder = function (pokemonAbilities) {
      const sorted = pokemonAbilities.sort((abilityA, abilityB) => {return abilityA.ability.name > abilityB.ability.name ? 1 : -1})
      return sorted
    }


module.exports = sortAbilitiesByAlphabeticalOrder