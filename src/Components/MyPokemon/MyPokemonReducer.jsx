export const PokemonValue = {
  capturedPokemon: [],
};
export const MyPokemonReducer = (state, action) => {
  switch (action.type) {
    case 'CAPTURE':
      return {
        ...state,
        capturedPokemon: [...state.capturedPokemon, action.payload],
      };
    case 'RELEASE':
      const index = state.capturedPokemon.indexOf(action.payload);
      if (index === -1) {
        return {
          ...state,
        };
      }
      state.capturedPokemon.splice(index, 1);
      return {
        ...state,
      };
    default:
      throw new Error(`No care for type: ${action.type}`);
  }
};
