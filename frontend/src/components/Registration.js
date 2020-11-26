import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, Grid, Container, TextField, Typography, withStyles } from '@material-ui/core';
import { StudentBO } from '../api';

// nur um zu üben / wieder in react reinzukommen


class Registration extends React.Component {
    
    handleOnClickRegistration(e){
        // hier muss eine funktion für api rein
        // um die übermittelten daten aus textfields
        // ins backend zu schieben
        console.log(e);
    }

    render(){
        return (
            <div>
                <Container maxWidth="sm">
                    <Typography variant="h3">Registration as a student</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="MatrikelNR"
                                name="MatrikelNR"
                                variant="outlined"
                                type="number"
                                required
                                fullWidth
                                id="MatrikelNR"
                                label="Your Matrikel-Number"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="StudentPW"
                                name="StudentPW"
                                variant="outlined"
                                type="password"
                                // calls handle function, displays every change in
                                // password field in console, testing how to save the values in Students
                                onChange={(e) => {this.handleOnClickRegistration(e.target.value);}}
                                required
                                fullWidth
                                id="StudentPW"
                                label="Your Password"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="StudentName"
                                name="StudentName"
                                variant="outlined"
                                required
                                fullWidth
                                id="StudentName"
                                label="Full Name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="StudentMail"
                                name="StudentMail"
                                variant="outlined"
                                required
                                fullWidth
                                id="StudentMail"
                                label="Your Mailadress"
                                autoFocus
                            />
                        </Grid> 
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="StudentStudy"
                                name="StudentStudy"
                                variant="outlined"
                                required
                                fullWidth
                                id="StudentStudy"
                                label="Your Study"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button 
                                variant="outlined" 
                                color="secondary" 
                                href="./index.js"
                                fullWidth
                                size="large"
                                label="Abandom"
                            >
                                Back to Log-In Page
                            </Button>
                        </Grid>   
                        <Grid item xs={12} sm={6}>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                onClick={this.handleOnClickRegistration} 
                                fullWidth
                                size="large"
                                label="Complete Registration"
                            >
                                Complete Registration
                            </Button>
                        </Grid>                       
                    </Grid>
                </Container>
            
            </div>
        )
    }    

}

export default Registration
