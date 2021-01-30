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
import {ElectionSystemAPI, StudentBO} from '../../api';

/**
* Dialog for Participation List provides a query for deleting a student
*/



let open= true;

class DeleteStudent extends Component {

  constructor(props){
    super(props)
    this.state= {
        student: {},
        deletingError: null,
        error: null,

    };
        this.baseState = this.state;
  }


    deleteStudentHandler = (student) => {
        console.log(student);
        ElectionSystemAPI.getAPI().deleteStudent(student.getID()).then(student=> {
          console.log(student);
        }).catch(e =>
          this.setState({
            deletingError: e
          })
        );
    }
 /** Handles the cancel button click event */
    handleClose = () => {
        this.setState({
          open: false
        });
    }


/** Renders the component */
 render(){
    const { classes } = this.props;

    return(
        <Dialog open={open}>

         <Typography
                variant="h5"
                align="center"
                color="secondary">
                    Are you sure?
            </Typography>
                <Grid>
                    <br/>
                </Grid>
            <Typography
                variant="outlined"
                align="center">
                   Student XY will be removed from the participant list of Project XY.
            </Typography>
                <Grid>
                    <br/>
                </Grid>
            <Grid container spacing={2} justify="center" className={classes.grid} >

                <Grid item>
                    <Button variant="outlined" color="secondary" onClick={this.handleClose}>Cancel</Button>

                <Grid>
                    <br/>
                </Grid>
                </Grid>
                <Grid item>
                    <Button aria-label="delete" variant="outlined" onClick={() => this.deleteStudentHandler(student)}>Sure</Button>
                </Grid>

            </Grid>

        </Dialog>
    );
 }

}


const styles = theme => ({
    grid:{
        width: '100%',
        margin: '0px'
    }
});


export default withStyles(styles)(DeleteStudent);
