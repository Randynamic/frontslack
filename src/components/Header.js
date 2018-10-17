import React from "react";
import { Button, Navbar, Alignment } from "@blueprintjs/core";

import "../styles/components/Header.scss";

const links = [
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
];

const isCurrent = (to, current) => {
  if (to === "/" && current === to) {
    return true;
  } else if (to !== "/" && current.includes(to)) {
    return true;
  }

  return false;
};

export const Header = ({ isAuthenticated, current, history }) => {
  const HeaderLink = ({ to, text, current }) => (
    <Button
      onClick={() => history.push(to)}
      className={"bp3-minimal " + (isCurrent(to, current) ? "current" : "")}
      text={text}
    />
  );
  const LoginBtnHandler = () => {
    history.push("/login");
  };
  const NavItems = () => {
    return links.map((link, index) => {
      const NavItem = <HeaderLink key={index} current={current} {...link} />;
      if (link.hasOwnProperty("auth")) {
        if (link.auth && isAuthenticated) {
          return NavItem;
        } else if (!link.auth && !isAuthenticated) {
          return NavItem;
        }
        return null;
      }
      return NavItem;
    });
  };
  return (
    <header id="header">
      <Navbar>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>FrontSlack</Navbar.Heading>
          <Navbar.Divider />
          {NavItems()}
          <Navbar.Divider />
          <Button
            intent="success"
            text={isAuthenticated ? "Go to Dashboard" : "Sign in"}
            onClick={() => LoginBtnHandler()}
            className={"bp3-align-left"}
          />
        </Navbar.Group>
      </Navbar>
    </header>
  );
};
