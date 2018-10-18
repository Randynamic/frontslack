import React, { Component } from "react";
import { Button, Navbar, Alignment } from "@blueprintjs/core";
import { uniqWith, isEqual, find } from "lodash";

import "../styles/components/Header.scss";

const isCurrent = (to, current) => {
  if (to === "/" && current === to) {
    return true;
  } else if (to !== "/" && current.includes(to)) {
    return true;
  }
  return false;
};

export const HeaderLink = ({ to, text, current, history }) => (
  <Button
    onClick={() => history.push(to)}
    className={"bp3-minimal " + (isCurrent(to, current) ? "current" : "")}
    text={text}
  />
);

export class Header extends Component {
  state = {
    privateLinks: [
      {
        to: "/",
        text: "Homepage"
      },
      {
        to: "/dashboard",
        text: "Dashboard",
        auth: true
      },
      {
        to: "/logout",
        text: "Logout",
        auth: true
      }
    ],
    publicLinks: [
      {
        to: "/",
        text: "Homepage"
      },
      {
        to: "/about",
        text: "About"
      },
      {
        to: "/profile/1",
        text: "Profile 1"
      },
      {
        to: "/profile/2",
        text: "Profile 2"
      },
      {
        to: "/login",
        text: "Login",
        auth: false
      },
      {
        to: "/dashboard",
        text: "Dashboard",
        auth: true
      },
      {
        to: "/logout",
        text: "Logout",
        auth: true
      },
      {
        to: "/this-is-broken",
        text: "Broken Page"
      }
    ]
  };

  isPrivate = current => {
    const allLinks = uniqWith(
      [...this.state.privateLinks, ...this.state.publicLinks],
      isEqual
    );
    const link = find(allLinks, { to: current });
    return link.auth;
  };

  LoginBtnHandler = () => {
    this.props.history.push("/login");
  };

  NavItems = () => {
    let links =
      this.props.isAuthenticated && this.isPrivate(this.props.current)
        ? this.state.privateLinks
        : this.state.publicLinks;
    return links.map((link, index) => {
      const NavItem = (
        <HeaderLink
          key={index}
          current={this.props.current}
          {...link}
          {...this.props}
        />
      );
      if (link.hasOwnProperty("auth")) {
        if (link.auth && this.props.isAuthenticated) {
          return NavItem;
        } else if (!link.auth && !this.props.isAuthenticated) {
          return NavItem;
        }
        return null;
      }
      return NavItem;
    });
  };

  componentWillMount() {
    console.log("[componentWillMount]");
  }

  render() {
    return (
      <header id="header">
        <Navbar>
          <Navbar.Group align={Alignment.LEFT}>
            <Navbar.Heading>
              {this.props.isAuthenticated & this.isPrivate(this.props.current)
                ? "Admin"
                : "FrontSlack"}
            </Navbar.Heading>
            <Navbar.Divider />
            {this.NavItems()}
            <Navbar.Divider />
            <Button
              intent="success"
              text={this.props.isAuthenticated ? "Go to Dashboard" : "Sign in"}
              onClick={() => this.LoginBtnHandler()}
              className={Alignment.LEFT}
            />
          </Navbar.Group>
        </Navbar>
      </header>
    );
  }
}

const mapStateToProps = state => state;
// const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);
