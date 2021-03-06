const initialState = {
  //following commented line of code can also be used as alternative
  // ...JSON.parse(localStorage.getItem("userInfo"))
  sidebarCollapased: false,
  username: JSON.parse(localStorage.getItem("userInfo"))?.username,
  token: JSON.parse(localStorage.getItem("userInfo"))?.token.split(" ")[1],
  message: "",
  role: JSON.parse(localStorage.getItem("userInfo"))?.role,
  mySchool: JSON.parse(localStorage.getItem("homeSchool"))?.currenthomeSchool,
  schoolDistrict: JSON.parse(localStorage.getItem("homeSchool"))
    ?.currenthomeDistrict,
  createGameObj: [],

  // mySchool: [],
  // schoolDistrict: []
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_ACTION":
      return {
        username: action.username,
        message: action.message,
        role: action.role,
        token: action.token,
      };

    case "PASS_GAME":
      return {
        ...state,
        createGameObj: action.gObject,
      };
    case "LOGIN_ERROR":
      return {
        message: action.message,
      };
    case "LOG_OFF":
      return {
        username: "",
        token: "",
        role: "",
      };
    case "SIDEBAR_TOGGLE":
      return {
        ...state,
        sidebarCollapased: !state.sidebarCollapased,
      };
    case "SCHOOL_AND_DISTRICT":
      return {
        ...state,
        mySchool: action.school,
        schoolDistrict: action.district,
      };
    default:
      return state;
  }
};

export default userReducer;
