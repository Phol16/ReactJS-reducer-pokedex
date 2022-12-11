import './App.css';
import NavBar from './Components/NavBar';
import { Route, Routes } from 'react-router-dom';
import { PokemonNavBar } from './Components/PokemonNavBar';
import { PokemonProvider } from './Components/contexts/PokemonContext';
import { Suspense, lazy } from 'react';
const PokemonType = lazy(() => import('./Components/PokemonType'));
const MyPokemon = lazy(() => import('./Components/MyPokemon'));
const PokemonDetails = lazy(() => import('./Components/PokemonDetails'));

function App() {
  return (
    <PokemonProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<PokemonNavBar />}>
          <Route
            path="/:typeId"
            element={
              <Suspense fallback={<div>...Loading</div>}>
                <PokemonType />
              </Suspense>
            }
          />
          <Route
            path="/:typeId/:name"
            element={
              <Suspense fallback={<div>...Loading</div>}>
                <PokemonDetails />
              </Suspense>
            }
          />
        </Route>
        <Route
          path="/Mypokemon"
          element={
            <Suspense fallback={<div>...Loading</div>}>
              <MyPokemon />
            </Suspense>
          }
        />
      </Routes>
    </PokemonProvider>
  );
}

export default App;
