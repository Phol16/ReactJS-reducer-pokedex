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
  width: 400,
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
    return (
      <Typography key={e.type.name} sx={{ width: '80px', margin: '2px 5px', backgroundColor: 'darkgray', color: 'black', padding: '2px 10px', borderRadius: '20px', fontVariant: 'small-caps' }}>
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
      <IconButton onClick={handleOpen} size="medium" edge="start" aria-label="menu" sx={{ borderRadius: '15px', color: 'white', backgroundColor: '#0A0908' }}>
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
