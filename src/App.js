import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';

import NavBar from "./components/NavBar"
import IndexContainer from "./components/containers/IndexContainer";
import DetailContainer from "./components/containers/DetailContainer";
import LoginContainer from "./components/containers/LoginContainer";

class App extends Component {

  render() {
    return (
      <div className="container div--app App">
        <Route path="/" component={NavBar} />
          <Switch>
            <Route path ={`/artwork/:id`} render={(routerProps) => {
                let paramsId = routerProps.match.params.id;
                return <DetailContainer routerProps={routerProps} paramsId={paramsId}/>
              }} />
            <Route path="/artwork" render={(routerProps) => <IndexContainer
                routerProps={routerProps} />}/>
            <Route path="/login" component={LoginContainer} />
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
