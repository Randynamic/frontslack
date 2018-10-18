import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Page from "../../components/page";
import {
  listConversationEntries,
  addConversationEntry
} from "../../store/entries";

import { Card, Elevation } from "@blueprintjs/core";

import "../../styles/components/Entries.scss";

const Entry = props => {
  return (
    <Card className={"Entry"} interactive={false} elevation={Elevation.TWO}>
      <h5>{props.title}</h5>
      <p>{props.content}</p>
    </Card>
  );
};

const Entries = props => {
  return (
    <div>
      {props.data &&
        props.data.map((mapItem, index) => <Entry key={index} {...mapItem} />)}
    </div>
  );
};

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  entries: state.entries
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { listConversationEntries, addConversationEntry },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  class extends Component {
    componentWillMount() {
      this.props.listConversationEntries();
      let i = this.props.entries.posts.length;
      this.props.addConversationEntry({ id: i++ });
    }

    componentWillUnmount() {}

    render() {
      const userData = JSON.stringify(this.props.currentUser, null, 4);
      return (
        <Page id="dashboard" title="Dashboard" noCrawl>
          <p>
            <b>Session Data:</b>
          </p>
          <code>{userData}</code>
          <hr />
          <h1>Entries: {this.props.entries.posts.length}</h1>
          <Entries data={this.props.entries.posts} />
        </Page>
      );
    }
  }
);
