import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { Button, Typography} from '@material-ui/core';
import PropTypes from 'prop-types';

/**import {ThemeProvider} from '@material-ui/core/styles';**/
//This will be the signin page. The user will thus be able to sign in to the ElectionSystem.
//Users are professors, admins and students.

class Signin extends Component {

    handleSignInButtonClicked = () => {
        this.props.handleSignIn();
    }
    /** Renders the sign in page, if user objext is null */

    render() {
        return (
            <div>
                    <Typography variant='h1' align='center'textColor='primary_red'> Hochschule der Medien</Typography>
                    <Typography  align='center' variant='h3'>Welcome to the ElectionSystem for HdM Projects.</Typography>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
	                <Typography  align='center' variant='h6'>This page appeares, if you are not signed in.</Typography>
	                <Typography  align='center' variant='h6'>To use the services of the HdM ElectionSystem please</Typography>
	                <br/>
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


/**const styles = theme => ({
	root: {
		margin: theme.spacing(2)
	}
});**/


Signin.propTypes = {
	classes: PropTypes.object.isRequired,
	handleSignIn: PropTypes.func.isRequired}


export default Signin;



