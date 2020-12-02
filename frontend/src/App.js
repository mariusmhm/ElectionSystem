import React, { Component } from 'react';
import Header from './components/layout/Header';
import Grid from '@material-ui/core/Grid';
import Registration from './components/Registration';
import { Button, Icon, Container, TextField, Typography, withStyles } from '@material-ui/core';
import theme from './theme';
import CreateProject from './components/dialogs/CreateProject'
import { ThemeProvider } from '@material-ui/core/styles';

//This is for testing approaches

// Branch Test Comment

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
      <h1 style= {{color:"red", textAlign:"center"}}> Hochschule der Medien</h1>
      <h2 style={{color:"red", textAlign:"center"}} > ElectionSystem</h2>

       
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
                    < Grid item xs={12} sm={6}>
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
                <Grid item xs={12} sm={6}>
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


