const game = {
  myTeam: JSON.parse(localStorage.getItem("games"))?.myTeamId,
};
const gameReducer = (state = game, action) => {
  switch (action.type) {
    case "ADD_USER_GAME":
      return {
        ...state,
        userGame: action.userGame,
      };
    case "ADD_HOMME_TEAM":
      return {
        myTeam: action.userGame,
      };
    default:
      return state;
  }
};
export default gameReducer;
