const initState = {
  State: {
    Drawer: true,
  },
};

function DrawerReducer(state = initState, action) {
  switch (action.type) {
    case "SET_STATE": {
      return { ...state, State: { Drawer: true } };
    }
    case "UNSETDRAWER_STATE": {
      return { ...state, State: { Drawer: false } };
    }
    default: {
      return state;
    }
  }
}

export default DrawerReducer;
