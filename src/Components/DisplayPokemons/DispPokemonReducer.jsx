export const InitialState = {
  artwork: '',
  elementType: [],
};

export const DispPokemonReducer = (state, action) => {
  switch (action.type) {
    case 'setArtwork':
      return {
        ...state,
        artwork: action.payload,
      };
    case 'setElementType':
      return {
        ...state,
        elementType: action.payload,
      };
  }
};
