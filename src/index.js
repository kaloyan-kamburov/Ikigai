import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./fonts/Casta-Thin.otf";
import "./fonts/IBMPlexSans-Bold.otf";
import "./fonts/IBMPlexSans-Light.otf";
import "./fonts/IBMPlexSans-Medium.otf";
import "./fonts/IBMPlexSans-Regular.otf";
import "./fonts/IBMPlexSans-SemiBold.otf";
import "./fonts/IBMPlexSans-Text.otf";
import "./fonts/IBMPlexSans-Thin.otf";

import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { UserProvider } from "./context";

ReactDOM.render(
  // <React.StrictMode>
  <UserProvider>
    <App />
  </UserProvider>,
  // </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
