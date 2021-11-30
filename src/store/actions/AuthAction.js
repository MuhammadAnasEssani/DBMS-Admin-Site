function setUser(user) {
    return {
      type: "SET_USER",
      payload: user,
    };
  }
  
  function unSetUser() {
    return {
      type: "UNSET_USER",
    };
  }
  
  export { setUser, unSetUser };
  