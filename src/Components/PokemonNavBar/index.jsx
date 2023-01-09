import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Stack, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
      <Stack  sx={{ backgroundImage: {lg:`url(${backgroundImage})`,md:'none'},backgroundColor:{ lg:'none', xs:'gray'}, backgroundSize: '740px 240px', backgroundRepeat: 'no-repeat', width:{lg:'720px', xs:'60vw'}, height:{ lg:'220px'}, margin: '10px auto', borderRadius: '10px', padding: '10px', textShadow: '2px 2px 4px black'}}>
        <Typography sx={{ color: 'white', display:{sm: 'block', xs:'none'}}}>Select Type Here:</Typography>
        <Stack direction="row" flexWrap="wrap" justifyContent='center' sx={{ padding: '10px',display:{sm: 'block', xs:'none'} }}>
          {type.map(displayTypes)}
        </Stack>
        <Accordion sx={{display:{sm: 'none', xs:'block', backgroundColor:'gray', color:'white', maxHeight:'300px'}}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Select Type Here</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{maxHeight:'200px', overflow:'auto',backgroundColor:'#676767', margin:'2px'}}>
        <Stack direction="row" flexWrap="wrap" justifyContent='center' sx={{ padding: '10px' }}>
          {type.map(displayTypes)}
        </Stack>
        </AccordionDetails>
      </Accordion>
      </Stack>
      <Outlet />
    </Box>
  );
};
