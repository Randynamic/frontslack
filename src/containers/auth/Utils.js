import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import { connect } from "react-redux";

import AuthService from "../../hoc/AuthService";
import {
  GET_TOKEN,
  SET_TOKEN,
  UNSET_TOKEN,
  CHECK_TOKEN,
  setTokenAction,
  getTokenAction,
  unsetTokenAction,
  checkTokenAction
} from "../../store/actions/Auth";

import qs from "query-string";

class _GetToken extends Component {
  state = {
    auth_code: null,
    session_data: null,
    getSession: false,
    setSession: false,
    resetCode: false
  };

  retrieveParams = cb => {
    const code = qs.parse(this.props.location.search).code;
    if (code) {
      cb(code).then(sessionData => {
        if (sessionData.ok) {
          this.props.setTokenAction(sessionData, sessionData => {
            this.setState({ session_data: sessionData });
          });
        } else {
          this.setState({ resetCode: true });
        }
      });
    }
  };

  getSessionToken = code => {
    const url = `${AuthService.base}/oauth.access?client_id=${
      AuthService.client_id
    }&client_secret=${AuthService.client_secret}&code=${code}&redirect_uri=${
      AuthService.redirectUrl
    }`;
    return fetch(url).then(results => {
      return results.json();
    });
  };

  shouldComponentUpdate(nextProps, nextState) {
    // console.log("[ shouldComponentUpdate ]", nextProps, nextState);
    console.log("[ shouldComponentUpdate ]", nextProps);
    console.log(
      "[ shouldComponentUpdate SESSION ]",
      nextProps.Auth.session_data
    );

    // if no auth code and no session data
    if (
      !nextProps.Auth ||
      !nextProps.Auth.session_data ||
      !nextProps.Auth.session_data.ok
    ) {
      nextState.resetCode = true;
    }

    // stored token is valid
    if (
      nextProps.Auth &&
      nextProps.Auth.session_data &&
      nextProps.Auth.session_data.ok
    ) {
      // proceed to requested render
      this.setState({
        session_data: nextProps.Auth.session_data
      });
      return true;
    }

    // retrieved code is invalid
    if (nextState.resetCode) {
      // redirect to get code
      window.location.href =
        "https://slack.com/oauth/authorize?client_id=265156972019.453766114196&scope=identity.basic";
      return false;
    }

    // if (
    //   nextState.session_data &&
    //   nextState.session_data.access_token &&
    //   !nextState.setSession
    // ) {
    nextProps.setTokenAction(nextState.session_data);
    nextState.setSession = true;
    console.log("dispatch setTokenAction", nextState.session_data);
    //   return false;
    // } else if (nextState.auth_code) {
    //   console.log("redirect to protected section", nextState.auth_code);
    //   return true;
    // } else if (nextState.resetCode) {
    //   // nextProps.checkTokenAction();
    //   console.log("redirect to oAuth", nextState.resetCode);
    //   window.location.href =
    //     "https://slack.com/oauth/authorize?client_id=265156972019.453766114196&scope=identity.basic";
    //   return false;
    // }
    return true;
  }

  componentDidUpdate() {
    // if (
    //   !this.state.auth_code &&
    //   !this.state.setSession &&
    //   !this.state.session_data
    // ) {
    //   this.setState({
    //     getSession: true
    //   });
    // }
  }

  componentDidMount() {
    console.log("asdadadadasd");
    this.props.checkTokenAction();
    if (!this.state.auth_code && !this.props.Auth.session_data) {
      this.retrieveParams(code => this.getSessionToken(code));
    }
  }

  render() {
    console.log(this);
    if (!this.state.session_data) {
      return (
        <div>
          <p>Get Token by code {this.state.auth_code}</p>
          <hr />
        </div>
      );
    } else if (this.state.session_data) {
      return <Redirect to={"/main"} />;
    }
  }
}

class _Validate extends Component {
  state = {
    authState: ""
  };

  componentDidMount() {
    if (
      this.props.Auth &&
      this.props.Auth.session_data &&
      this.props.Auth.session_data.ok
    ) {
      console.log("session data loaded");
      this.setState({ authState: "PROCEED" });
    } else if (
      this.props.Auth &&
      this.props.Auth.session_data &&
      !this.props.Auth.session_data.ok
    ) {
      console.log("session data is invalid");
      this.setState({ authState: "AUTH_FAILED" });
    } else if (this.props.Auth && !this.props.Auth.session_data) {
      console.log("session data missing");
      this.setState({
        authState: "GET_AUTH_CODE"
      });
    }
    console.log("end of didmount");
  }
  render() {
    switch (this.state.authState) {
      case "PROCEED":
        console.log(".......//////.//////", this);
      // return <Redirect to={"/auth/sign-in"} />;
      case "GET_AUTH_CODE":
        return <Redirect to={"/auth/sign-in"} />;
      case "AUTH_FAILED":
        return <Redirect to={"/auth/failed"} />;
      default:
        return <div>Validating Authorization...</div>;
    }
  }
}

class _Login extends Component {
  state = {
    redirectToReferrer: false,
    redirectToAppLogin: false,
    session_data: undefined
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.redirectToAppLogin) {
      window.location.href =
        "https://slack.com/oauth/authorize?client_id=265156972019.453766114196&scope=identity.basic";
      return false;
    }
    return true;
  }

  login = () => {
    this.setState(() => ({
      redirectToAppLogin: true
    }));
  };

  componentDidMount() {
    // console.dir(this.props.checkTokenAction());
    const session_data = this.props.checkTokenAction();
    console.log(".,,.,,,,,,,.,.", session_data);
    if (session_data && session_data.ok) {
      this.setState({
        session_data: session_data,
        redirectToAppLogin: false,
        redirectToReferrer: true
      });
    }
  }

  render() {
    console.log("render login", this.state, this.props);
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer } = this.state;
    if (redirectToReferrer === true) {
      return <Redirect to={from} />;
    } else if (this.state.session_data && this.state.session_data.ok) {
      return <Redirect to={"/main"} />;
    }
    return (
      <div>
        <p>You must log in to view the page</p>
        <button onClick={this.login}>Log in</button>
      </div>
    );
  }
}

export const Failed = props => (
  <div>
    <h3>Auth Failed</h3>
    <button onClick={() => timeOutRedirection(props.history)}>Retry</button>
  </div>
);

const mapDispatchToProps = dispatch => ({
  setTokenAction: sessionData => dispatch(setTokenAction(sessionData)),
  getTokenAction: code => dispatch(getTokenAction(code)),
  checkTokenAction: () => dispatch(checkTokenAction()),
  unsetTokenAction: () => dispatch(unsetTokenAction())
});

export const GetToken = connect(
  state => state,
  mapDispatchToProps
)(_GetToken);

export const Validate = connect(
  state => state,
  mapDispatchToProps
)(_Validate);

export const Login = connect(
  state => state,
  mapDispatchToProps
)(_Login);

const timeOutRedirection = history => {
  console.log(history);
  setTimeout(() => history.push("/"), 1000);
};
