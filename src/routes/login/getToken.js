import React from "react";
import { connect } from "react-redux";
import qs from "query-string";
import { Redirect } from "react-router-dom";

const GetToken = props => {
  let query = qs.parse(props.location.search);
  let outlet;
  if (!props.isAuthenticated) {
    outlet = <Redirect to={`/login?redirect=${props.location.pathname}`} />;
  } else {
    outlet = <Redirect to={query.redirect || "/main"} />;
  }
  return outlet;
};

export default connect(
  state => state,
  null
)(GetToken);
