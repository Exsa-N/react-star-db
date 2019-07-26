import React from 'react'

import ItemList from '../item-list';
import ItemDetails from '../item-details';
import ErrorCatch from '../error-catch';
import {withRouter} from 'react-router-dom';

import './page.css';

const Page = ({history, match, list, item}) => {
    const {id} = match.params;
    return (
        <ErrorCatch>
            <div className="row mb2 page">
                <div className="col-md-6">
                <ItemList 
                    onItemSelected={(id) => history.push(id)} 
                    getData={list}/>
                </div>
                <div className="col-md-6">
                <ItemDetails 
                    itemId = {id} 
                    getData = {item}/>
                </div>
            </div>
        </ErrorCatch>
    );
}

export default withRouter(Page);