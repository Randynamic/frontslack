import React, { Component } from "react";

import Loadable from "react-loadable";

export default function Load(WrappedContent, Data = {}) {
  const LoadableOtherComponent = Loadable({
    loader: () => {
      return new Promise((resolve, reject) => {
        setTimeout(function() {
          return resolve(WrappedContent);
        }, 1000);
      });
    },
    loading: () => () => {
      return <div className={"loading"}>Loading...</div>;
    }
  });

  return class extends Component {
    constructor(props) {
      super(props);
      this.state = Object.assign({}, Data);
    }

    render() {
      return <LoadableOtherComponent {...this.state} {...this.props} />;
    }
  };
}
