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

let open= true;

class DeleteStudent extends Component {

 render(){
    const { classes } = this.props;

    return(
        <Dialog open={open}>

         <Typography
                variant="h5"
                align="center"
                color="secondary">
                    Sind Sie sicher?
            </Typography>
            <Typography
                variant="outlined"
                align="center">
                   Bla bla
            </Typography>
            <Grid container spacing={2} justify="center" className={classes.grid} >

                <Grid item>
                    <Button variant="outlined" color="secondary">Abbrechen</Button>

                <Grid>
                    <br/>
                </Grid>
                </Grid>
                <Grid item>
                    <Button variant="outlined">Sicher</Button>
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
