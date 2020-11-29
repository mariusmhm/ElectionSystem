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

class CreateProject extends Component {


    constructor(props) {
        super(props);

        /* this.state = {
            module: module,
            edvNumber: edvn,
            projecttype: type,
            numSpots: nSpots,
            additionalProfessor: addProfessor,
            weekly: false,
            specialRoom: room,
            shortDescription: sd,
            language: language,
            externalPartner: externalP,
            numBlockdaysPriorLecture: numBdPL,
            numNlockdaysDuringlecture: nmBdDL,
            blockdaysInExam: bdExam,
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
    /* const { module, edvNumber, projecttype, numSpots, additionalProfessor, weekly, specialRoom, roomDesired, shortDescription, language, externalPartner,
         numBlockdaysPriorLecture, numBlockdaysDuringLecture, blockdaysInExam } = this.state; */

    return(
      
        <Dialog open={open} fullWidth maxWidth='md'>
            <DialogTitle fontcolor='primary'className={classes.dialogHeader} >SUBMIT PROJECT</DialogTitle>
            <Grid container spacing={2} justify="center" driection="row" className={classes.grid} >
                
                <Grid item container direction="column" xs={12} md={6} spacing={2}>
                    <Grid item xs={12}>
                        <TextField fullWidth variant="outlined" label="Projectname:"/>
                    </Grid>
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
                        <TextField fullWidth variant="outlined" label="External co-orperation partner:" /* value={externalPartner} */ />
                    </Grid>
                    <Grid item>
                        <Typography>Weekly lecture:</Typography>
                        <FormControl>
                                <RadioGroup row={true} /* value={weekly} */>
                                <FormControlLabel value="true" control={<Radio />} label="yes" />
                                <FormControlLabel value="false" control={<Radio />} label="no" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                </Grid>

                <Grid item container direction="column" xs={12} md={6} spacing={2}>
                    <Grid item>
                        <TextField fullWidth variant="outlined" multiline rows={10} label="Short description:" /* value={shortDescription} *//>
                    </Grid>
                    <Grid item>
                        <Typography>Particular room necessary:</Typography>
                        <FormControl>
                                <RadioGroup row={true} /* value={specialRoom} */>
                                <FormControlLabel value="true" control={<Radio />} label="yes" />
                                <FormControlLabel value="false" control={<Radio />} label="no" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <TextField fullWidth variant="outlined" multiline rows={3} label="Desired room:" /* value={roomDesired} *//>
                    </Grid>
                    <Grid item>
                        <FormControl fullWidth variant="outlined" className={classes.FormControl}>
                        <InputLabel >Blockdays prior to semester</InputLabel>
                            <Select label="Präsenztermine" /* value={numBlockdaysPriorLecture} */>
                                <MenuItem>none</MenuItem>
                                <MenuItem>1</MenuItem>
                                <MenuItem>2</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl fullWidth variant="outlined" className={classes.FormControl}>
                        <InputLabel>Blockdays during the semester</InputLabel>
                            <Select label="Blocktage" /* value={numBlockdaysDuringLecture} */>
                                <MenuItem value="">none</MenuItem>
                                <MenuItem>1</MenuItem>
                                <MenuItem>2</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <Typography>For interdisciplinary/ transdisciplinary Projects:</Typography>
                        <FormControl fullWidth variant="outlined" className={classes.FormControl}>
                        <InputLabel >Blockdays during exam week</InputLabel>
                            <Select label="Blockdays" /* value={blockdaysInExam} */>
                                <MenuItem>none</MenuItem>
                                <MenuItem>1</MenuItem>
                                <MenuItem>2</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                </Grid>
                
                
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


export default withStyles(styles)(CreateProject);