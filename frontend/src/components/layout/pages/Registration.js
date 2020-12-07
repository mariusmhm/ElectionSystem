import React, {Component} from 'react';
import {withStyles} from '@material-ui/core';
import { Button, 
        Grid, 
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
            show:false,
            role:'',
            firstname:'',
            lastname:'',
            matrikelnumber:'',
            study:''
        };

    }

    handleRadioChange = e => {
        const  value = e.target.value;
        console.log(value);
        this.setState({
            role: value,
          });

        if(value==='student'){
            this.setState({
                show: true
              });
    
        }else{
            this.setState({
                show: false
              });
        }
    };

    addUser = e => {
        if(this.state.role==='student'){
            console.log('addStudent');
        }else{
            console.log('addProforAdministration');
        }
    };
        

    render(){
        const { classes } = this.props; 
        return (
            <Grid container spacing={2} direction="column" justify="center" alignItems="center" className={classes.grid}>
            
                <Grid item>
                    <Typography className={classes.headline}>REGISTRATION</Typography> 
                </Grid>
                <Grid item>
                    <TextField fullWidth variant="outlined" label="Firstname"/>
                </Grid>
                <Grid item>
                    <TextField fullWidth variant="outlined" label="Lastname"/>
                </Grid>
                <Grid item>
                    <FormControl>
                        <RadioGroup row={true} onChange={this.handleRadioChange} value={this.state.value}>
                            <FormControlLabel value="student"  control={<Radio color="primary"/>} label="Student" />
                            <FormControlLabel value="professor"  control={<Radio color="primary"/>} label="Professor" />
                            <FormControlLabel value="admin" control={<Radio color="primary"/>} label="Admin" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
            
                {
                    this.state.show?
                    <Grid container spacing={2} direction="column" justify="center" alignItems="center">
                    <Grid item >
                        <TextField fullWidth variant="outlined" label="Matrikelnumber"/>
                    </Grid>
                    <Grid item>
                        <TextField fullWidth variant="outlined" label="Course of studies"/>
                    </Grid>
                    </Grid>
                    :null

                }
                
                <Grid container row={true} justify="center" alignItems="center" spacing={2} className={classes.button}> 
                    <Grid item>
                        <Button variant="outlined" color="primary" >Cancel</Button>
                    </Grid>
                    <Grid item>
                    <Button variant="contained" color="primary" onClick={this.addUser}>Register</Button>
                    </Grid>
                </Grid>


            </Grid>
          

                
            
        )
    }    

}

const styles = theme => ({
    grid:{
        width: '100%',
        display: 'flex',
        marginTop: theme.spacing(6)    
    },
    headline:{
        color: theme.palette.darkGray,
        fontFamily: 'Arial',
        fontStyle: 'bold',
        fontSize: 25

    },
    button:{
        marginTop: theme.spacing(2)
    }
});

export default withStyles(styles)(Registration);