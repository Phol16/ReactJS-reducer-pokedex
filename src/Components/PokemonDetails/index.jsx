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
      <Typography variant="h6" key={e.type.name} sx={{ width: '100px', margin: '2px 5px', backgroundColor:`${color}`, color: 'white', padding: '2px 10px', borderRadius: '5px', fontVariant: 'small-caps',textShadow:'1px 1px 4px #000000' }}>
        {e.type.name}
      </Typography>
    );
  };

  const displayMoves = (e) => {
    return (
      <Typography key={e.move.name} sx={{ width: '150px', margin: '2px 8px', backgroundColor: 'darkgray', color: 'white',textShadow:'1px 1px 4px #000000', padding: '2px 10px', borderRadius: '5px' }}>
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
        <Typography width="fit-content" sx={{ color: 'white', marginLeft: '-25vw', padding: '2px 5px', textShadow:' 1px 1px 4px #000000' }}>
          Back
        </Typography>
      </Link>
      <img src={state.artwork} alt="artWork" width="350px" />
      <IconButton disabled={state.disable} onClick={captured} size="large" edge="start" aria-label="menu" sx={{ borderRadius: '5px', color: 'white', backgroundColor: 'darkgray', textShadow:'1px 1px 4px #000000' }}>
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
