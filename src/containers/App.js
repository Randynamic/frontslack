import React from "react";
import "../styles/containers/App.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainPage from "../pages/MainPage";
import { DefaultLayout, AuthLayout } from "../components/UI/Layouts";
import { PrivateRoute } from "../hoc/PrivateRoute";
import { connect } from "react-redux";

const App = props => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={DefaultLayout} />
        <Route path="/auth" component={AuthLayout} />
        <PrivateRoute path="/main" component={MainPage} />
      </Switch>
    </Router>
  );
};

export default connect(state => state)(App);
