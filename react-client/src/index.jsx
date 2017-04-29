import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: [],
      photo: ""
    }
  }

  componentDidMount() {
    $.ajax({
      url: '/records', 
      success: (data) => {
        var display = JSON.parse(data);
        //console.log(display);
        this.setState({
          items: display
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });

    $.ajax({
      url: '/location',
      success: (data) => {
        let queryResult = JSON.parse(data);
        let photo_reference = queryResult.results[0].photos[0].photo_reference;
        let apiKey = "AIzaSyAWh923QwLcLQGjH1w4OYOG0_CX8jGHbmE";

        this.setState({
          photo: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=500&photoreference=' + photo_reference + '&key=' + apiKey
        })
      }
    }); 
  }

  render () {
    return (<div>
      <h1>Drone Report</h1>
      <img src={this.state.photo} />
      <List items={this.state.items}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));