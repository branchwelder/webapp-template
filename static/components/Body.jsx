import React from "react";

import "./styles/body.css";

export default class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "Hello World!",
      clicked: 0,
    };
  }
  click() {
    fetch("/handleClick", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({"clicked": this.state.clicked}),
    })
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          clicked: result.value
        })
      });
  }
  render() {
    return (
      <div id='container'>
        <button
          className='clickMe'
          title='Load plan'
          onClick={this.click.bind(this)}>
          Click me!
        </button>
        <br />
        <span id="result">
          <b>{this.state.clicked}</b>
        </span>
      </div>
    );
  }
}
