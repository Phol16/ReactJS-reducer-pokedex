export const InitialValue = {
  types: [],
  artwork: '',
  moves: [],
  disable: false,
};
export const PokeDetailsReducer = (state, action) => {
  switch (action.type) {
    case 'setTypes':
      return {
        ...state,
        types: action.payload,
      };
    case 'setArtwork':
      return {
        ...state,
        artwork: action.payload,
      };
    case 'setMoves':
      return {
        ...state,
        moves: action.payload,
      };
    case 'setDisable':
      return {
        ...state,
        disable: action.payload,
      };
    default:
      return state;
  }
};
