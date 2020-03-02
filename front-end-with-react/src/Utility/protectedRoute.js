import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const ProtectedRoute = ({ userName, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      userName ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);
const mapStatetoProps = state => {
  return {
    userName: state.userReducer.username
  };
};

export default connect(mapStatetoProps, null)(ProtectedRoute);
