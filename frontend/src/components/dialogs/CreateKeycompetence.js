mport React, {Component} from 'react';
import {Dialog,
    DialogTitle,
    MenuItem,
    Select,
    InputLabel,
    TextField,
    FormControl,
    Button,
    Grid,
    Typography} from'@material-ui/core';
import {withStyles} from '@material-ui/core';

let open = true;

class KeyCompetence extends Component {
 constructor(props) {
      super(props);

      const pt='';
      const showETCS = false;

      this.state = {
        modules: [],
        edvNumber: '',
        projecttypes: [],
        numSpots: '',
        additionalProfessor: [],
        shortDescription: '',
        language: '',
        error: null
      }
      this.baseState = this.state;
    }




 render(){
    const { classes } = this.props;
    /* const { modules, edvNumber, projecttypes, numSpots, additionalProfessor, shortDescription, language} = this.state; */

    return(

        <Dialog open={open} fullWidth maxWidth='md'>
            <DialogTitle fontcolor='primary'className={classes.dialogHeader}>KEY COMPETENCE</DialogTitle>
            <Grid container spacing={2} justify="center" driection="row" className={classes.grid} >

                <Grid item container direction="column" xs={12} md={6} spacing={2}>
                    <Grid item>
                        <FormControl fullWidth variant="outlined" className={classes.FormControl}>
                            <InputLabel>Module</InputLabel>
                            <Select label="Module" /* value={modules} */>
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
                                <Select label="Projecttype" /* value={projecttypes} */>
                                    <MenuItem>Subject-specific Project </MenuItem>
                                    <MenuItem>Transdisciplinary Project</MenuItem>
                                </Select>
                            </FormControl>
                    </Grid>
                    <Grid item container justify="space-between">
                        <Grid item>
                            <Typography>ETCS:{this.showETCS ? this.state.ptSelected.getEcts() : null}</Typography>
                        </Grid>
                        <Grid item>
                        <Typography>SWS: {this.showETCS ? this.state.ptSelected.getSws() : null}</Typography>
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
                    <Grid item xs={12} align="center">
                <Grid item>
                    <Button variant="outlined" onClick={this.handleClose}>Cancel</Button>
                </Grid>
                </Grid>
                <Grid item xs={12} align="center">
                <Grid item>
                    <Button variant="contained" color="primary">Submit</Button>
                </Grid>
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
