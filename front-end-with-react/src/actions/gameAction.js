import axios from "axios";
import Authtoken from "../Utility/AuthToken";

export const gameAction = (game) => {
  return (dispatch) => {
    dispatch({
      type: "ADD_USER_GAME",
      userGame: game,
    });
    console.log(game);
  };
};
