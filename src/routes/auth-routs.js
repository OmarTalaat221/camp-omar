import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Signin from "./auth/signin";
import Error400 from "./pages/errors/error400";
import Error404 from "./pages/errors/error404";
import Error500 from "./pages/errors/error500";

import Maintenance from "./pages/maintenance";

import Login from "./pages/authentication/login";
import Register from "./pages/authentication/register";
import Forgetpwd from "./pages/authentication/forgetpwd";

import Comingsoon from "./pages/comingSoon/comingsoon";
import ComingsoonVideo from "./pages/comingSoon/comingsoonVideo";
import ComingsoonImg from "./pages/comingSoon/comingsoonImg";

const AuthRoutes = () => {
    return (
        <Routes>
            <Route path={`${process.env.PUBLIC_URL}/login`} component={Signin} />
            <Route
                path={`${process.env.PUBLIC_URL}/pages/error-400`}
                component={Error400}
            ></Route>
            <Route
                path={`${process.env.PUBLIC_URL}/pages/error-404`}
                component={Error404}
            ></Route>
            <Route
                path={`${process.env.PUBLIC_URL}/pages/error-500`}
                component={Error500}
            ></Route>

            <Route
                path={`${process.env.PUBLIC_URL}/pages/maintenance`}
                component={Maintenance}
            ></Route>

            <Route
                path={`${process.env.PUBLIC_URL}/pages/login`}
                component={Login}
            ></Route>
            <Route
                path={`${process.env.PUBLIC_URL}/pages/register`}
                component={Register}
            ></Route>
            <Route
                path={`${process.env.PUBLIC_URL}/pages/forget-password`}
                component={Forgetpwd}
            ></Route>

            <Route
                path={`${process.env.PUBLIC_URL}/pages/comingsoon`}
                component={Comingsoon}
            ></Route>
            <Route
                path={`${process.env.PUBLIC_URL}/pages/comingsoon-bg-image`}
                component={ComingsoonImg}
            ></Route>
            <Route
                path={`${process.env.PUBLIC_URL}/pages/comingsoon-bg-video`}
                component={ComingsoonVideo}
            ></Route>
        </Routes>
    )
}

export default AuthRoutes;