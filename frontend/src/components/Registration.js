import React from 'react';
import PropTypes from 'prop-types';
import { Button, 
        Icon, 
        Grid, 
        Container, 
        TextField, 
        Typography, 
        withStyles, 
        FormControl,
        FormControlLabel,
        FormLabel,
        RadioGroup,
        Radio } from '@material-ui/core';
import { StudentBO } from '../api';
import { render } from '@testing-library/react';

// nur um zu üben / wieder in react reinzukommen
function showRegistrationFields () {
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

                    <RadioBtnRole />
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
                                //onClick={this.handleOnClickRegistration} 
                                fullWidth
                                size="large"
                                label="Complete Registration"
                            >
                                Complete Registration
                            </Button>
                        </Grid>                       
                    </Grid>
    
}

function RadioBtnRole (){
    const [value, setValue] = React.useState('professor');
    
    const handleRadioBtnChange = (e) => {
        setValue(e.target.value);
    }

    return (
        <FormControl component="fieldset">
        <FormLabel component="role">Role</FormLabel>
        <RadioGroup row aria-label="role" name="role" value={value} onChange={handleRadioBtnChange}>
            <FormControlLabel value="student" control={<Radio />} label="Student" onClick={showRegistrationFields}/>
            <FormControlLabel value="professor" control={<Radio />} label="Professor" />
            <FormControlLabel value="admin" control={<Radio />} label="Administration" />
        </RadioGroup>
        </FormControl>
    )
}
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
                    <Typography variant="h3">Complete Registration</Typography>
                    <RadioBtnRole />
                </Container>
            </div>
        )
    }    

}

export default Registration
