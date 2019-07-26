import React, { Component } from 'react';

import Spinner from '../spinner'

import './item-list.css';

export default class ItemList extends Component {

  state = {
    dataList: null
  };

  componentDidMount()
  {
    const {getData} = this.props;
      getData()
      .then((dataList) => {
        this.setState({
          dataList
        });
      });
  }

  render() {
    const {dataList} = this.state;
    if(!dataList)
      return <Spinner />;

    const people = dataList.map(({name, id}) => {
      return (
        <li key ={id} 
            className="list-group-item" 
            onClick={() => this.props.onItemSelected(id)}>
          {name}
        </li>
      );
    });
    return (
      <ul className="item-list list-group">
        {people}
      </ul>
    );
  }
}
