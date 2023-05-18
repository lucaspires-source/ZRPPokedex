import Head from 'next/head';
import Link from 'next/link';


export async function getServerSideProps(context) {
  const pokemonName = context.query.pokemon
  if (!pokemonName) {
    return {
      notFound: true,
    };
  }
  try {
    const response = await fetch('http://localhost:8000/api/pokemons/pikachu')

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();
    return {
        props:{
            pokemonName,
            abilities: data.abilities,
            imgUrl: data.imgURL,
            number:data.id
        }
        
      }
  }catch(error) {
    console.log(error)
  }

  return {
    redirect: {
        destination: `/pokemons/${pokemonName}`,
        statusCode: 307
    }
}
}


export default function Pokemom({pokemonName,abilities,imgUrl,number}) {
  console.log(number)
  return (
    <div>
      <Head>
        <title>
              {pokemonName}
        </title>
      </Head>
      <div className="page-wrapper">
        <div className="container">
          <div className='pokemon-card'>
             <p>#{number}{" "}{pokemonName}</p>
            <img src={imgUrl}  alt={pokemonName}/>
            {abilities.map(ab => {
                return(
                    <p>{ab.ability.name}</p>
                )
            })}
          </div>
          <Link href="/" passHref><a  className="back-link">&larr; Home</a></Link>
        </div>
      </div>
    </div>
  );
}
