import React from "react";
import { Route, Redirect } from "react-router-dom";
import Auth, { useAuth } from "./auth";

function ProtectedRoute({ component: Component, ...rest }) {
  const isAuthenticated = useAuth();

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}
export default ProtectedRoute;
