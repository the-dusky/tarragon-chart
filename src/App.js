import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Chart from './components/Chart'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Tarragon</h1>
        </header>
        <Chart />
      </div>
    );
  }
}

export default App;
