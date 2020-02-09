// import axios from "axios";

// const USER_API_BASE_URL =
//   "http://ec2-3-17-66-87.us-east-2.compute.amazonaws.com:8080";

// class Auth {
//   constructor() {
//     this.authenticated = false;
//   }
//   login(cb) {
//     // axios.post(USER_API_BASE_URL + "/api/auth/login", credentials);
//     // this.authenticated = true;
//     cb();
//     // return null;
//   }

//   logout(cb) {
//     this.authenticated = false;
//     cb();
//   }

//   isAuthenticated() {
//     return this.authenticated;
//   }
// }

// export default new Auth();

import { createContext, useContext } from "react";

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}
