import React, {Component} from 'react';
import {Dialog,
    MenuItem,
    Select,
    InputLabel,
    TextField,
    FormLabel,
    RadioGroup,
    FormControl,
    FormControlLabel,
    Radio,
    Button,
    Grid,
    Typography} from'@material-ui/core';
import {withStyles} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';


let open= true;

class AddStudents extends Component {



 /** Handles the close / cancel button click event */
  handleClose = () => {
    // Reset the state
    this.setState(this.baseState);
    this.props.onClose(null);
  }


 render(){
    const { classes } = this.props;



    return(
        <Dialog open={open}>

         <Typography
                variant="h5"
                align="center">
                    ADD STUDENT
            </Typography>
                <Grid>
                    <br/>
                </Grid>
            <Autocomplete
              id="combo-box-demo"
              options={ExampleStudents}
              getOptionLabel={(option) => option.title}
              style={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Search Student" variant="outlined" />}
            />
                <Grid>
                    <br/>
                </Grid>
            <Grid container spacing={2} justify="center" className={classes.grid} >

                <Grid item>
                    <Button variant="outlined" color="secondary" className={classes.button}>Cancel</Button>

                <Grid>
                    <br/>
                </Grid>
                </Grid>
                <Grid item>
                    <Button variant="outlined">Add</Button>
                </Grid>

            </Grid>

        </Dialog>
    );
 }

}
const ExampleStudents = [
  { title: 'Max Mustermann'},
  { title: 'Max Mustermann'},
  { title: 'Max Mustermann'},
];

const styles = theme => ({
    grid:{
        width: '100%',
        margin: '0px'
    }
});


export default withStyles(styles)(AddStudents);
