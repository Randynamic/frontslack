import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Navbar, Alignment } from "@blueprintjs/core";
import { uniqWith, isEqual, find } from "lodash";
import { mainNavLinks } from "../store/ui";

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
      this.props.mainNavLinks(this.props.isAuthenticated);
    }
  }

  render() {
    return (
      <header id="header">
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
            <Button
              intent="success"
              text={this.props.isAuthenticated ? "Go to Dashboard" : "Sign in"}
              onClick={() => this.singinBtnHandler()}
              className={Alignment.LEFT}
            />
            {this.props.isAuthenticated && (
              <React.Fragment>
                <Navbar.Divider />
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
      </header>
    );
  }
}

const mapStateToProps = state => ({
  ui: state.ui
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ mainNavLinks }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
