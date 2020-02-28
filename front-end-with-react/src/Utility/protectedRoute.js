import React from "react";
import { Route, Redirect } from "react-router-dom";
import Authtoken from "../Utility/AuthToken";

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      Authtoken.getAuthenticationStatus() ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);
export default ProtectedRoute;
