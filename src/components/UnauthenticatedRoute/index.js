import React, { Component } from "react";
import { connect } from "react-redux";
import qs from "query-string";
import { Route, Redirect } from "react-router-dom";
import { bindActionCreators } from "redux";
import { authenticateSession } from "../../store/auth";

export class UnauthenticatedRoute extends Component {
  state = {
    isAuthenticated: undefined,
    check: false
  };

  componentWillMount() {
    this.setState({ isAuthenticated: this.props.isAuthenticated });
  }

  componentDidMount() {
    if (!this.props.isAuthenticated) {
      this.setState({
        check: true
      });
    }
  }

  async shouldComponentUpdate(nextProps, nextState) {
    if (nextState.check && !this.props.isAuthenticated) {
      nextState.check = false;
      const code = qs.parse(nextProps.location.search).code;
      await this.props.authenticateSession(code).then(session => {
        if (session && session.ok) {
          nextState.isAuthenticated = true;
        } else {
          nextState.isAuthenticated = false;
        }
      });
    }
    if (nextState.isAuthenticated) {
      return true;
    }
    return false;
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
    if (this.props.isAuthenticated) {
      return this.renderComponent(this.props);
    } else {
      return <div>Authenticating...</div>;
    }
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
