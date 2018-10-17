import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";
import qs from "query-string";
import { authenticateSession } from "../store/auth";

import { Header, Transition, FlashMessage, Content } from "./components";
import Routes from "../routes";

import "../styles/containers/App.scss";

class App extends Component {
  componentWillMount() {
    const params = qs.parse(this.props.location.search);
    console.log("[ componentWillMount ]", params);
    this.props.authenticateSession(params.code);
  }

  render() {
    return (
      <div id="app">
        <FlashMessage {...this.props} />
        <Transition
          {...this.props}
          isLoading={this.props.transitions.isLoading || false}
        />
        <Header
          isAuthenticated={this.props.isAuthenticated}
          current={this.props.location.pathname}
        />
        <Content id="content" hasError={this.props.flash.messages.length > 0}>
          <Routes />
        </Content>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  transitions: state.transitions,
  flash: state.flash
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ authenticateSession }, dispatch);

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
