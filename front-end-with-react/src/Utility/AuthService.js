import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080";

class AuthService {
  login(credentials) {
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
}

export default new AuthService();
