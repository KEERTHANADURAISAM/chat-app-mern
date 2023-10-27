export const initialState = {
    user: null, // one object always null login pana values store ahum
  };
  
  export const actionTypes = {
    SET_USER: "SET_USER",
  };
  
  const reducer = (state, action) => {
    switch (action.type) { // Use action.type, not action.types
      case actionTypes.SET_USER:
        return {
          ...state, // Spread the existing state to avoid overwriting other properties
          user: action.user,
        };
      default:
        return state;
    }
  };
  
  export default reducer;
  