import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { mainNavLinks } from "../../store/ui";

import { NavMenu } from "../NavMenu";

import "../../styles/components/Header.scss";

export class Header extends Component {
  render() {
    return (
      <header className={"Header"}>
        <NavMenu {...this.props} />
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
