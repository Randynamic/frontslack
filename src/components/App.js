import React, { Component } from "react";
import "../styles/components/App.scss";
import {
  Link,
  BrowserRouter as Router,
  Route,
  Redirect
} from "react-router-dom";
import PrivateRoute from "../hoc/PrivateRoute";

import Login from "./Login";
import AuthButton from "../containers/AuthButton";

import LandingPage from "../pages/LandingPage";
import MainPage from "../pages/MainPage";

import qs from "query-string";

const AuthFailed = () => {
  return <div>Authentication Failed</div>;
};

class App extends Component {
  state = {
    data: null
  };

  render() {
    return (
      <Router>
        <div>
          <AuthButton />
          <ul>
            <li>
              <Link to="/">Landing Page</Link>
            </li>
            <li>
              <Link to="/main">Protected Page</Link>
            </li>
          </ul>
          <Route path="/" component={LandingPage} />
          <Route path="/login" component={Login} />
          <Route path="/auth/failed" component={AuthFailed} />
          <PrivateRoute path="/main" component={MainPage} />
        </div>
      </Router>
    );
  }
}

export default App;
