import React from "react";
import { Redirect, Route } from "react-router-dom";

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const isAuth = restOfProps.isAuth;

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuth ? <Component {...props} /> : <Redirect to="/Home" />
      }
    />
  );
}

export default ProtectedRoute;
