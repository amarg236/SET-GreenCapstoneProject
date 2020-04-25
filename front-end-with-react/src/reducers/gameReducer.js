const game = {
  userGame: localStorage.getItem("games"),
};
const gameReducer = (state = game, action) => {
  switch (action.type) {
    case "ADD_USER_GAME":
      return {
        ...state,
        userGame: action.userGame,
      };
    default:
      return state;
  }
};
export default gameReducer;
