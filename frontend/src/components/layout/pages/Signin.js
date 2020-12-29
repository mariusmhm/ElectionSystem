import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core';
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
		const { classes} = this.props; 
        return (
				<Grid container spacing={2} direction="column" justify="center" alignItems="center" className={classes.grid}>
					<Grid item>
                    <Typography textColor='primary_red' variant='h4'> Hochschule der Medien</Typography>
					</Grid>
					<Grid item>
                    <Typography variant='h4'>Welcome to the ElectionSystem for HdM Projects.</Typography>
					</Grid>
					<Grid item>
	                <Typography variant='h6'>This page appeares, if you are not signed in.</Typography>
					</Grid>
					<Grid item>
	                <Typography variant='h6'>To use the services of the HdM ElectionSystem please</Typography>
					</Grid>
	                <Grid item>
						<Button variant='contained' color='primary' onClick={this.handleSignInButtonClicked}>
							Sign in with Google
      			        </Button>
					</Grid>
				</Grid>
		);
	}
}


const styles = theme => ({
	grid: {
		marginTop: theme.spacing(6)
	}
});


Signin.propTypes = {
	classes: PropTypes.object.isRequired,
	handleSignIn: PropTypes.func.isRequired}


export default  withStyles(styles)(Signin);



