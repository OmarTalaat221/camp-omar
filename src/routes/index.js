import React, { useState } from "react";
import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import AppLayout from "../App";

import configDB from "../data/customizer/config";
import PrivateRoute from "./private-route";

import Signin from "../auth/signin";
import Error400 from "../pages/errors/error400";
import Error404 from "../pages/errors/error404";
import Error500 from "../pages/errors/error500";

import Maintenance from "../pages/maintenance";

import Login from "../pages/authentication/login";
import Register from "../pages/authentication/register";
import Forgetpwd from "../pages/authentication/forgetpwd";

import Comingsoon from "../pages/comingSoon/comingsoon";
import ComingsoonVideo from "../pages/comingSoon/comingsoonVideo";
import ComingsoonImg from "../pages/comingSoon/comingsoonImg";

import { routes } from "./layouts-routes";
// import app from '../data/base';

const MainRoutes = () => {
  const [currentUser, setCurrentUser] = useState(false);
  useEffect(() => {
    // app.auth().onAuthStateChanged(setCurrentUser);
    const abortController = new AbortController();
    const color = localStorage.getItem("color");
    const layout = localStorage.getItem("layout_version") || configDB.data.color.layout_version;
    document.body.classList.add(layout);
    console.ignoredYellowBox = ["Warning: Each", "Warning: Failed"];
    console.disableYellowBox = true;
    document.getElementById("color").setAttribute("href", `${process.env.PUBLIC_URL}/assets/css/${color}.css`);

    return function cleanup() {
      abortController.abort();
    };
  }, []);

  return (
    <>
      <Routes>
        <Route exact path="/" element={<PrivateRoute />}>
          {routes.map(({ path, Component }, i) => (
            <Route element={<AppLayout />} key={i}>
              {currentUser !== null ? <Route exact path={`${process.env.PUBLIC_URL}`} element={<Navigate to={`${process.env.PUBLIC_URL}/dashboard/default`} />} /> : ""}
              <Route path={path} element={Component} />
            </Route>
          ))}
        </Route>
        <Route exact path={`${process.env.PUBLIC_URL}/login`} element={<Signin />} />
        <Route path={`${process.env.PUBLIC_URL}/pages/error-400`} element={<Error400 />}></Route>
        <Route path={`${process.env.PUBLIC_URL}/pages/error-404`} element={<Error404 />}></Route>
        <Route path={`${process.env.PUBLIC_URL}/pages/error-500`} element={<Error500 />}></Route>

        <Route path={`${process.env.PUBLIC_URL}/pages/maintenance`} element={<Maintenance />}></Route>

        <Route path={`${process.env.PUBLIC_URL}/pages/login`} element={<Login />}></Route>
        <Route path={`${process.env.PUBLIC_URL}/pages/register`} element={<Register />}></Route>
        <Route path={`${process.env.PUBLIC_URL}/pages/forget-password`} element={<Forgetpwd />}></Route>

        <Route path={`${process.env.PUBLIC_URL}/pages/comingsoon`} element={<Comingsoon />}></Route>
        <Route path={`${process.env.PUBLIC_URL}/pages/comingsoon-bg-image`} element={<ComingsoonImg />}></Route>
        <Route path={`${process.env.PUBLIC_URL}/pages/comingsoon-bg-video`} element={<ComingsoonVideo />}></Route>
      </Routes>
    </>
  );
};

export default MainRoutes;
