import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Page from "../../components/page";
import { listConversationEntries } from "../../store/entries";

import { Button, Card, Elevation } from "@blueprintjs/core";

import "../../styles/components/Entries.scss";

const Entry = props => {
  return (
    <Card className={"Entry"} interactive={false} elevation={Elevation.TWO}>
      <h5>
        <a href="#">{props.title}</a>
      </h5>
      <p>{props.content}</p>
    </Card>
  );
};

const Entries = props => {
  return (
    <div>
      {props.data &&
        props.data.map(mapItem => <Entry key={mapItem.id} {...mapItem} />)}
    </div>
  );
};

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  entries: state.entries
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ listConversationEntries }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  class extends Component {
    componentWillMount() {
      this.props.listConversationEntries();
    }

    render() {
      const userData = JSON.stringify(this.props.currentUser, null, 4);
      return (
        <Page id="dashboard" title="Dashboard" noCrawl>
          <p>
            <b>Session Data:</b>
          </p>
          <code>{userData}</code>
          <hr />
          <Entries data={this.props.entries.posts} />
        </Page>
      );
    }
  }
);
