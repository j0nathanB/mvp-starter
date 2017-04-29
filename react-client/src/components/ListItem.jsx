import React from 'react';

const ListItem = (props) => (
  <div>
    <h4>{ props.item.town }, {props.item.country}</h4>
  </div>
)

export default ListItem;