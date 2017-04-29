import React from 'react';

const ListItem = (props) => (
   <div>
    <h2><pre>{ props.item.town }, { props.item.location }, {props.item.country}</pre></h2>
    <h3><pre>Total number of drone strikes: {props.item.number}</pre></h3>
    <h3><pre>Total number of casualties: {props.item.deaths}</pre></h3>
  </div>
)

export default ListItem;