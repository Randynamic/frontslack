import React from "react";
import "../styles/containers/App.scss";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from "../hoc/PrivateRoute";

import Login from "./____/Login";

import Layout from "../components/UI/Layout";
import MainPage from "../pages/MainPage";

import { getToken, AuthFailed } from "./____/Auth";

import { connect } from "react-redux";

const App = props => {
  return (
    <Router>
      <React.Fragment>
        <Route path="/" component={Layout} />
        <Route path="/login" component={Login} />
        <Route path="/auth/getToken" component={getToken} />
        <Route path="/auth/failed" component={AuthFailed} />
        <PrivateRoute path="/main" component={MainPage} />
      </React.Fragment>
    </Router>
  );
};

export default connect(state => state)(App);
