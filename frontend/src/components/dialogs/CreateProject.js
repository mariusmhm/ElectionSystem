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
import {ElectionSystemAPI, ProjecttypeBO} from '../../api';

let open = true;

class CreateProject extends Component {


    constructor(props) {
      super(props);

      const pt='';
      const showETCS = false;

      this.state = {
        projectname:'',
        modules: [],
        edvNumber: '',
        projecttypes: [],
        ptSelected: {},
        numSpots: '',
        additionalProfessor: [],
        weekly: false,
        specialRoom: '',
        shortDescription: '',
        language: '',
        externalPartner: '',
        numBlockdaysPriorLecture: '',
        numNlockdaysDuringlecture: '',
        blockdaysInExam: '',
        error: null
      }
      this.baseState = this.state;
    } 

    
    getAllProjecttypes = () => {
        ElectionSystemAPI.getAPI().getAllProjecttypes()
        .then(projecttypesBOs =>
            this.setState({
                projecttypes: projecttypesBOs,
                error: null
            })).catch(e =>
                this.setState({
                    projecttypes:[],
                    error: e
                }))
    }
    
    
    componentDidMount(){
        this.getAllProjecttypes();
    }

    // Add a new Project 
     addProject = () => {
    
         
    }

    selectHandleChangeProjecttype = (e) =>{
       
        this.pt = this.state.projecttypes[e.target.value].getEcts();
        this.setState({
            ptSelected: this.state.projecttypes[e.target.value]
        },
        function(){
            console.log(this.pt);
            console.log(this.state.ptSelected);

        });
        this.showETCS = true;
    }

    handleClose = () => {
        this.setState({
          open: false
        });
    } 

    
    
 render(){
    const { classes } = this.props; 
    const { modules, edvNumber, projecttypes, numSpots, additionalProfessor, weekly, specialRoom, roomDesired, shortDescription, language, externalPartner,
         numBlockdaysPriorLecture, numBlockdaysDuringLecture, blockdaysInExam, ptSelected } = this.state;

    return(
      
        <Dialog open={open} fullWidth maxWidth='md'>
            <DialogTitle fontcolor='primary' className={classes.dialogHeader}>SUBMIT PROJECT</DialogTitle>
            <Grid container spacing={2} justify="center" driection="row" className={classes.grid} >
                
                <Grid item container direction="column" xs={12} md={6} spacing={2}>
                    <Grid item xs={12}>
                        <TextField fullWidth variant="outlined" label="Projectname:"/>
                    </Grid>
                    <Grid item>
                        <FormControl fullWidth variant="outlined" className={classes.FormControl}>
                            <InputLabel>Module</InputLabel>
                            <Select label="Module">
                                <MenuItem>none</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <TextField fullWidth variant="outlined" label="EDV-number:" /* value={edvNumber} *//>
                    </Grid>
                    <Grid item>
                            <FormControl fullWidth variant="outlined" className={classes.FormControl}>
                                <InputLabel>Project type</InputLabel>
                                <Select label="Projecttype" onChange={this.selectHandleChangeProjecttype}>
                                    {this.state.projecttypes.map((ptype, index) => (
                                        <MenuItem key={index} value={index}>{ptype.getName()}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                    </Grid>
                    <Grid item container justify="space-between">
                        <Grid item>
                            <Typography>ETCS: {this.showETCS ? this.state.ptSelected.getEcts() : null}</Typography>
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