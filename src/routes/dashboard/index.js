import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Page from "../../components/Page";
import {
  listConversationEntries,
  addConversationEntry
} from "../../store/entries";

import { Card, Elevation, Tab, Tabs } from "@blueprintjs/core";

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

const EntriesTabContent = props => {
  return (
    <React.Fragment>
      {props.entries.posts.length ? (
        <h1>Entries: {props.entries.posts.length}</h1>
      ) : (
        <h1>Loading Channel Messages</h1>
      )}

      <Entries data={props.entries.posts} />
    </React.Fragment>
  );
};
const TabContent = props => {
  return <h1>{props.title}</h1>;
};

const mapStateToProps = state => ({
  currentUser: state.auth ? state.auth.currentUser : undefined,
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
    state = {
      navbarTabId: "tab1"
    };

    componentWillMount() {}

    componentWillUnmount() {}

    handleTabChange = navbarTabId => {
      this.setState({ navbarTabId });
      switch (navbarTabId) {
        case "tab1":
          this.props.listConversationEntries(
            "DD3N06ZED",
            this.props.currentUser.access_token
          );
          break;
        default:
          break;
      }
    };

    componentDidMount() {
      if (
        (!this.props.entries && !this.props.entries.posts) ||
        this.props.entries.posts.length === 0
      ) {
        this.handleTabChange(this.state.navbarTabId);
      }
    }

    render() {
      return (
        <Page id="dashboard" title="Dashboard" noCrawl>
          <Tabs
            id="TabsExample"
            onChange={this.handleTabChange}
            selectedTabId={this.state.navbarTabId}
            vertical={true}
          >
            <Tab
              id="tab1"
              title="Channel Conversations"
              panel={<EntriesTabContent {...this.props} />}
            />
            <Tab
              id="tab2"
              title="Create Post"
              panel={<TabContent title={"Create Post"} />}
            />
            <Tab
              id="tab3"
              title="Tab 3"
              panel={<TabContent title={"Tab 3"} />}
            />
            <Tab
              id="tab4"
              disabled
              title="Disabled Tab"
              panel={<TabContent title={"Disabled Tab"} />}
            />
          </Tabs>
        </Page>
      );
    }
  }
);
