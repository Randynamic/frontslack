import React from 'react';
import { connect } from 'react-redux';
import Page from '../../components/page';

const Dashboard = ({ currentUser }) => (
  <Page id="dashboard" title="Dashboard" noCrawl>
    <p>
      <b>Session Data:</b> {currentUser.access_token}
    </p>
  </Page>
);

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser
});

export default connect(
  mapStateToProps,
  null
)(Dashboard);
