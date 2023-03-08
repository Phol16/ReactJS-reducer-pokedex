import { Box, Button, Stack } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { DisplayPokemons } from '../DisplayPokemons';

const PokemonType = () => {
  const { typeId } = useParams();
  const [pokemon, setPokemon] = useState([]);
  const [page, setPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentType, setCurrentType] = useState('');
  const currentRef = useRef(typeId)
  useEffect(()=>{
    currentType !== currentRef.current ? (
      setCurrentType(currentRef.current),
      setPage(5),
      setCurrentPage(1)
     ) : null
  })

  currentRef.current = typeId


  useEffect(() => {
    fetchPokemon(`https://pokeapi.co/api/v2/type/${typeId}`);
  }, [typeId]);
  const fetchPokemon = async (url) => {
    const response = await fetch(url).then((res) => res.json());
    setPokemon(response.pokemon);
  };

  const displayPokemon = (e, index) => {
    if (index <= page && index >= page-5) {
      return <DisplayPokemons key={e.pokemon.name} name={e.pokemon.name} type={typeId} />;
    }
  };

  return (
    <Box>
      <Stack direction='row' flexWrap='wrap' justifyContent='center' maxWidth='90vw'>
        {pokemon.map(displayPokemon)}
      </Stack>
      <Stack direction='row' justifyContent='center'>
      <button onClick={()=>{page === 5 ? 
        setPage(5) 
        : 
        (
        setPage(page-5),
        setCurrentPage(currentPage-1)
        )
        }}>Prev</button>
      <p>{currentPage}/{Math.ceil((pokemon.length-1)/5)}</p>
      <button onClick={()=>{
        page >= pokemon.length-1 ? (
        setPage(pokemon.length-1))
        : (
        setPage(page+5),
        setCurrentPage(currentPage+1)
        )
      }}
        >Next</button>
        </Stack>
    </Box>
  );
};
export default PokemonType;
