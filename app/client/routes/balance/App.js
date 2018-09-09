import React, { Component } from "react";
import "./app.css";


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { username: null };
  }

  async componentDidMount() {
    let response = await fetch("/garph/getUsername");
    const json = await response.json();
    this.setState({ username: json.username });
  }

  render() {
    return (
      <div>
        {this.state.username ? (
          <h1>Hello {this.state.username}</h1>
        ) : (
          <h1>Loading.. please wait!</h1>
        )}
      </div>
    );
  }
}
