import React from 'react';

const ListItem = (props) => (
   <div class="row justify-content-center">
    <div class="column">
      <h2>A scene from { props.item.town }, {props.item.country}</h2>
      <img src={"https://maps.googleapis.com/maps/api/place/photo?maxheight=500&photoreference=" + props.item.photo_reference + "&key=AIzaSyAWh923QwLcLQGjH1w4OYOG0_CX8jGHbmE"} />
      <h3>A US drone strike occurred around here</h3>
      <h3>on {props.item.date}</h3>
      <h3>and killed {props.item.deaths} people</h3>
    </div>
  </div>
)

export default ListItem;