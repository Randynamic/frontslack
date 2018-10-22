import React, { Component } from "react";
import Page from "../../components/Page";

import logo from "../../static/media/images/logo.svg";

class AsyncComp extends Component {
  render() {
    return <h1>Async Comp</h1>;
  }
}

export default () => (
  <Page id="homepage">
    <AsyncComp />
  </Page>
);
