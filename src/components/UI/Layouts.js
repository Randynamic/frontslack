import React from "react";
import { Route, Switch } from "react-router-dom";
import { LandingPage } from "../../pages/LandingPage";
import { LoginPage } from "../../pages/LoginPage";
import { Validate, GetToken, Login, Failed } from "../../containers/auth/Utils";

export const DefaultLayout = props => {
  return <LandingPage />;
};

export const AuthLayout = props => {
  return (
    <LoginPage>
      <Switch>
        <Route path="/auth" exact component={Validate} {...props} />
        <Route path="/auth/sign-in" component={Login} {...props} />
        <Route path="/auth/getToken" component={GetToken} {...props} />
        <Route path="/auth/failed" component={Failed} {...props} />
      </Switch>
    </LoginPage>
  );
};
