import React, { Component } from 'react';

class LoginContainer extends Component {
  constructor(props){
    super(props);

    this.state = {
      username: "",
      password: "",
    }
  }

  onInputChange = (event) => {
    let fieldName = event.target.name;
    let currentValue = event.target.value;
    this.setState({ [fieldName]: currentValue })
  }

  onLoginSubmit = (event) => {
    event.preventDefault();
    console.log("You tried to login!")
  }

  render(){
    console.log("State on render", this.state)
    return(
      <div>
      <form onSubmit={this.onLoginSubmit}>
        <label>Username:</label>
        <input placeholder="username" name="username" value={this.state.username} onChange={this.onInputChange} ></input>

        <label>Password:</label>
        <input placeholder="password" name="password" value={this.state.password} onChange={this.onInputChange} ></input>

        <button>Login!!!</button>
      </form>
      </div>
    )
  }




}

export default LoginContainer;
