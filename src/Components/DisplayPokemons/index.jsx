import { Stack, Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useReducer } from 'react';
import { DispPokemonReducer, InitialState } from './DispPokemonReducer';

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
    return (
      <Typography key={e.type.name} sx={{ backgroundColor: 'darkgrey', borderRadius: '10px', margin: '2px', padding: '0 5px', fontVariant: 'small-caps' }}>
        {e.type.name}
      </Typography>
    );
  };

  return (
    <Link to={`/${typeId}/${name}`}>
      <Stack color="black" direction="row" flexWrap="wrap" justifyContent="center" alignItems="center" sx={{ width:{md:'450px', xs:'200px'}, height:{md:'200px', xs:'300px'}, backgroundColor: 'gray', margin: '5px', borderRadius: '10px', padding: '20px' }}>
        <img src={state.artwork} alt="artwork" width="200px" height="200px" />
        <Stack>
          <Typography variant="h5" sx={{ fontVariant: 'small-caps' }}>
            {name}
          </Typography>
          {state.elementType.map(element)}
        </Stack>
      </Stack>
    </Link>
  );
};
