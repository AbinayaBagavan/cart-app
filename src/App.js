import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import { ProductList } from './product-list.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="Cart">
        <ProductList/>
        </div>
      </div>
    );
  }
}

export default App;
