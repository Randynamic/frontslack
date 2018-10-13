import React, { Component } from "react";

import AuthService from "../../hoc/AuthService";
import qs from "query-string";

/**
 *
 * GET TOKEN COMPONENT
 *
 */
export class getToken extends Component {
  state = { authorized: null };

  componentDidMount() {
    const qparams = qs.parse(this.props.location.search);
    AuthService.authenticate(qparams.code)
      .then(session_data => {
        if (!session_data.ok) {
          console.log("error", session_data);
          return;
        }
        console.log("session ", session_data);
        // this.setState({ authorized: true, session: session_data });
      })
      .catch(e => {
        this.setState({ authorized: false });
        console.log(e);
      });
  }

  render() {
    console.log("this", this);

    return <div>Process</div>;
    // if (!this.state.authorized) {
    //   return <Redirect to="/auth/failed" />;
    // }
    // return <Redirect to="/main" />;
  }
}

/**
 *
 * FAILED TOKEN RETRIEVAL
 *
 */
export class AuthFailed extends Component {
  render() {
    return <div>Authentication Failed</div>;
  }
}
