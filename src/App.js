import React, { useEffect, useState, useContext } from "react";
import "./styles/main.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import GoodAt from "./pages/Wizard/goodAt";
import Love from "./pages/Wizard/love";
import Needs from "./pages/Wizard/needs";
import PaidFor from "./pages/Wizard/paidFor";
import Congratulations from "./pages/Wizard/congratulations";
import IkigaiChart from "./pages/Wizard/chart";

import { UserProvider, UserContext } from "./context";
import axios from "./utils/api";
import Loader from "./components/Loader";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const App = () => {
  const [userDetails, setUserDetails] = useContext(UserContext);
  const [appLoaded, setAppLoaded] = useState(false);
  useEffect(() => {
    const ikiSettings = localStorage.getItem("ikigai");
    if (!ikiSettings) {
      localStorage.setItem("ikigai", JSON.stringify({}));
    }
    // axios({
    //   url: "logged/",
    //   method: "get",
    // })
    //   .then(({ data }) => {
    //     setUserDetails(data);
    //     localStorage.setItem("ikigai", JSON.stringify(data.ikigai));
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   })
    //   .finally(() => setAppLoaded(true));
    setAppLoaded(true);
  }, []);
  return (
    <>
      {!appLoaded ? (
        <Loader dark />
      ) : (
        <div className="app-wrapper">
          <Router basename="/">
            <Header userState={userDetails} />
            <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/what-you-love" component={Love} exact />
              <Route path="/what-the-world-needs" component={Needs} exact />
              <Route path="/what-are-you-good-at" component={GoodAt} exact />
              <Route path="/what-are-you-paid-for" component={PaidFor} exact />
              <Route
                path="/congratulations"
                component={Congratulations}
                exact
              />
              {/* <Route path="/chart" component={IkigaiChart} exact /> */}
              <Route component={Home} />
            </Switch>
            <Footer />
          </Router>
        </div>
      )}
    </>
  );
};

export default App;
