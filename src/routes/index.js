import React from "react";
import { Route, Switch } from "react-router-dom";
import AuthenticatedRoute from "../components/AuthenticatedRoute";
import UnauthenticatedRoute from "../components/UnauthenticatedRoute";
import Loadable from "react-loadable";

import NotFound from "./not-found";

const Homepage = Loadable({
  loader: () => import(/* webpackChunkName: "homepage" */ "./homepage"),
  loading: () => null,
  modules: ["homepage"]
});

const About = Loadable({
  loader: () => import(/* webpackChunkName: "about" */ "./about"),
  loading: () => null,
  modules: ["about"]
});

const Dashboard = Loadable({
  loader: () => import(/* webpackChunkName: "dashboard" */ "./dashboard"),
  loading: () => null,
  modules: ["dashboard"]
});

const Login = Loadable({
  loader: () => import(/* webpackChunkName: "login" */ "./login"),
  loading: () => null,
  modules: ["login"]
});

const Logout = Loadable({
  loader: () => import(/* webpackChunkName: "logout" */ "./logout"),
  loading: () => null,
  modules: ["logout"]
});

const GetToken = Loadable({
  loader: () => import(/* webpackChunkName: "auth" */ "./login/getToken"),
  loading: () => null,
  modules: ["auth"]
});

export default () => (
  <Switch>
    <Route exact path="/" component={Homepage} />
    <Route exact path="/error" component={NotFound} />
    <Route exact path="/about" component={About} />
    <AuthenticatedRoute exact path="/dashboard" component={Dashboard} />
    <UnauthenticatedRoute exact path="/login" component={Login} />
    <UnauthenticatedRoute exact path="/auth/getToken" component={GetToken} />
    <AuthenticatedRoute exact path="/logout" component={Logout} />
    <Route component={NotFound} />
  </Switch>
);
