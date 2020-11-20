import React, { Component } from 'react';
import Registration from './components/pages/Registration';
import { Button, Grid, Container, TextField, Typography, withStyles } from '@material-ui/core';

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
        
        <Registration />
        <h1 style= {{color:"red", textAlign:"center"}}> Hello World!</h1>
           <h2 style={{color:"red"}}> This is a test! </h2>

      </div>
    );
  }
}

export default App;

