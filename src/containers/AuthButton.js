import React from "react";
import { withRouter } from "react-router-dom";
import AuthService from "../hoc/AuthService";

const AuthButton = withRouter(
  ({ history }) =>
    AuthService.isAuthenticated ? (
      <p>
        Welcome!{" "}
        <button
          onClick={() => {
            AuthService.signout(() => history.push("/"));
          }}
        >
          Sign out
        </button>
      </p>
    ) : (
      <p>You are not logged in.</p>
    )
);
export default AuthButton;
