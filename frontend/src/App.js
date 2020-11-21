import React, { Component } from 'react';
import Header from './components/layout/Header';
import Grid from '@material-ui/core/Grid';
import Registration from './components/Registration';
import { Button, Icon, Container, TextField, Typography, withStyles } from '@material-ui/core';

//This is for testing approaches

class App extends Component {
constructor (props){
    super(props);
    this.state={
    group:"Gruppe 5"

    }
}
  render() {
    return (
    //This is for testing, do not delete:

      <div>
      <h1 style= {{color:"red", textAlign:"center"}}> Hello World!</h1>
      <h2 style={{color:"red", textAlign:"center"}} > This is a test! </h2>

       
        <Grid container direction="row" justify="space-around" alignItems="center">
            <Grid item xs={12} sm={6}>
                <Typography variant="h3">Welcome</Typography>
                    <Grid item xs={6} sm={6}>
                        <TextField
                        id="outlined-basic"
                        label="E-Mail"
                        variant="outlined"
                        autoFocus
                        fullWidth
                        />
                    </Grid>
                    < Grid item xs={6} sm={5}>
                        <TextField
                        id="outlined-basic"
                        label="Password"
                        variant="outlined"
                        type="password"
                        autoFocus
                        fullWidth
                        />
                    </Grid>
                    <Button 
                    variant="contained" 
                    color="secondary">
                        Log In
                    </Button>
                </Grid>
                <Grid item xs={6} sm={6}>
                <Typography variant="h3">First time here?</Typography>
                    <Button 
                    variant="contained" 
                    color="primary">
                        Register as a <b> Professor</b>
                    </Button>
                    <br></br>
                    <Button 
                    variant="contained" 
                    color="secondary">
                        Register as a <b> Student</b>
                    </Button>
                </Grid>
            </Grid>
      </div>

    );
  }
}

export default App;


