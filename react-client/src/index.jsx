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
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    $.ajax({
      url: '/records', 
      success: (data) => {
        let record = JSON.parse(data);
      
        this.setState({
          items: record,
        });
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  handleClick() {
    $.ajax({
      url: '/records', 
      success: function (data) {
        let record = JSON.parse(data);

        this.setState({
          items: record,
        });
      }.bind(this),
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  render () {
    return (<div>
      <List items={this.state.items}/>
      <a><h3 onClick={this.handleClick}>Next</h3></a>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));