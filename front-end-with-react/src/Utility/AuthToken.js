import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080";
// "https://d3dqstghi7h8sb.cloudfront.net";

// "http://ec2-3-17-66-87.us-east-2.compute.amazonaws.com:8080";

// @FIXME: use redux store instead
class AuthToken {
  getBaseUrl() {
    return USER_API_BASE_URL;
  }

  authentication = {
    isAuthenticated: localStorage.getItem("userInfo")
  };

  login(credentials) {
    this.authentication.isAuthenticated = true;
    return axios.post(USER_API_BASE_URL + "/api/auth/login", credentials);
  }

  getUserInfo() {
    return JSON.parse(localStorage.getItem("userInfo"));
  }

  getAuthHeader() {
    return {
      headers: { Authorization: "Bearer " + this.getUserInfo().token }
    };
  }

  logOut() {
    localStorage.removeItem("userInfo");
    this.authentication.isAuthenticated = false;
  }

  getAuthenticationStatus() {
    return this.authentication.isAuthenticated;
  }
}

export default new AuthToken();
