import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Page from "../../components/page";

import { loginUser } from "../../store/auth";

const Login = props => (
  <Page id="login" title="Login" description="We need to log in to stuff.">
    <button onClick={() => props.loginUser()}>Click the button...</button>
  </Page>
);

const mapDispatchToProps = dispatch =>
  bindActionCreators({ loginUser }, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(Login);
