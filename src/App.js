import React, { Component } from 'react';
import './App.css';
import Header from './ui/component/Header';
import Content from './ui/component/Content';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div>
          <Content />
        </div>
      </div>
    );
  }
}

export default App;