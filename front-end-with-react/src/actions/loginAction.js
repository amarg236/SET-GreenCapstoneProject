import axios from "axios";
import Authtoken from "../Utility/AuthToken";
import history from "../Utility/history";

export const loginAction = (username, password) => {
  const allTeam = {
    team: [],
  };

  let storeTeam = [];
  return (dispatch) => {
    axios
      .post(Authtoken.getBaseUrl() + "/api/auth/login", {
        username,
        password,
      })
      .then((res) => {
        if (res.data.success) {
          const saveDatainFormat = {
            username,
            token: res.data.token,
            role: res.data.roles[0].authority,
          };
          localStorage.setItem("userInfo", JSON.stringify(saveDatainFormat));
          //Following below is the code for adding school and district iassociated with user in redux state

          axios
            .post(Authtoken.getBaseUrl() + "/api/auth/find/email", {
              data: username,
            })
            .then((res) => {
              if (res.data.httpStatusCode === 202) {
                console.log(saveDatainFormat.role);
                if (saveDatainFormat.role === "USER") {
                  dispatch({
                    type: "LOGIN_ACTION",
                    username,
                    role: saveDatainFormat.role,
                    token:
                      "Bearer " + Authtoken.getUserInfo().token.split(" ")[1],
                  });
                  dispatch({
                    type: "SCHOOL_AND_DISTRICT",
                    school: res.data.result.roles[0].school,
                    district: res.data.result.roles[0].school.district,
                  });
                  console.log(res.data.result.roles[0].school.id);

                  // i am fetchign the team that belongs to this school

                  const currentSchool = {
                    id: res.data.result.roles[0].school.id,
                  };
                  axios
                    .post(
                      Authtoken.getBaseUrl() + "/api/team/get/bySchool",
                      currentSchool,
                      {
                        headers: {
                          Authorization:
                            "Bearer " +
                            Authtoken.getUserInfo().token.split(" ")[1],
                        },
                      }
                    )
                    .then((res) => {
                      console.log("current school teams");
                      console.log(res.data.result);
                      console.log("length here");
                      console.log(res.data.result.length);
                      const teamResult = {
                        team: [],
                      };
                      const test = {
                        data: [],
                      };
                      for (
                        let index = 0;
                        index < res.data.result.length;
                        index++
                      ) {
                        console.log("printing uder the loop");
                        console.log(res.data.result[index].id);
                        const emptyBody = {
                          id: res.data.result[index].id,
                        };
                        axios
                          .post(
                            Authtoken.getBaseUrl() +
                              "/api/game/get/ByTeamId/away/notAccepted",
                            emptyBody,
                            {
                              headers: {
                                Authorization:
                                  "Bearer " +
                                  Authtoken.getUserInfo().token.split(" ")[1],
                              },
                            }
                          )
                          .then((res) => {
                            teamResult.team = [
                              ...teamResult.team,
                              res.data.result,
                            ];
                            test.data.push(res.data.result);
                            console.log(storeTeam);
                            // storeTeam = [...storeTeam, res.data.result];
                          });
                      }
                      console.log("RESULT>>");

                      console.log(teamResult);

                      // this.setState({ awaySchoolTeamList: res.data.result });
                    });

                  const homeSchoolDetails = {
                    currenthomeSchool: res.data.result.roles[0].school,
                    currenthomeDistrict:
                      res.data.result.roles[0].school.district,
                  };
                  localStorage.setItem(
                    "homeSchool",
                    JSON.stringify(homeSchoolDetails)
                  );
                } else {
                  console.log(saveDatainFormat.role);

                  dispatch({
                    type: "LOGIN_ACTION",
                    username,
                    role: saveDatainFormat.role,
                    token:
                      "Bearer " + Authtoken.getUserInfo().token.split(" ")[1],
                  });
                }
                history.push("./dashboard");

                // res.data.result.map(getRoles => console.log(getRoles));
              }
            });
        }
      })
      .catch((e) => {
        dispatch({
          type: "LOGIN_ERROR",
          message: "Sorry! Wrong password or username",
        });
      });
  };
  console.log(this.allTeam);
};

export const logoutAction = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch({
      type: "LOG_OFF",
    });
  };
};
