import React from 'react';

import Page from '../page';
import ItemList from '../item-list';

import withSwapiService from '../hoc-helpers/withSwapiService';
import {withRouter} from 'react-router-dom';

import SecretPage from './secret-page';
import LoginPage from './login-page'

const PeoplePage = withSwapiService(({swapiService}) => {
    return <Page item={swapiService.getPerson} list={swapiService.getAllPeople} />;
});

const PlanetPage = withSwapiService(({swapiService}) => {
    return <Page item={swapiService.getPlanet} list={swapiService.getAllPlanets} />;
});

const StarshipPage = withRouter(
                        withSwapiService(({swapiService, history}) => {
                            return <ItemList getData ={swapiService.getAllStarships}
                                             onItemSelected ={(itemId) => history.push(itemId)}/>;
                    }));

export {
    PeoplePage,
    PlanetPage, 
    StarshipPage,
    SecretPage,
    LoginPage
};