// import axios from "axios";
// import Authtoken from "../Utility/AuthToken";

// export const addGames = token => {
//   return dispatch => {
//     const emptyBody = {};
//     axios
//       .post(Authtoken.getBaseUrl() + "/api/game/get/all", emptyBody, {
//         headers: {
//           Authorization: "Bearer " + token.split(" ")[1]
//         }
//       })
//       .then(res => {
//         if (res.data.success) {
//           console.log(res.data);
//           //   dispatch({
//           //     type: "LOGIN_ACTION",
//           //     username,
//           //     role: saveDatainFormat.role
//           //   });
//         }
//       })
//       .catch(e => {
//         console.log(e);
//         console.log(token);
//         console.log(token.split(" ")[1]);
//         // dispatch({
//         //   type: "LOGIN_ERROR",
//         //   message: "Sorry! Wrong password or username"
//         // });
//       });
//   };
// };
