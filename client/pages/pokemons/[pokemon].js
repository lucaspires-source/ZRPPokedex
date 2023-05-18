import Head from "next/head";
import Link from "next/link";

export async function getServerSideProps(context) {
  const pokemonName = context.query.pokemon;
  if (!pokemonName) {
    return {
      notFound: true,
    };
  }
  try {
    const response = await fetch(
      `http://localhost:8000/api/pokemons/${pokemonName}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();

    return {
      props: {
        pokemonName,
        abilities: data.abilities,
        imgUrl: data.imgURL,
        number: data.id,
        types: data.types,
      },
    };
  } catch (error) {
    console.log(error);
  }

  return {
    redirect: {
      destination: `/pokemons/${pokemonName}`,
      statusCode: 307,
    },
  };
}

export default function Pokemom({
  pokemonName,
  abilities,
  imgUrl,
  number,
  types,
}) {
  return (
    <div>
      <Head>
        <title>{pokemonName}</title>
      </Head>
      <div className="page-wrapper">
        <div className="pokemon-container">
        <Link href="/" passHref>
          <div className="back-button">
            <a className="back-link">&larr; Back to Homepage</a>
          </div>
          </Link>
          <div className="pokemon-card">
            <div className="pokemon-name">
              <p>
                #{number}{" "}{pokemonName}
              </p>
            </div>
            <div className="pokemon-info">
              <div>
              <img src={imgUrl} alt={pokemonName} />
              </div>
              <div className="pokemon-stats">
              <p>Abilities:</p>
              {
              abilities.map((ab) => {
                return <span>{ab.ability.name}</span>;
              })}
              <p>Type:</p>
              {types.map((ty) => {
                return <span>{ty.type.name}</span>;
              })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
