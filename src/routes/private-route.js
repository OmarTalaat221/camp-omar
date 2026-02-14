import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

const PrivateRoute = () => {
  useEffect(() => {
    const color = localStorage.getItem("color");
    if (color) {
      document
        .getElementById("color")
        ?.setAttribute(
          "href",
          `${process.env.PUBLIC_URL}/assets/css/${color}.css`
        );
    }
  }, []);

  return <Outlet />;
};

export default PrivateRoute;
