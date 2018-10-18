import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Navbar, Alignment } from "@blueprintjs/core";
import { uniqWith, isEqual, find } from "lodash";
import { mainNavLinks, mainNavLinksError } from "../store/ui";

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
    privateLinks: this.props.ui.links.privateLinks,
    publicLinks: this.props.ui.links.publicLinks
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
      return link.auth;
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

  NavItems = () => {
    let links =
      this.props.isAuthenticated && this.isPrivate(this.props.current)
        ? this.props.ui.links.privateLinks
        : this.props.ui.links.publicLinks;
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

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.ui.links.privateLinks && nextProps.ui.links.publicLinks) {
      return true;
    }
    return false;
  }

  componentWillMount() {
    if (
      !this.props.ui.links.privateLinks.length > 0 &&
      !this.props.ui.links.publicLinks.length > 0
    ) {
      this.props.mainNavLinksError(this.props.isAuthenticated);
    }
    console.log(this);
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
              onClick={() => this.singinBtnHandler()}
              className={Alignment.LEFT}
            />
            {this.props.flash.messages.length > 0 && (
              <Button
                intent="primary"
                text={"Clear Messages"}
                onClick={() => this.props.clearMessages()}
                className={Alignment.LEFT}
              />
            )}
            {(this.props.ui.links.privateLinks.length === 0 ||
              this.props.ui.links.publicLinks.length === 0) && (
              <Button
                intent="danger"
                text={"Reload"}
                onClick={() =>
                  this.props.mainNavLinks(this.props.isAuthenticated)
                }
                className={Alignment.LEFT}
              />
            )}
          </Navbar.Group>
        </Navbar>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  ui: state.ui
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ mainNavLinks, mainNavLinksError }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
