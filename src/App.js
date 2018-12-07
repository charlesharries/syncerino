import React, { Component } from 'react';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');

class App extends Component {
  state = {
    timestamp: 'no timestamp yet',
    message: ''
  }

  constructor(props) {
    super(props);

    socket.on('pushState', (state) => {
      this.setState({ message: state });
    });
  }

  handleChange = async (event) => {
    await this.setState({
      message: event.target.value
    });

    socket.emit('newState', this.state.message);
  }

  render() {
    return (
      <div className="App">
        <h3>Syncing state across multiple clients using websockets</h3>
        <input type="text" name="message" value={this.state.message} onChange={this.handleChange} />
      </div>
    );
  }
}

export default App;
