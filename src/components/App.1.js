import React, { Component } from "react";
import "../styles/components/App.scss";
import Avatar from "../containers/Avatar/Avatar";
import UserData from "../services/UserData";
import qs from "query-string";

class App extends Component {
  state = {
    data: null,
    session: {}
  };

  constructor(props) {
    super(props);
    this.initData();
  }

  initData = () => {
    this.localData = null;
    try {
      this.localData = JSON.parse(localStorage.getItem("data"));
    } catch (e) {}
  };

  getInputValue = () => {
    console.log(this.nameRef.value);
  };

  static getDerivedStateFromProps(props, state) {
    console.log("getDerivedStateFromProps > state ", state);
    state.session.token = null;
    state.redirectAuth = true;
    const sessionData = localStorage.getItem("session");
    if (sessionData) {
      state.session = JSON.parse(sessionData);
      if (state.session && state.session.access_token) {
        state.redirectAuth = false;
      }
    }
    if (state.redirectAuth && props && props.location) {
      const search = props.location.search;
      const qparams = qs.parse(search);
      if (qparams.code) {
        state.session = qparams;
      }
    }
    return state;
  }

  shouldComponentUpdate() {
    if (!this.state.session.access_token) {
      window.location.href =
        "https://slack.com/oauth/authorize?client_id=265156972019.453766114196&scope=identity.basic";
      return false;
    }
    return true;
  }

  componentDidMount() {
    this.UserData = new UserData(this.state);
    if (!this.localData) {
      this.UserData.get()
        .then(data => {
          // console.log("asdasdadasdasda --- ", data);
          this.localData = data;
          if (data && data.ok) {
            localStorage.setItem("data", JSON.stringify(data));
            this.setState({ data: data });
          }
        })
        .catch(e => {
          // console.log("..>>>.>>>.>>...", this.state);
          if (!this.state.session.code) {
            setTimeout(() => {
              this.setState({
                session: {}
              });
            });
          } else {
            console.log("componentDidMount", this);
          }
        });
    } else {
      this.setState({ data: this.localData });
    }
  }

  render() {
    return (
      <div className="App">
        {this.state.data && (
          <header className="App__header">
            <Avatar user={this.state.data.user} />
            <input type="text" ref={node => (this.nameRef = node)} />
            <button onClick={this.getInputValue}>Get Input Value</button>
          </header>
        )}
      </div>
    );
  }
}

export default App;
