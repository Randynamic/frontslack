import { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { logoutUser } from "../../store/auth";

class Logout extends Component {
  componentWillMount() {
    this.props.logoutUser();
    this.props.history.push("/");
  }

  render() {
    return null;
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ logoutUser }, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(Logout);
