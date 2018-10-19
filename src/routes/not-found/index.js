import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router";
import qs from "query-string";

import { newError, newWarning, clearMessages } from "../../store/flash";

import Page from "../../components/Page";

export class ErrorPage extends Component {
  componentDidMount() {
    const params = qs.parse(this.props.location.search);
    this.props.newError({ id: 0, message: params.type, type: "error" });
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
