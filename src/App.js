import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';

import NavBar from "./components/NavBar"
import IndexContainer from "./components/containers/IndexContainer";
import DetailContainer from "./components/containers/DetailContainer";
import LoginContainer from "./components/containers/LoginContainer";
import ProfileContainer from "./components/containers/ProfileContainer";


// import { connect } from 'react-redux'
// import { changeExampleMessage } from './actions'

class App extends Component {

  // handleClick = () => {
  //   console.log('hello')
  //   this.props.changeExampleMessage()
  // }

  render() {
    return (
      <div className="container div--app App">
        <Route path="/" component={NavBar} />
          <Switch>

            <Route path ={`/artwork/:id`} render={(routerProps) => {
                let id = routerProps.match.params.id;
                let foundArtwork = this.props.artworkArray.find((art) => art.apiId === parseInt(id, 10));
                console.log("id", id);
                console.log("foundArtwork", foundArtwork)
                return <DetailContainer foundArtwork={foundArtwork}/>
              }} />

            <Route path="/artwork" render={(routerProps) => <IndexContainer
                routerProps={routerProps} />}/>

            <Route path="/login" component={LoginContainer} />
            <Route path="/profile" component={ProfileContainer} />
          </Switch>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    artworkArray: state.artworkArray,
    selectedArtwork: state.selectedArtwork,
  }
}

export default withRouter(connect(mapStateToProps)(App));


            // <Route path="/artwork" component={IndexContainer} />
            // <Route path ={`/artwork/${this.props.selectedArtwork.apiId}`} component={DetailContainer} />

            // <Route path ={`/artwork/:id`} component={DetailContainer} />

            // <DetailContainer routerProps={routerProps} />} />
