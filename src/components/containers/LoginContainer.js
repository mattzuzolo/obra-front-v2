import React, { Component } from 'react';
import { connect } from 'react-redux';

class LoginContainer extends Component {
  constructor(props){
    super(props);

    this.state = {
      email: "",
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

    let loginPostBody = {
      email: this.state.email,
      password: this.state.password,
    }

    let loginPostConfig = {
      Accept: "application/json",
       method: "POST",
       headers: {
         "Content-type": "application/json",
         "Access-Control-Expose-Headers": "x-auth"
       },
       body: JSON.stringify(loginPostBody)
     };

    fetch("http://localhost:4000/users/login", loginPostConfig)
      .then(response => response.json())
      .then(json => {
        localStorage.setItem("token", json.token)
        // this.props.loggedInUser()
        this.props.history.push("/artwork");

      })
      .catch(error => console.log("ERROR DURING FETCH: ", error))
  }

  findUser = (data) => {
    let foundUser = data.users.find(indivdualUser => indivdualUser.email === this.state.email);
    if (!foundUser){
      throw new Error("Login attempt failed.");
    }
    return foundUser;
  }

  render(){
    return(
      <div className="container div--login-container">
        <h1 className="login-title">Login:</h1>
        <form className="form form--login" onSubmit={this.onLoginSubmit}>
          <div className="login-form-elements">
            <label>Email:</label>
            <input className="input form--login-input" placeholder="email" name="email" value={this.state.email} onChange={this.onInputChange} ></input>
            <br/>
            <label>Password:</label>
            <input className="input form--login-input" placeholder="password" name="password" value={this.state.password} onChange={this.onInputChange} ></input>
            <br/>
            <button className="button button--login">Login</button>
          </div>
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
