import React, {useState, useEffect, useCallback} from 'react'
import {  SafeAreaView } from 'react-native-safe-area-context'
import { getPokemonsApi, getPokemonDetailsByUrlApi } from '../api/pokemon';
import PokemonList from '../components/PokemonList';

export default function Pokedex() {
  const [pokemons, setPokemons] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPokemons();
  }, []);

  const loadPokemons = useCallback(async () =>{
    try {
      setLoading(true);
      const {results: pokemonsResponse, next: nextPokemonListUrl} =
        await getPokemonsApi(nextUrl);
      setNextUrl(nextPokemonListUrl);

      const pokemonArray = [];
      for await (const pokemon of pokemonsResponse){
        const pokemonDetails = await getPokemonDetailsByUrlApi(pokemon.url);
        pokemonArray.push({
          id: pokemonDetails.id,
          name: pokemonDetails.name,
          type: pokemonDetails.types[0].type.name,
          order: pokemonDetails.order,
          image: pokemonDetails.sprites.other['official-artwork'].front_default
        });
      }
      setPokemons([...pokemons,...pokemonArray]);
    } catch (error) {
      console.error(error);
    } finally {
      // regresamos loading a false
          setLoading(false);
        }
      }, [pokemons, nextUrl]);

  return (
    <SafeAreaView>
        <PokemonList
          pokemons={pokemons}
          loadPokemons={loadPokemons}
          isNext={nextUrl}
          isLoading={loading}
        />
    </SafeAreaView>
  )
}
