import { Box, Button, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import backgroundImage from './pokemon1.png';

export const PokemonNavBar = () => {
  const [type, setType] = useState([]);

  useEffect(() => {
    requestData('https://pokeapi.co/api/v2/type');
  }, []);
  const requestData = async (url) => {
    const response = await fetch(url).then((res) => res.json());
    setType(response.results);
  };

  const displayTypes = (e) => {
    return (
      <Link to={`/${e.name}`} key={e.name}>
        <Button sx={{ color: 'white', width: '110px', margin: '2px', backgroundColor: '#0A0908' }}>{e.name}</Button>
      </Link>
    );
  };

  return (
    <Box>
      <Box sx={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: '740px 240px', backgroundRepeat: 'no-repeat', width: '720px', height: ' 220px', margin: '10px auto', borderRadius: '10px', padding: '10px', textShadow: '2px 2px 4px black' }}>
        <Typography sx={{ color: 'white' }}>Select Type Here:</Typography>
        <Stack direction="row" flexWrap="wrap" sx={{ padding: '10px' }}>
          {type.map(displayTypes)}
        </Stack>
      </Box>
      <Outlet />
    </Box>
  );
};
