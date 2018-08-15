import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavBar extends Component {
  render(){
    return(
      <div className="navbar">
        <Link to="/artwork">Artwork     </Link>
        <Link to="/login">Login     </Link>
      </div>
    )
  }
}

export default NavBar;
