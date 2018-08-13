import React, { Component } from 'react';
import { connect } from 'react-redux';

class ProfileContainer extends Component {


  render(){
    return(
      <div>

        { this.props.loggedInUser.username !== ""
                  ? <div>
                      <h1>Username: {this.props.loggedInUser.username}</h1>
                      

                    </div>
                  : <h1>Nobody is currently logged in.</h1>
        }

      </div>
    )
  }

}

function mapStateToProps(state){
  return {
    loggedInUser: state.loggedInUser,
  }
}

export default connect(mapStateToProps)(ProfileContainer);
