import React from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorCatch from '../error-catch';
import {SwapiServiceProvider} from '../swapiServiceContext'
import {PeoplePage, PlanetPage, StarshipPage, SecretPage, LoginPage} from '../pages';
import ItemDetails from '../item-details'

import SwapiService from '../../services/swapiService.js'

import './app.css';

import  { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

export default class App extends React.Component
{
  state = {
    swapiService: new SwapiService(),
    isLoggedIn: false
  };
  onLogin = () => {
    this.setState({isLoggedIn: true});
  };

  render() {
    const {swapiService, isLoggedIn } = this.state; 

    return (
      <ErrorCatch>
        <SwapiServiceProvider value = {swapiService}>
          <Router basename={process.env.PUBLIC_URL}>
            <ErrorCatch><Header /></ErrorCatch>
            <RandomPlanet swapiService = {swapiService}/>

            <Switch>
              <Route path="/" exact render={() => <h2>Welcome to StarDB</h2>} /> 
              <Route path= "/people/:id?" component = {PeoplePage}/> 
              <Route path= "/planets/:id?" component = {PlanetPage}/> 
              <Route path= "/starships" exact component = {StarshipPage}/> 
              <Route path = "/starships/:id"
                    render = { ({match}) => {
                      const {id} = match.params;
                      return <ItemDetails getData={swapiService.getStarship} itemId = {id} />
                    }}/>
              <Route path ="/secret" 
                    render ={() => {
                      return <SecretPage isLoggedIn={isLoggedIn}/>;
                    }}/>
              <Route path = "/login" 
                    render ={() => {
                      return <LoginPage isLoggedIn={isLoggedIn} 
                                        onLogin={this.onLogin}/>
                    }} />
              <Redirect to='/' />
            </Switch>
          </Router>
        </SwapiServiceProvider>
      </ErrorCatch>
    );
  }
};
