import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";

import { newError, newWarning, clearMessages } from "../../store/flashMessages";

import Page from "../../components/page";

export class ErrorPage extends Component {
  componentDidMount() {
    this.props.newError({ id: 0, message: "NEW ERROR", type: "error" });
    this.props.newWarning({ id: 1, message: "NEW WARNING", type: "warning" });
  }
  componentWillUnmount() {
    this.props.clearMessages();
  }
  render() {
    return (
      <Page
        id="not-found"
        title="Not Found"
        description="This is embarrassing."
        noCrawl
      >
        <p>Super embarrassing.</p>
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ newError, newWarning, clearMessages }, dispatch);

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ErrorPage)
);
