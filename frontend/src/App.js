import React, { Component } from 'react';
import Header from './components/layout/Header';
import { Button, Grid, Container, TextField, Typography, withStyles } from '@material-ui/core';
import Registration from './components/pages/Registration';

// Registration only for Testing right now

class App extends Component {
constructor (props){
    super(props);
    this.state={
    group:"Gruppe 5"

    }
}
  render() {
    return (

      <div className="App">
        
        <Header />
        <Registration />
        <h1 style= {{color:"red", textAlign:"center"}}> Hello World!</h1>
           <h2 style={{color:"red"}}> This is a test! </h2>

      </div>
    );
  }
}

export default App;

