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

class KeyCompetence extends Component {


    constructor(props) {
      super(props);
/*
      let fn = '';
    if (props.customer) {
      fn = props.customer.getProjectName();
    }
    // Init the State
    this.state = {
      projectName: fn,
      };
    // Add a new KeyCompetence ???
     addProject = () => {
    let newProject = new ProjectBO(this.state.projectName);
    BankAPI.getAPI().addProject(newProject).then(project => {
      // Backend call sucessfull
      // reinit the dialogs state for a new empty customer
      this.setState(this.baseState);
      this.props.onClose(customer); // call the parent with the customer object from backend
    }).catch(e =>
      this.setState({
        updatingInProgress: false,    // disable loading indicator
        updatingError: e              // show error message
      })
    );*/
        /* this.state = {
            module: module,
            edvNumber: edvn,
            projecttype: type,
            numSpots: nSpots,
            additionalProfessor: addProfessor,
            shortDescription: sd,
            language: language
          } */
      }

      /* handleClose = () => {
        this.setState({
          open: false
        });
      } */

      /**Handles value changes of the select input fields */
      /* selectFieldHandleChange=(event)=>{
          const value = event.target.value;
          this.setState({
            module:
          });
      } */

 render(){
    const { classes } = this.props;
    /* const { module, edvNumber, projecttype, numSpots, additionalProfessor, shortDescription, language} = this.state; */

    return(

        <Dialog open={open} fullWidth maxWidth='md'>
            <DialogTitle fontcolor='primary'className={classes.dialogHeader} >KEY COMPETENCE</DialogTitle>
            <Grid container spacing={2} justify="center" driection="row" className={classes.grid} >

                <Grid item container direction="column" xs={12} md={6} spacing={2}>
                    <Grid item>
                        <FormControl fullWidth variant="outlined" className={classes.FormControl}>
                            <InputLabel>Module</InputLabel>
                            <Select label="Module" /* value={module} */>
                                <MenuItem>none</MenuItem>
                                <MenuItem>Technology</MenuItem>
                                <MenuItem>Media/Cultur</MenuItem>
                                <MenuItem>Management</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <TextField fullWidth variant="outlined" label="EDV-number:" /* value={edvNumber} *//>
                    </Grid>
                    <Grid item>
                            <FormControl fullWidth variant="outlined" className={classes.FormControl}>
                                <InputLabel>Project type</InputLabel>
                                <Select label="Projecttype" /* value={projecttype} */>
                                    <MenuItem>Subject-specific Project </MenuItem>
                                    <MenuItem>Transdisciplinary Project</MenuItem>
                                </Select>
                            </FormControl>
                    </Grid>
                    <Grid item container justify="space-between">
                        <Grid item>
                            <Typography>ETCS:</Typography>
                        </Grid>
                        <Grid item>
                        <Typography>SWS:</Typography>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <FormControl fullWidth variant="outlined" className={classes.FormControl}>
                        <InputLabel>Number of spots</InputLabel>
                            <Select label="Particpiant" /* value={numbSpots} */>
                                <MenuItem>none</MenuItem>
                                <MenuItem>1</MenuItem>
                                <MenuItem>2</MenuItem>
                                <MenuItem>3</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl fullWidth variant="outlined" className={classes.FormControl}>
                        <InputLabel>Additional professors</InputLabel>
                            <Select label="Professoren" /* value={additionalProfessor} */>
                                <MenuItem>Susanne Stingel</MenuItem>
                                <MenuItem>Mike Friedrichsen</MenuItem>
                                <MenuItem>Martin Engstler</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl fullWidth variant="outlined" className={classes.FormControl}>
                            <InputLabel>Language</InputLabel>
                            <Select label="Sprache" /* value={language} */>
                                <MenuItem>none</MenuItem>
                                <MenuItem>german</MenuItem>
                                <MenuItem>english</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <TextField fullWidth variant="outlined" multiline rows={10} label="Short description:" /* value={shortDescription} *//>
                    </Grid>
                <Grid item>
                    <Button variant="outlined" onClick={this.handleClose}>Cancel</Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary">Submit</Button>
                </Grid>
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


export default withStyles(styles)(KeyCompetence);