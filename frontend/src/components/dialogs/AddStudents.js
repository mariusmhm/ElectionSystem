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
//import SearchBar from "material-ui-search-bar";

let open= true;

class AddStudents extends Component {

 render(){
    const { classes } = this.props;

    return(
        <Dialog open={open}>

         <Typography
                variant="h5"
                align="center">
                    STUDENT/-IN HINZUFÜGEN
            </Typography>
            <Typography
                variant="outlined"
                align="center">
                   Student XY wird aus der Teilnehmerliste von Projekt XY entfernt.
            </Typography>

    //<SearchBar
      dataSource={state.dataSource}
      onChange={(value) => setState({dataSource: [ value, value+value, value+value+value]})}
      onRequestSearch={() => console.log('onRequestSearch')}
      style={{
        margin: '0 auto',
        maxWidth: 800
      }}
    />



            <Grid container spacing={2} justify="center" className={classes.grid} >

                <Grid item>
                    <Button variant="outlined" color="secondary">Abbrechen</Button>

                <Grid>
                    <br/>
                </Grid>
                </Grid>
                <Grid item>
                    <Button variant="outlined">Hinzufügen</Button>
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


export default withStyles(styles)(AddStudents);
