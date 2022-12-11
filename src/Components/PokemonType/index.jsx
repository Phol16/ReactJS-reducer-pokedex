import { Stack } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DisplayPokemons } from '../DisplayPokemons';

const PokemonType = () => {
  const { typeId } = useParams();
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    fetchPokemon(`https://pokeapi.co/api/v2/type/${typeId}`);
  }, [typeId]);
  const fetchPokemon = async (url) => {
    const response = await fetch(url).then((res) => res.json());
    setPokemon(response.pokemon);
  };

  const displayPokemon = (e) => {
    return <DisplayPokemons key={e.pokemon.name} name={e.pokemon.name} type={typeId} />;
  };

  return (
    <Stack direction="row" flexWrap="wrap" justifyContent="center" maxWidth="90vw">
      {pokemon.map(displayPokemon)}
    </Stack>
  );
};
export default PokemonType;
