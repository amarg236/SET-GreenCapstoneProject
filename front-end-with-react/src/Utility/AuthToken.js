import axios from "axios";

const USER_API_BASE_URL =
  "http://ec2-3-17-66-87.us-east-2.compute.amazonaws.com:8080";

const authentication = {
  isAuthenticated: false
};

class AuthToken {
  login(credentials) {
    authentication.isAuthenticated = true;
    return axios.post(USER_API_BASE_URL + "/api/auth/login", credentials);
  }

  getUserInfo() {
    return JSON.parse(localStorage.getItem("userInfo"));
  }

  getAuthHeader() {
    return { headers: { Authorization: "Bearer " + this.getUserInfo().token } };
  }

  logOut() {
    localStorage.removeItem("userInfo");
    return axios.post(USER_API_BASE_URL + "logout", {}, this.getAuthHeader());
  }

  getAuthenticationStatus() {
    return authentication.isAuthenticated;
  }
}

export default new AuthToken();
