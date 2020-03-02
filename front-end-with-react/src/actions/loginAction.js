import axios from "axios";
import Authtoken from "../Utility/AuthToken";

export const loginAction = (username, password) => {
  return dispatch => {
    axios
      .post(Authtoken.getBaseUrl() + "/api/auth/login", {
        username,
        password
      })
      .then(res => {
        if (res.data.success) {
          const saveDatainFormat = {
            username,
            token: res.data.token,
            role: res.data.roles[0].authority
          };
          localStorage.setItem("userInfo", JSON.stringify(saveDatainFormat));
          dispatch({
            type: "LOGIN_ACTION",
            username,
            role: saveDatainFormat.role
          });
        }
      })
      .catch(e => {
        dispatch({
          type: "LOGIN_ERROR",
          message: "Sorry! Wrong password or username"
        });
      });
  };
};

export const logoutAction = () => {
  return dispatch => {
    localStorage.clear();
    dispatch({
      type: "LOG_OFF"
    });
  };
};
