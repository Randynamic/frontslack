import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Page from "../../components/page";

import { authenticateSession } from "../../store/auth";

const Login = props => (
  <Page id="login" title="Login" description="We need to log in to stuff.">
    Redirecting to oAuth of the Slack App
  </Page>
);

const mapDispatchToProps = dispatch =>
  bindActionCreators({ authenticateSession }, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(Login);
