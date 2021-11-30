import React, { Fragment } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, loading, user } = useSelector((state) => state.auth);
  return (
    <Fragment>
      <Routes>
        {loading === false && (
          <Route
            {...rest}
            render={(props) => {
              if (isAuthenticated === false) {
                return <Navigate to={`/login`} />;
              }
              return <Component {...props} />;
            }}
          />
        )}
      </Routes>
    </Fragment>
  );
};

export default ProtectedRoute;
