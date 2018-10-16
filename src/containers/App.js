import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";

import { establishCurrentUser } from "../store/auth";

import { Header, Transition, FlashMessage, Content } from "./components";
import Routes from "../routes";

import "../styles/containers/App.scss";

class App extends Component {
  componentWillMount() {
    this.props.establishCurrentUser();
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
        <Content
          id="content"
          hasError={this.props.flashMessages.flashMessages.length > 0}
        >
          <Routes />
        </Content>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  transitions: state.transitions,
  flashMessages: state.flashMessages
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ establishCurrentUser }, dispatch);

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
