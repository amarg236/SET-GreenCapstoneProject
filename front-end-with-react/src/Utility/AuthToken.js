import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080";
// "http://ec2-3-17-66-87.us-east-2.compute.amazonaws.com:8080";

class AuthToken {
  authentication = {
    isAuthenticated: false
  };

  login(credentials) {
    this.authentication.isAuthenticated = true;
    return axios.post(USER_API_BASE_URL + "/api/auth/login", credentials);
  }

  getUserInfo() {
    return JSON.parse(localStorage.getItem("userInfo"));
  }

  getAuthHeader() {
    return { headers: { Authorization: "Bearer " + this.getUserInfo().token } };
  }

  logOut() {
    // localStorage.clear();
    localStorage.removeItem("userInfo");
    this.authentication.isAuthenticated = false;
    // return axios.get(USER_API_BASE_URL);
    // return axios.post(USER_API_BASE_URL + "logout", {}, this.getAuthHeader());
  }

  getAuthenticationStatus() {
    return this.authentication.isAuthenticated;
  }
}

export default new AuthToken();
