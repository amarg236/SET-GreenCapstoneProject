import { combineReducers } from "redux";
import userReducer from "./userReducer";
import getGames from "./getGames";

export default combineReducers({
  userReducer: userReducer,
  getGames: getGames,
});
