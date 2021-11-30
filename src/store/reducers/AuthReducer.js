const initState = {
    user: {
      token: null,
    },
  };
  
  function AuthReducer(state = initState, action) {
    switch (action.type) {
      case "SET_USER": {
        return { ...state, user: action.payload };
      }
      case "UNSET_USER": {
        return { ...state, user: { token: null } };
      }
      default: {
        return state;
      }
    }
  }
  
  export default AuthReducer;
  