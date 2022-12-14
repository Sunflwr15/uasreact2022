const initialState = {
    produkId: ''
}

export const addToProcess = (state = intialState, action) => {
    if (action.type === "login") {
      return {
        ...state,
        produkId: action.produkId,
      };
    }
  
  
    return state;
  };