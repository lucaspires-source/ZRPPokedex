import React from "react";
import Link from "next/link";
import Router from "next/router";
export default function SearchBox() {
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState([]);
  const [allPokemonNames, setAllPokemonNames] = React.useState([]);

  React.useEffect(() => {
    fetchPokemons()
    const clearQuery = () => {
      setQuery("");
    };
    Router.events.on("routeChangeComplete", clearQuery);

    return () => {
      Router.events.off("routeChangeComplete", clearQuery);
    };
  }, []);

  async function fetchPokemons() {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=1015');
      if (!response.ok) {
        throw new Error('Failed to fetch pokemons');
      }
      const data = await response.json();
      const pokemonNames = data.results.map(pokemon => pokemon.name);
      setAllPokemonNames(pokemonNames)
      return pokemonNames;
    } catch (error) {
      console.error('Error fetching pokemons:', error);
      return [];
    }
  }
  
  const onChange = (e) => {
    const { value } = e.target;
    setQuery(value);
  
    if (value.length > 3) {
      const lowercasedValue = value.toLowerCase();
      const matchingPokemons = allPokemonNames.filter((pokemonName) =>
        pokemonName.toLowerCase().startsWith(lowercasedValue)
      ).slice(0, 5);
  
      setResults(
        matchingPokemons.map((pokemonName) => ({
          name: pokemonName,
          slug: `/${pokemonName}`,
        }))
      );
    } else {
      setResults([]);
    }
  };

  return (
    <>
      <div className="logo-container">
        <img src="https://logodownload.org/wp-content/uploads/2017/08/pokemon-logo-8-2048x752.png" alt="logo"/>
      </div>
      <div className="search">
        <input
          type="text"
          placeholder="Search for a pokemon"
          value={query}
          onChange={onChange}
        />
        {query.length > 3 && (
          <ul>
            {results.length > 0 ? (
              results.map((pokemon) => (
                <li key={pokemon.slug}>
                  <Link href={`/pokemons/${pokemon.name}`} passHref>
                    <a href="dummy">{pokemon.name}</a>
                  </Link>
                </li>
              ))
            ) : (
              <li className="search__no-results">
                {" "}
                Sorry, we could not find any pokemon with this name :(
              </li>
            )}
          </ul>
        )}
      </div>
    </>
  );
}
