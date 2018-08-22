// import React, { Component } from 'react';
// import { connect } from 'react-redux';
//
// const meUrl = "http://localhost:4000/me/annotations"
//
// class ProfileContainer extends Component {
//
//   componentDidMount(){
//     fetch("http://localhost:4000/me/annotations", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         "x-auth": localStorage.getItem("token")
//       }
//     })
//       .then(response => response.json())
//       .then(console.log)
//       .catch(error => {
//         //Remove token and send user to Login if token is not found
//       })
//   }
//
//   render(){
//     return(
//       <div>
//         <h1>Welcome to your homepage.</h1>
//         <p><span style={{ fontWeight: 'bold' }}>Your email:</span> {this.props.loggedInUser.email}</p>
//         <h3>Your annotations:</h3>
//
//       </div>
//     )
//   }
//
// }
//
// function mapStateToProps(state){
//   return {
//     loggedInUser: state.loggedInUser,
//   }
// }
//
// export default connect(mapStateToProps)(ProfileContainer);
