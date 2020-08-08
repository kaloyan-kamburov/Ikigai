import React from "react";
import "./styles/main.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import GoodAt from "./pages/Wizard/goodAt";
import Love from "./pages/Wizard/love";
import Needs from "./pages/Wizard/needs";
import PaidFor from "./pages/Wizard/paidFor";
import IkigaiChart from "./pages/Wizard/chart";

const App = () => (
  <Router basename="/">
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/what-are-you-good-at" component={GoodAt} exact />
      <Route path="/what-you-love" component={Love} exact />
      <Route path="/what-the-world-needs" component={Needs} exact />
      <Route path="/what-are-you-paid-for" component={PaidFor} exact />
      <Route path="/chart" component={IkigaiChart} exact />
    </Switch>
  </Router>
);

export default App;
