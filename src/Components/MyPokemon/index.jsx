import { Stack } from '@mui/system';
import { useThis } from '../contexts/PokemonContext';
import { MyPokemonDetails } from './MyPokemonsDetails';

const MyPokemon = () => {
  const { capturedValue } = useThis();

  const displayThis = (e) => {
    return <MyPokemonDetails key={e} name={e} />;
  };

  return (
    <Stack direction="row" flexWrap="wrap" width="70vw" justifyContent="center" margin="20px auto">
      {capturedValue.length === 0 ? 'Go Catch Some Pokemons!' : capturedValue.map(displayThis)}
    </Stack>
  );
};
export default MyPokemon;
