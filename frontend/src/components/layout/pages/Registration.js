import React, {Component} from 'react';
import {withStyles} from '@material-ui/core';
import { Button, 
        Icon, 
        Grid, 
        Container, 
        TextField, 
        Typography, 
        FormControl,
        FormControlLabel,
        FormLabel,
        RadioGroup,
        Radio } from '@material-ui/core';






    
class Registration extends Component {
    constructor(props) {
        super(props);
    
        // Init the state
        this.state = {
          student: false,
        };
    }
        

    render(){
        if(this.state.student){
            return(
                <Typography>Student</Typography>
            )
        }
        return (
            <Grid container spacing={2} direction="column" justify="center" alignItems="center">
                <Grid item>
                    <Typography>Registration</Typography> 
                </Grid>
                <Grid item>
                    <TextField fullWidth variant="outlined" label="Firstname"/>
                </Grid>
                <Grid item>
                    <TextField fullWidth variant="outlined" label="Lastname"/>
                </Grid>
                <Grid item>
                    <FormControl>
                        <RadioGroup row={true}>
                            <FormControlLabel value="student" control={<Radio />} label="Student" />
                            <FormControlLabel value="professor" control={<Radio />} label="Professor" />
                            <FormControlLabel value="admin" control={<Radio />} label="Admin" />
                        </RadioGroup>
                    </FormControl>
                </Grid>


            </Grid>

                
            
        )
    }    

}

const styles = theme => ({
    grid:{
        width: '100%',
        margin: '0px'
    }
});

export default withStyles(styles)(Registration);