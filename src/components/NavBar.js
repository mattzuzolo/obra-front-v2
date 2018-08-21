import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


class NavBar extends Component {

  logout = () => {
    this.props.loginUser({});
    localStorage.removeItem("token");
    this.props.history.push("/login");
  }


  render(){
    console.log("ITEM IN LOCAL STORAGE", localStorage.getItem("token"))
    return(
      <div className="div--nav-bar">
        <Link className="nav-item div--nav-bar-item logo" to="/home">Obra</Link>
        <Link className="nav-item div--nav-bar-item" to="/artwork">Artwork</Link>
        <Link className="nav-item div--nav-bar-item" to="/annotations">Annotations</Link>
          { localStorage.getItem("token")
                    ?
                    <button className="nav-item div--nav-bar-item nav-right" onClick={this.logout}>Logout</button>
                    :
                    <Fragment>
                      <Link className="nav-item div--nav-bar-item nav-right" to="/register">Register</Link>
                      <Link className="nav-item div--nav-bar-item nav-right" to="/login">Login</Link>
                    </Fragment>
          }
        <Link className="nav-item div--nav-bar-item nav-right" to="/about">About</Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
