import React, { Component } from 'react';

import Spinner from '../spinner'

import './item-details.css';

export default class ItemDetails extends Component 
{  
  state = {
    item: null,
    load: true
  }
  componentWillMount()
  {
    this.updateitem();
  }
  updateitem() 
  { 
    const {itemId, getData} = this.props;
    if(!itemId)
      return;
    this.setState({load: false});
    getData(itemId)
      .then(item => {this.setState({item, load: true})});
  }
  
  componentDidUpdate(prevProps)
  {
    if(this.props.itemId !== prevProps.itemId)
      this.updateitem();
  }

  render() {
    if(!this.state.item && this.state.load)
      return <div className="item-details card"><span style={{margin: 8+'px'}}>Select a item from a list</span></div>;

    const {item} = this.state;
    const view = (!this.state.load) ? <Spinner /> : <ItemCard item={item} />;

    return <div className="item-details card">{view}</div>;
  }
}

const ItemCard = ({item}) => {
  const { id, img, name, ...itemParams } = item;
  const params = Object.keys(itemParams).map(key => {
    return (
      <li key={key} className="list-group-item">
            <span className="term">{camelCaseToNormal(key)}</span>
            <span>{itemParams[key]}</span>
      </li>
    );
  });

  return (
    <React.Fragment>
      <img className="item-image" alt = "List item details"
        src={img} />

      <div className="card-body">
        
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          {params}
        </ul>
      </div>
    </React.Fragment>
  )
}

function camelCaseToNormal(str)
{
  return str.replace(/([A-Z])/g, ' $1')
            .replace(/^./, letter => letter.toUpperCase());
}