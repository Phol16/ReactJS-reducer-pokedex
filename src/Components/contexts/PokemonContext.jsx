import React, { useReducer } from 'react';
import { createContext, useContext } from 'react';
import { PokemonValue, MyPokemonReducer } from '../MyPokemon/MyPokemonReducer';

export const PokemonContext = createContext(PokemonValue);

export const PokemonProvider = ({ children }) => {
  const [state, dispatch] = useReducer(MyPokemonReducer, PokemonValue);
  const capture = (e) => {
    dispatch({
      type: 'CAPTURE',
      payload: e,
    });
  };
  const release = (e) => {
    dispatch({
      type: 'RELEASE',
      payload: e,
    });
  };
  const value = {
    capturedValue: state.capturedPokemon,
    capture,
    release,
  };
  return <PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>;
};

export const useThis = () => {
  const context = useContext(PokemonContext);
  return context;
};
