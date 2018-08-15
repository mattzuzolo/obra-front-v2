import React, { Component } from 'react';
import { connect } from 'react-redux';

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
    fetch("http://localhost:4000/users")
      .then(response => response.json())
      // .then(data => console.log("users GET", data))
      .then(data => this.findUser(data))
      .then(foundUser => this.props.loginUser(foundUser))
      .catch(error => console.log ("ERROR DURING FETCH: ", error))
  }

  findUser = (data) => {
    let foundUser = data.users.find(indivdualUser => indivdualUser.username === this.state.username);
    if (!foundUser){
      throw new Error("Login attempt failed.");
    }
    return foundUser;
  }

  render(){
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

function mapStateToProps(state){
  return {
    loggedInUser: state.loggedInUser,
  }
}

function mapDispatchToProps(dispatch){
  return {
    loginUser: (user => {
      dispatch({type: "LOGIN_USER", payload: user})
    }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
