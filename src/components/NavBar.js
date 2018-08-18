import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavBar extends Component {
  render(){
    return(
      <div className="div--nav-bar">
        <Link className="nav-item div--nav-bar-item logo" to="/home">Obra</Link>
        <Link className="nav-item div--nav-bar-item" to="/artwork">Artwork</Link>
        <Link className="nav-item div--nav-bar-item" to="/annotations">Annotations</Link>
        <Link className="nav-item div--nav-bar-item nav-login" to="/login">Login</Link>
        <Link className="nav-item div--nav-bar-item nav-login" to="/about">About</Link>
      </div>
    )
  }
}

export default NavBar;
