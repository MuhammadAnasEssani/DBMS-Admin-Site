function setDrawerState() {
  return {
    type: "SET_STATE",
    // payload: State,
  };
}

function unSetDrawerState() {
  return {
    type: "UNSETDRAWER_STATE",
  };
}

export { setDrawerState, unSetDrawerState };
