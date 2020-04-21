import history from "../Utility/history";

export const toggleAction = () => {
  return dispatch => {
    dispatch({
      type: "SIDEBAR_TOGGLE"
    });
  };
};
