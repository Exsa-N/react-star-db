import React, { Component } from 'react';

import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import ErrorCatch from '../error-catch';

import {SwapiServiceConsumer} from '../swapiServiceContext';

import './random-planet.css';

export default class RandomPlanet extends Component {

  state = {
    planet: {},
    loading: true,
    error: false
  };  
  interval = null;
  
  componentDidMount()
  {
    this.updatePlanet();
    this.interval = setInterval(this.updatePlanet, 5000);
  }

  componentWillUnmount()
  {
    clearInterval(this.interval);
  }

  onPlanetLoaded = (planet) => {
    this.setState({planet, loading:false, error: false});
  };
  
  onError = (err) => {
    this.setState({loading: false, error: true});
  };

  updatePlanet = () => {
    const {swapiService} = this.props;
    const id = Math.floor(Math.random()*17) + 2;
    swapiService
      .getPlanet(id)
      .then(this.onPlanetLoaded)
      .catch(this.onError)
  }
  render() {

    const { planet, loading, error } = this.state;

    const hasData = !(loading || error);

    const spinner = loading ? <Spinner /> : null;
    const content = hasData  ?  <PlanetView planet={planet} /> : null;
    const errorMess = error ? <ErrorIndicator /> : null;
    return (
      <div className="random-planet jumbotron rounded">
        {spinner}
        {content}
        {errorMess}
      </div>

    );
  }
}

const PlanetView = ({planet}) => {
  const { name, id, population, rotationPeriod, diameter} = planet;
  return (
    <ErrorCatch>
      <SwapiServiceConsumer>
        { ({getPlanetImg}) => <img className="planet-image" alt = "random planet img"src={getPlanetImg(id)} />}
      </SwapiServiceConsumer>
      <div>
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Population</span>
            <span>{population}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Rotation Period</span>
            <span>{rotationPeriod}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Diameter</span>
            <span>{diameter}</span>
          </li>
        </ul>
      </div>
    </ErrorCatch>
  );
};