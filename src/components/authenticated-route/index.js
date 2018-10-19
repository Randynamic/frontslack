import React, { Component } from "react";
import { connect } from "react-redux";
import qs from "query-string";
import { Route, Redirect } from "react-router-dom";
import { bindActionCreators } from "redux";
import { authenticateSession } from "../../store/auth";

export class AuthenticatedRoute extends Component {
  componentWillMount() {
    const params = qs.parse(this.props.location.search);
    this.props.authenticateSession(params.code);
  }

  renderComponent({ component: Component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          rest.isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect to={`/login?redirect=${props.location.pathname}`} />
          )
        }
      />
    );
  }

  render() {
    return this.renderComponent(this.props);
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth ? state.auth.isAuthenticated : false
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ authenticateSession }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthenticatedRoute);
