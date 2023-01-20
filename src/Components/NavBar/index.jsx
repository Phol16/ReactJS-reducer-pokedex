import * as React from 'react';
import { Box, Stack, AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <Box width="90vw">
      <AppBar position="static" sx={{ backgroundColor: 'gray', borderRadius: '5px' }}>
        <Toolbar>
          <Stack direction="row" justifyContent="space-between" alignItems="center" width="100%">
            <Stack direction="row">
              <Link to="/">
                <IconButton size="large" edge="start" aria-label="menu" sx={{ borderRadius: '25px', color: ' white' }}>
                  <CatchingPokemonIcon />
                  <Typography component="div" sx={{ fontVariant: 'small-caps', textShadow:'1px 1px 4px #000000' }}>
                    PokeDex
                  </Typography>
                </IconButton>
              </Link>
            </Stack>
            <Link to="/MyPokemon">
              <Button sx={{ color: 'white', textShadow:'1px 1px 4px #000000' }}>MyPokemons</Button>
            </Link>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar;
