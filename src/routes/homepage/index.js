import React, { Component } from "react";
import Page from "../../components/Page";

class AsyncComp extends Component {
  render() {
    return <h1>Async Comp</h1>;
  }
}

export default props => (
  <Page id="homepage">
    <AsyncComp {...props} />
  </Page>
);
