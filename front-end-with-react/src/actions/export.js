import React from "react";
import axios from "axios";
import Authtoken from "../Utility/AuthToken";

// export const calExport = () => async (dispatch) => {
//   const emptyBody = {};
//   await axios
//     .post(Authtoken.getBaseUrl() + "/api/public/get/game/json", emptyBody, {
//       headers: {
//         Authorization: "Bearer " + Authtoken.getUserInfo().token.split(" ")[1],
//       },
//     })
//     .then((res) => {
//       console.log(res.data);
//     });
//   dispatch({ type: "GET_GAMES", payload: res.data });
// };

export const calExport = () => async (dispatch) => {
  const emptyBody = {};

  const response = await axios.post(
    Authtoken.getBaseUrl() + "/api/public/get/game/json",
    emptyBody,
    {
      headers: {
        Authorization: Authtoken.getUserInfo().token,
      },
    }
  );
  // .then((res) => {
  //   console.log("export", res);
  //   console.log("export", Authtoken.getUserInfo().token);
  // });

  console.log("response", response.data.result);

  dispatch({
    type: "GET_GAMES",
    payload: response.data.result,
  });
};
