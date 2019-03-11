import React, { Component } from 'react';
import './App.css';
import Employee from './components/employee/employee';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Employee />
      </div>
    );
  }
}

export default App;
