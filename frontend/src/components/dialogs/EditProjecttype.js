import React, {Component} from 'react';
import {Dialog,
    DialogTitle,
    MenuItem,
    Select,
    InputLabel,
    TextField,
    RadioGroup,
    FormControl,
    FormControlLabel,
    Radio,
    Button,
    Grid,
    Typography} from'@material-ui/core';
import {withStyles} from '@material-ui/core';

let open = true;

class EditProjecttype extends Component {


    constructor(props) {
      super(props);

      }



 render(){
    const { classes } = this.props;
    /* const { module, edvNumber, projecttype, numSpots, additionalProfessor, weekly, specialRoom, roomDesired, shortDescription, language, externalPartner,
         numBlockdaysPriorLecture, numBlockdaysDuringLecture, blockdaysInExam } = this.state; */

    return(


        <Dialog open={open} fullWidth maxWidth='md'>
            <DialogTitle fontcolor='primary'className={classes.dialogHeader} >EDIT PROJECTTYPE</DialogTitle>
            <Grid container spacing={2} justify="center" direction="row" className={classes.grid} >

                <Grid item container direction="column" xs={12} md={6} spacing={3}>
                <DialogTitle fontcolor='primary'className={classes.dialogHeader} >PROJECTTYPE</DialogTitle>

                    <Grid item xs={12} >
                    <Typography>Subject-specific project</Typography>
                    </Grid>

                    <Grid item xs={12}>
                    <Typography>Interdisciplinary projects</Typography>
                    </Grid>

                    <Grid item xs={12}>
                    <Typography>Transdisciplinary projects</Typography>
                    </Grid>

                    <Grid item xs={12}>
                    <Typography>Ways of Working</Typography>
                    </Grid>

                    <Grid item xs={12}>
                    <Typography>Tools of Working</Typography>
                    </Grid>

                    <Grid item xs={12}>
                    <Typography>Working in a Media World</Typography>
                    </Grid>


                </Grid>







                </Grid>

 <Grid container spacing={2} justify="center" driection="row" className={classes.grid} >
                <Grid item>
                    <Button variant="outlined" onClick={this.handleClose}>Cancel</Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary">Submit</Button>
                </Grid>
</Grid>


        </Dialog>
    );
 }


}

const styles = theme => ({
    grid:{
        width: '100%',
        margin: '0px',
        padding: '20px'
    },
    dialogHeader:{
        textAlign: "center"
    }
});


export default withStyles(styles)(EditProjecttype);