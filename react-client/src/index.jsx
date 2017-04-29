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
        let record = JSON.parse(data);
        let apiKey = "&key=AIzaSyAWh923QwLcLQGjH1w4OYOG0_CX8jGHbmE";
        let photoReference = record[0].photo_reference;
        let photoQuery = 'https://maps.googleapis.com/maps/api/place/photo?maxheight=500&photoreference=';

        this.setState({
          items: record,
          photo: photoQuery + photoReference + apiKey
        });
      },
      error: (err) => {
        console.log('err', err);
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