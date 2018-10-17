import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";
import { authenticateSession, checkSession } from "../store/auth";

import Routes from "../routes";

import "../styles/containers/App.scss";

class App extends Component {
  componentWillMount() {
    this.props.checkSession();
  }
  render() {
    return <Routes />;
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  transitions: state.transitions,
  flash: state.flash
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ authenticateSession, checkSession }, dispatch);

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
