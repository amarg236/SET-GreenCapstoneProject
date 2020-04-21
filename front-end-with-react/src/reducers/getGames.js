const initialState = {
  two: "",
};

const getGames = (state = initialState, action) => {
  switch (action.type) {
    case "GET_GAMES":
      return { ...state, two: action.payload };
    default:
      return state;
  }
};

export default getGames;
