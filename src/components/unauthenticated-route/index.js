import React, { Component } from "react";
import { connect } from "react-redux";
import qs from "query-string";
import { Route, Redirect } from "react-router-dom";
import { bindActionCreators } from "redux";
import { authenticateSession } from "../../store/auth";

export class UnauthenticatedRoute extends Component {
  componentWillMount() {
    const params = qs.parse(this.props.location.search);
    if (!params.error) {
      return this.props.authenticateSession(params.code);
    }
  }

  renderComponent({ component: Component, ...rest }) {
    let query = qs.parse(this.props.location.search);
    return (
      <Route
        {...rest}
        render={props =>
          !rest.isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect to={query.redirect || "/dashboard"} />
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
)(UnauthenticatedRoute);
