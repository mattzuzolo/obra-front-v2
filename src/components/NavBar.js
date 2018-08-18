import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavBar extends Component {
  render(){
    return(
      <div className="div--nav-bar">
        <Link className="nav-item logo div--nav-bar-item" to="/home">Obra</Link>
        <Link className="nav-item div--nav-bar-item" to="/artwork">Artwork</Link>
        <Link className="nav-item div--nav-bar-item" to="/artwork">Annotations</Link>
        <Link className="nav-item nav-login div--nav-bar-item" to="/login">Login</Link>
        <Link className="nav-item nav-login div--nav-bar-item" to="/artwork">About</Link>
      </div>
    )
  }
}

export default NavBar;
