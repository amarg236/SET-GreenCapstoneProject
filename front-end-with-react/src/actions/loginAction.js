import axios from "axios";
import Authtoken from "../Utility/AuthToken";
import history from "../Utility/history";

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
          //Following below is the code for adding school and district iassociated with user in redux state

          axios
            .post(Authtoken.getBaseUrl() + "/api/auth/find/email", {
              data: username
            })
            .then(res => {
              if (res.data.httpStatusCode === 202) {
                console.log(saveDatainFormat.role);
                if (saveDatainFormat.role === "USER") {
                  dispatch({
                    type: "LOGIN_ACTION",
                    username,
                    role: saveDatainFormat.role
                  });
                  dispatch({
                    type: "SCHOOL_AND_DISTRICT",
                    school: res.data.result.roles[0].school,
                    district: res.data.result.roles[0].school.district
                  });
                } else {
                  dispatch({
                    type: "LOGIN_ACTION",
                    username,
                    role: saveDatainFormat.role
                  });
                }

                // res.data.result.map(getRoles => console.log(getRoles));
              }
            });

          history.push("./dashboard");
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
