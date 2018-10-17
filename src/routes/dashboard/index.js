import React from "react";
import { connect } from "react-redux";
import Page from "../../components/page";

const Dashboard = ({ currentUser }) => {
  const userData = JSON.stringify(currentUser, null, 4);
  return (
    <Page id="dashboard" title="Dashboard" noCrawl>
      <p>
        <b>Session Data:</b>
      </p>
      <code>{userData}</code>
    </Page>
  );
};

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser
});

export default connect(
  mapStateToProps,
  null
)(Dashboard);
