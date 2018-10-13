import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { LandingPage } from "../../pages/LandingPage";
import Login from "../../containers/Login";
import MainPage from "../../pages/MainPage";
import PrivateRoute from "../../hoc/PrivateRoute";
const Layout = props => {
  return (
    <LandingPage>
      <Switch>
        <Route path="/login" component={Login} />
        <PrivateRoute path="/main" component={MainPage} />
      </Switch>
    </LandingPage>
  );
};

export default Layout;
