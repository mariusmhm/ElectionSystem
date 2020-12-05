import React, { Component } from 'react';
import Header from './components/layout/Header';
import Grid from '@material-ui/core/Grid';
import Registration from './components/Registration';
import { Button, Typography} from '@material-ui/core';
import PropTypes from 'prop-types';

//This is for testing approaches

class App extends Component {

handleSignInButtonClicked = () => {
this.props.onSignIn();
}
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
        <Typography  align='center' variant='h6'>Welcome to the HdM ElectionSystem</Typography>
	    <Typography  align='center'>It appears, that you are not signed in.</Typography>
	    <Typography  align='center'>To use the services of the HdM Election System please</Typography>
	    <Grid container justify='center'>
					<Grid item>
						<Button variant='contained' color='primary' onClick={this.handleSignInButtonClicked}>
							Sign in with Google
      			</Button>
					</Grid>
				</Grid>
			</div>
		);
	}
}



PropTypes
SignIn.propTypes = {
	classes: PropTypes.object.isRequired,
	onSignIn: PropTypes.func.isRequired,}

export default App;
