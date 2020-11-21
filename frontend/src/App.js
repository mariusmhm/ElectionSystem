import React, { Component } from 'react';
import Header from './components/layout/Header';
import Grid from '@material-ui/core/Grid';
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

        <Container maxWidth="sm">
            <Grid item xs={12} sm={6}>
                <Grid container spacing={1} style={{textAlign:"center", backgroundColor:"white"}}>
                <Typography variant="h3" style={{textAlign:"center"}}>Wilkommen</Typography>
                    < Grid item xs={12} sm={12}>
                        <form noValidate autoComplete="off" style={{}}>
                            <TextField
                             id="outlined-basic"
                             label="E-Mail"
                             variant="outlined"
                             label="E-Mail"
                            />
                        </form>
                    </Grid>
                    < Grid item xs={12} sm={12}>
                        <form noValidate autoComplete="off" style={{}}>
                            <TextField
                               id="outlined-basic"
                               label="Passwort"
                               variant="outlined"
                               label="Passwort"
                               type="password"
                            />
                        </form>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <form noValidate autoComplete="off" style={{}}>
                            <Button variant="contained" color="secondary">
                                Log In
                            </Button>
                        </form>
                    </Grid>
                </Grid>
            </Grid>
        </Container>

        <Container maxWidth="sm">
            <Grid item xs={12} sm={6}>
                <Grid container spacing={1} style={{textAlign:"center", backgroundColor:"gray"}}>
                <Typography variant="h3" style={{textAlign:"center", backgroundColor:"gray"}}>Neu Hier?</Typography>
                    <Grid item xs={12} sm={12}>
                        <form noValidate autoComplete="off" style={{}}>
                            <Button variant="contained">
                                Als Student registrieren
                            </Button>
                        </form>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <form noValidate autoComplete="off" style={{}}>
                            <Button variant="contained">
                                Als Dozent registrieren
                            </Button>
                        </form>
                    </Grid>
                </Grid>
            </Gird>

        </Container>
      </div>

    );
  }
}

export default App;


