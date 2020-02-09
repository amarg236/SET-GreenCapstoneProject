import React from "react";
import { Route, Redirect } from "react-router-dom";
// import Auth, { useAuth } from "./auth";
import Authtoken from "../Utility/AuthToken";

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      Authtoken.getAuthenticationStatus ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);
export default ProtectedRoute;

//   const isAuthenticated = useAuth();

//   return (
//     <Route
//       {...rest}
//       render={props =>
//         isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
//       }
//     />
//   );
// }
// export default ProtectedRoute;
