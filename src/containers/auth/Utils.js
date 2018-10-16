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
    request_token: undefined
  };

  componentDidMount() {
    const params = qs.parse(this.props.location.search);
    if (params && params.code) {
      AuthService.get_token(params.code, session_data => {
        if (session_data.ok) {
          this.props.setTokenAction(session_data);
          this.setState({ auth_code: params.code });
          AuthService.redirect_main();
        } else {
          AuthService.redirect_failed();
        }
      });
    } else {
      AuthService.redirect_signin();
    }
  }
  render() {
    return (
      <div>
        <p>Get Token by code {this.state.auth_code}</p>
        <hr />
      </div>
    );
  }
}

class _Validate extends Component {
  state = {
    check: false
  };
  componentDidMount() {
    this.props.checkTokenAction();
    this.setState({ check: true });
  }
  render() {
    if (this.state.check) {
      console.log("check for token", this.props.Auth.session_data);
    }
    return <div>Validating Authorization...</div>;
  }
}

class _Login extends Component {
  render() {
    return (
      <div>
        <p>You must log in to view the page</p>
        <button onClick={AuthService.redirect_signin}>signIn</button>
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
