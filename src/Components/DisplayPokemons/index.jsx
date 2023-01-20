import { Stack, Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useReducer } from 'react';
import { DispPokemonReducer, InitialState } from './DispPokemonReducer';
import { useState } from 'react';

export const DisplayPokemons = ({ name }) => {
  const { typeId } = useParams();
  const [state, dispatch] = useReducer(DispPokemonReducer, InitialState);

  useEffect(() => {
    fetchPokemon(`https://pokeapi.co/api/v2/pokemon/${name}`);
  }, []);
  const fetchPokemon = async (url) => {
    const response = await fetch(url).then((res) => res.json());
    const types = response.types;
    const art = response.sprites.other['official-artwork'].front_default;
    dispatch({ type: 'setArtwork', payload: art });
    dispatch({ type: 'setElementType', payload: types });
  };


  const element = (e) => {
    const color = (
      e.type.name === 'fire'? 'orange':
      e.type.name === 'water'? 'blue':
      e.type.name === 'grass'? 'green':
      e.type.name === 'poison'? 'purple':
      e.type.name === 'flying'? 'darkviolet':
      e.type.name === 'fighting'? 'red':
      e.type.name === 'bug'? 'lightgreen':
      e.type.name === 'electric'? 'yellow':
      e.type.name === 'rock'? 'darkorange':
      e.type.name === 'ground'? 'brown':
      e.type.name === 'dark'? 'black':
      e.type.name === 'fairy'? 'pink':
      e.type.name === 'normal'? 'darkgray':
      e.type.name === 'ice'? 'lightblue':
      e.type.name === 'dragon'? 'violet':
      e.type.name === 'psychic'? 'darkblue':
      e.type.name === 'ghost'? '#B689FA':
      e.type.name === 'steel'? '#D8DDCB':
      null
    )
    return (
      <Typography key={e.type.name} sx={{ backgroundColor: `${color}`, borderRadius: '5px', margin: '2px', padding: '0 5px', color:'white', fontVariant:'small-caps', textShadow:'1px 1px 2px #000000' }}>
        {e.type.name}
      </Typography>
    );
  };

  return (
    <Link to={`/${typeId}/${name}`}>
      <Stack color="black" direction="row" flexWrap="wrap" justifyContent="center" alignItems="center" sx={{ width:{md:'450px', xs:'200px'}, height:{md:' 200px', xs:'300px'}, backgroundColor: 'gray', margin: '5px', borderRadius: '10px', padding: '20px' }}>
        <img src={state.artwork} alt="artwork" width="200px" height="200px" />
        <Stack>
          <Typography variant="h5" sx={{ fontVariant: 'small-caps', color:'white', textShadow:'1px 1px 4px #000000' }}>
            {name}
          </Typography>
          {state.elementType.map(element)}
        </Stack>
      </Stack>
    </Link>
  );
};
