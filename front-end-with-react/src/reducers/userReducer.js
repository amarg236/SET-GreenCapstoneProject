const initialState = {
  //following commented line of code can also be used as alternative
  // ...JSON.parse(localStorage.getItem("userInfo"))
  username: JSON.parse(localStorage.getItem("userInfo"))?.username,
  token: JSON.parse(localStorage.getItem("userInfo"))?.token.split(" ")[1],
  message: "",
  role: JSON.parse(localStorage.getItem("userInfo"))?.role
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_ACTION":
      return {
        username: action.username,
        message: action.message,
        role: action.role
      };
    case "LOGIN_ERROR":
      return {
        message: action.message
      };
    case "LOG_OFF":
      return {
        username: "",
        token: "",
        role: ""
      };
    default:
      return state;
  }
};

export default userReducer;
