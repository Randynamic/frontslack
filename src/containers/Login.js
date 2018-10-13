import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import AuthService from "../hoc/AuthService";

class Login extends Component {
  state = {
    redirectToReferrer: false
  };

  shouldComponentUpdate() {
    if (AuthService.redirectToAppLogin) {
      window.location.href =
        "https://slack.com/oauth/authorize?client_id=265156972019.453766114196&scope=identity.basic";
      return false;
    }
    return true;
  }

  login = () => {
    AuthService.authenticate()
      .then(response => {
        console.log("got user session", response);
        this.setState(() => ({
          redirectToReferrer: true
        }));
      })
      .catch(error => {
        switch (error.type) {
          case "no_auth_code":
            this.setState(() => ({
              redirectToReferrer: false
            }));
            break;
          default:
            break;
        }
      });
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer } = this.state;
    if (redirectToReferrer === true) {
      return <Redirect to={from} />;
    }

    return (
      <div>
        <p>You must log in to view the page</p>
        <button onClick={this.login}>Log in</button>
      </div>
    );
  }
}

export default Login;
