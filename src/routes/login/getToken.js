import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Page from "../../components/page";
import qs from "query-string";

import { loginUser, setAppCode } from "../../store/auth";

const GetToken = props => {
  const params = qs.parse(props.location.search);
  props.setAppCode(params.code).then(res => {
    console.log("...", res);
  });
  return (
    <Page id="login" title="Login" description="We need to log in to stuff.">
      Get Token with code: {params.code}
    </Page>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ loginUser, setAppCode }, dispatch);

export default connect(
  state => state,
  mapDispatchToProps
)(GetToken);
