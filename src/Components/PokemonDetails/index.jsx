import React, { useEffect, useReducer } from 'react';
import { InitialValue, PokeDetailsReducer } from './PokeDetailsReducer';
import { useParams, Link } from 'react-router-dom';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import { Stack, Typography, IconButton } from '@mui/material';
import { useThis } from '../contexts/PokemonContext';

const PokemonDetails = () => {
  const { typeId, name } = useParams();
  const [state, dispatch] = useReducer(PokeDetailsReducer, InitialValue);
  const { capture } = useThis();

  useEffect(() => {
    fetchData(`https://pokeapi.co/api/v2/pokemon/${name}`);
  }, []);
  const fetchData = async (url) => {
    const response = await fetch(url).then((res) => res.json());
    dispatch({ type: 'setTypes', payload: response.types });
    dispatch({ type: 'setArtwork', payload: response.sprites.other['official-artwork'].front_default });
    dispatch({ type: 'setMoves', payload: response.moves });
  };

  const displayTypes = (e) => {
    return (
      <Typography variant="h6" key={e.type.name} sx={{ width: '100px', margin: '2px 5px', backgroundColor: 'darkgray', color: 'black', padding: '2px 10px', borderRadius: '20px', fontVariant: 'small-caps' }}>
        {e.type.name}
      </Typography>
    );
  };

  const displayMoves = (e) => {
    return (
      <Typography key={e.move.name} sx={{ width: '150px', margin: '2px 8px', backgroundColor: 'darkgray', color: 'black', padding: '2px 10px', borderRadius: '5px' }}>
        {e.move.name}
      </Typography>
    );
  };

  const captured = (e) => {
    dispatch({ type: 'setDisable', payload: true });
    capture(name);
  };

  return (
    <Stack alignItems="center" width="50vw" sx={{ backgroundColor:{md:'gray', sm:'none'}, margin: '20px auto', borderRadius: '20px', padding: '50px' }}>
      <Link to={`/${typeId}`}>
        <Typography width="fit-content" sx={{ color: 'white', marginLeft: '-20vw', padding: '2px 25px' }}>
          Back
        </Typography>
      </Link>
      <img src={state.artwork} alt="artWork" width="350px" />
      <IconButton disabled={state.disable} onClick={captured} size="large" edge="start" aria-label="menu" sx={{ borderRadius: '15px', color: 'white', backgroundColor: '#0A0908' }}>
        <CatchingPokemonIcon fontSize="inherit" />
        <Typography>Capture</Typography>
      </IconButton>
      <Typography variant="h2" sx={{ fontVariant: 'small-caps', textShadow: '2px 2px 5px black', color: 'white' }}>
        {name}
      </Typography>
      <Stack direction="row">{state.types.map(displayTypes)}</Stack>
      <Typography>Moves:</Typography>
      <Stack direction="row" flexWrap="wrap" justifyContent="center">
        {state.moves.map(displayMoves)}
      </Stack>
    </Stack>
  );
};
export default PokemonDetails;
