import React, { Component } from 'react';
import Header from './components/layout/Header';
import Grid from '@material-ui/core/Grid';


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

      <div>
        <h1 style= {{color:"red", textAlign:"center"}}> Hello World!</h1>
        <h2 style={{color:"red", textAlign:"center"}} > This is a test! </h2>

      <Container maxWidth="sm">
        <Grid container spacing={1} style={{backgroundColor:"gray"}}>
            <Paper >Willkommen </Paper>
                <form noValidate autoComplete="off" style={{}}>
                    <TextField
                    id="outlined-basic"
                    label="E-Mail"
                    variant="outlined"
                    label="E-Mail"
                    />

                    <TextField
                    id="outlined-basic"
                    label="Passwort"
                    variant="outlined"
                    label="Passwort"
                    type="password"
                    autoComplete="current-password"
                    variant="filled"
                    />

                    <Button variant="contained" color="secondary">
                    Log In
                    </Button>

                </form>


        </Grid>

     </Container>

     </div>

    );
  }
}

export default App;




