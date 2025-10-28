import React from "react";
import './assets/test/test/index.css';
import "./index.scss";
import * as serviceWorker from "./serviceWorker";
import store from "./store/index";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import MainRoutes from "./routes";
import { createRoot } from "react-dom/client";
import Certification from "./component/common/Certeficate/Certification";
import Login from "./camp-app/camp-pages/Login/Login";

const Root = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <MainRoutes />
        </BrowserRouter>
      </Provider>
    </div>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<Root />);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
