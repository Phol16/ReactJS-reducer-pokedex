import React, { useEffect, useReducer, useState } from 'react';
import { InitialValue, PokeDetailsReducer } from '../PokemonDetails/PokeDetailsReducer';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import { Stack, Typography, IconButton, Modal, Box, Button } from '@mui/material';
import { useThis } from '../contexts/PokemonContext';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: '200px',
  bgcolor: 'gray',
  border: '2px solid #000',
  borderRadius: '20px',
  boxShadow: 24,
  p: 4,
};

export const MyPokemonDetails = ({ name }) => {
  const [state, dispatch] = useReducer(PokeDetailsReducer, InitialValue);
  const { release } = useThis();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    fetchData(`https://pokeapi.co/api/v2/pokemon/${name}`);
  }, []);
  const fetchData = async (url) => {
    const response = await fetch(url).then((res) => res.json());
    dispatch({ type: 'setTypes', payload: response.types });
    dispatch({ type: 'setArtwork', payload: response.sprites.other['official-artwork'].front_default });
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
      <Typography key={e.type.name} sx={{ width: '80px', margin: '2px 5px', backgroundColor: `${color}`, color: 'white',textShadow:'1px 1px 4px #000000', padding: '2px 10px', borderRadius: '5px', fontVariant: 'small-caps' }}>
        {e.type.name}
      </Typography>
    );
  };

  const released = () => {
    release(name);
  };

  return (
    <Stack alignItems="center" width="300px" sx={{ backgroundColor: 'gray', margin: '5px', borderRadius: '20px', padding: '20px' }}>
      <img src={state.artwork} alt="artWork" width="250px" />
      <IconButton onClick={handleOpen} size="medium" edge="start" aria-label="menu" sx={{ borderRadius: '5px', color: 'white', backgroundColor: 'darkgray' }}>
        <CatchingPokemonIcon fontSize="inherit" />
        <Typography sx={{ textShadow: '2px 2px 4px black' }}>Release</Typography>
      </IconButton>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" component="h2" sx={{ color: 'black' }}>
            Do you wish to release {name}?
          </Typography>
          <Button onClick={released} onClose={handleClose} sx={{ color: 'white' }}>
            Confirm
          </Button>
          <Button onClick={handleClose} sx={{ color: 'white' }}>
            Cancel
          </Button>
        </Box>
      </Modal>
      <Typography variant="h4" sx={{ fontVariant: 'small-caps', textShadow: '2px 2px 5px black', color: 'white' }}>
        {name}
      </Typography>
      <Stack direction="row">{state.types.map(displayTypes)}</Stack>
    </Stack>
  );
};
