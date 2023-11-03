import React, {useState, useEffect, useCallback} from 'react'
import { Text, Button } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';
import { getPokemonsFavoriteApi } from '../api/favorite';
import { getPokemonDetailsApi } from '../api/pokemon';
import useAuth from '../hooks/useAuth';
import PokemonList from '../components/PokemonList';
import NoLogged from '../components/NoLogged';

export default function Favorite() {
  const [pokemon, setPokemon] = useState([]);
  const {auth} = useAuth();

  useFocusEffect(
    useCallback(() => {
    if(auth){
      (async ()=>{
        const response = await getPokemonsFavoriteApi();
        const pokemonArray = [];
        for await (const id of response){
          const pokemonDetails = await getPokemonDetailsApi(id);
          pokemonArray.push({
            id: pokemonDetails.id,
            name: pokemonDetails.name,
            type: pokemonDetails.types[0].type.name,
            order: pokemonDetails.order,
            image: pokemonDetails.sprites.other['official-artwork'].front_default
          });
        }
        setPokemon(pokemonArray)
    })()
    }    
  }, [auth])
  )
  
  return !auth ? (
    <NoLogged/>
  ) : (
    <PokemonList pokemons={pokemon}/>
  )
}
