import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  GET_TOKEN,
  SET_TOKEN,
  UNSET_TOKEN,
  CHECK_TOKEN,
  setTokenAction,
  getTokenAction,
  unsetTokenAction,
  checkTokenAction
} from "../store/actions/Auth";

export const ProtectedContent = props => {
  return <React.Fragment>{props.children}</React.Fragment>;
};

export class Aux extends Component {
  state = {
    init: false,
    isAuthorized: false
  };

  isAuthorized = (nextProps, nextState) => {
    const session_data = nextProps.Auth.session_data;
    if (session_data && session_data.ok) {
      return true;
    }
    return false;
  };

  shouldComponentUpdate(nextProps, nextState) {
    const isAuthorized = this.isAuthorized(nextProps, nextState);
    if (isAuthorized) {
      nextState.isAuthorized = true;
      return true;
    }
    nextState.isAuthorized = false;
    return true;
  }

  componentWillMount() {}

  componentDidMount() {
    this.props.checkTokenAction();
  }

  render() {
    if (this.state.isAuthorized) {
      return <div>{this.props.children}</div>;
    }
    return <Redirect to={"/auth"} />;
  }
}

const mapDispatchToProps = dispatch => ({
  setTokenAction: sessionData => dispatch(setTokenAction(sessionData)),
  getTokenAction: code => dispatch(getTokenAction(code)),
  checkTokenAction: () => dispatch(checkTokenAction()),
  unsetTokenAction: () => dispatch(unsetTokenAction())
});

export const ConnectedAux = connect(
  state => state,
  mapDispatchToProps
)(Aux);

export const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest}>
      <ConnectedAux {...rest}>
        <Component {...rest} />
      </ConnectedAux>
    </Route>
  );
};

export default PrivateRoute;
