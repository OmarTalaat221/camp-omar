import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
// import app from "../data/base";

const PrivateRoute = () => {
  const [currentUser, setCurrentUser] = useState(false);
  // eslint-disable-next-line

  const abortController = new AbortController();

  useEffect(() => {
    const color = localStorage.getItem("color");
    document.getElementById("color").setAttribute("href", `${process.env.PUBLIC_URL}/assets/css/${color}.css`);
    // app.auth().onAuthStateChanged(setCurrentUser);
    console.ignoredYellowBox = ["Warning: Each", "Warning: Failed"];
    console.disableYellowBox = true;
    return function cleanup() {
      abortController.abort();
    };
  }, [abortController]);

  return currentUser !== null ? <Outlet /> : <Navigate to={`${process.env.PUBLIC_URL}/login`} />;
};

export default PrivateRoute;
