import React from 'react';
import ListItem from './ListItem.jsx';

const List = (props) => (
  <div>
    { props.items.map((item,index) => <ListItem item={item} key={index}/>)}
  </div>
)

export default List;