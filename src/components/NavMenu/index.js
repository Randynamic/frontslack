import React, { Component } from "react";

import { Button, Navbar, Alignment } from "@blueprintjs/core";
import { uniqWith, isEqual, find } from "lodash";

const isCurrent = (to, current) => {
  if (to === "/" && current === to) {
    return true;
  } else if (to !== "/" && current.includes(to)) {
    return true;
  }
  return false;
};

export const NavItemLink = ({ to, text, current, history }) => (
  <Button
    onClick={() => history.push(to)}
    className={
      "bp3-minimal " +
      (isCurrent(to, current) ? "Header__Link--active" : "Header__Link")
    }
    text={text}
  />
);

export class NavMenu extends Component {
  state = {
    privateLinks: this.props.ui.links.privateLinks,
    publicLinks: this.props.ui.links.publicLinks,
    retry: true
  };

  NavItems = () => {
    let links =
      this.props.isAuthenticated && this.isPrivate(this.props.current)
        ? this.props.ui.links.privateLinks
        : this.props.ui.links.publicLinks;
    return links.map((link, index) => {
      const NavItem = (
        <NavItemLink
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

  isPrivate = current => {
    if (
      this.props.ui.links.privateLinks &&
      this.props.ui.links.publicLinks &&
      this.props.ui.links.privateLinks.length > 0 &&
      this.props.ui.links.publicLinks.length > 0
    ) {
      const allLinks = uniqWith(
        [
          ...this.props.ui.links.privateLinks,
          ...this.props.ui.links.publicLinks
        ],
        isEqual
      );
      const link = find(allLinks, { to: current });
      return link ? link.auth : undefined;
    }
    return [];
  };

  singinBtnHandler = () => {
    if (this.props.isAuthenticated) {
      if (this.props.current !== "/dashboard") {
        return this.props.history.push("/dashboard");
      }
      return false;
    }
    return this.props.history.push("/login");
  };

  singoutBtnHandler = () => {
    return this.props.history.push("/logout");
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.ui.links.privateLinks && nextProps.ui.links.publicLinks) {
      return true;
    }
    return false;
  }

  componentWillMount() {
    if (
      this.state.publicLinks.length === 0 ||
      (this.props.isAuthenticated && this.state.privateLinks.length === 0)
    ) {
      this.props.mainNavLinks(this.props.isAuthenticated);
    }
  }

  render() {
    return (
      <Navbar fixedToTop={true}>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>
            {this.props.isAuthenticated & this.isPrivate(this.props.current)
              ? "Admin"
              : "FrontSlack"}
          </Navbar.Heading>
          <Navbar.Divider />
          {this.props.ui.links.publicLinks.length > 0 ||
          this.props.ui.links.privateLinks.length > 0
            ? this.NavItems()
            : "No Menu Items Loaded"}
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT}>
          {(!this.isPrivate(this.props.current) ||
            !this.props.isAuthenticated) && (
            <Button
              intent="success"
              text={this.props.isAuthenticated ? "Go to Dashboard" : "Sign in"}
              onClick={() => this.singinBtnHandler()}
              className={Alignment.LEFT}
            />
          )}
          {this.props.isAuthenticated && (
            <React.Fragment>
              <Button
                intent="danger"
                text={"Sign Out"}
                onClick={() => this.singoutBtnHandler()}
                className={Alignment.LEFT}
              />
            </React.Fragment>
          )}
        </Navbar.Group>
      </Navbar>
    );
  }
}
