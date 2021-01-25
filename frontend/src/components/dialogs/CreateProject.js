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
import DateFnsUtils from "@date-io/date-fns";
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import {ElectionSystemAPI, ProjectBO} from '../../api';


class CreateProject extends Component {


    constructor(props) {
      super(props);

        
        let today = new Date(),
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

      this.state = {
        creationDate: date,
        projectname:'',
        modules: [],
        moduleSelected: null,
        edvNumber: null,
        projecttypes: [],
        projecttype: {},
        ptSelected: null,
        numSpots: null,
        professors: [],
        additionalProf: null,
        weekly: false,
        specialRoom: false,
        desiredRoom: null,
        shortDescription: '',
        language: '',
        externalPartner: null,
        numBlockdaysPriorLecture: null,
        numBlockdaysDuringLecture: null,
        dateDuringLecture: null,
        numBlockdaysInExam: null,
        error: null,
        spots: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 
            15 , 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
            28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40]
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

    getAllModules = () => {
        ElectionSystemAPI.getAPI().getAllModules()
        .then(moduleBOs =>{
            this.setState({
                modules: moduleBOs,
                error: null
            });
        }).catch(e =>
                this.setState({
                    modules:[],
                    error: e
                }))
    }

    getUsersForRole = () => {
        ElectionSystemAPI.getAPI().getUserForRole(3)
        .then(userBOs =>{
            this.setState({
                professors: userBOs,
                error: null
            });
        }).catch(e =>
                this.setState({
                    professors:[],
                    error: e
                }))
    }
    
    
    componentDidMount(){
        this.getAllProjecttypes();
        this.getAllModules();
        this.getUsersForRole()
    }

    // Add a new Project 
     addProject = () => {
        let newProject = new ProjectBO();
        newProject.setDate(this.state.creationDate);
        newProject.setName(this.state.projectname);
        newProject.setModule(this.state.moduleSelected);
        newProject.setProjecttype(this.state.ptSelected);
        newProject.setNumSpots(this.state.numSpots);
        newProject.setAddProfessor(this.state.additionalProf);
        newProject.setEdvNumber(this.state.edvNumber);
        newProject.setShortDescription(this.state.shortDescription);
        newProject.setState(1);
        newProject.setLanguage(this.state.language);
        newProject.setProfessor(2); //prof id vom current user hier einsetzen
        newProject.setExternalPartner(this.state.externalPartner);
        newProject.setWeekly(this.state.weekly);
        newProject.setSpecialRoom(this.state.specialRoom);
        newProject.setRoomDesired(this.state.desiredRoom);
        newProject.setNumBlockDaysPriorLecture(this.state.numBlockdaysPriorLecture);
        newProject.setNumBlockDaysDuringLecture(this.state.numBlockdaysDuringLecture);
        newProject.setDateBlockDaysDuringLecture(this.state.dateDuringLecture);
        newProject.setNumBlockDaysInExam(this.state.numBlockdaysInExam);
        console.log(JSON.stringify(newProject));
        console.log(this.state.numBlockdaysDuringLecture);
        ElectionSystemAPI.getAPI().addProject(newProject).then(projectBO => {
            this.showETCS = false;
            this.setState(this.baseState);
            
        }).catch(e =>
            this.setState({
                error: e
            }))
         
    }

    selectHandleChangeProjecttype = (e) =>{
        this.setState({
            projecttype: this.state.projecttypes[e.target.value],
            ptSelected: this.state.projecttypes[e.target.value].getID()
        });
        this.showETCS = true;
    }

    handleChange = (e) =>{
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleChangeNum = (e) =>{
        this.setState({
            [e.target.id]: parseInt(e.target.value, 10)
        });               
    }

    handleSelectChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    roomHandleChange = (e) =>{
        if(e.target.value === "true"){
            this.setState({
                specialRoom: true
            })
        }else if(e.target.value){
            this.setState({
                specialRoom: false
            })
        }
    }

    handleDateChange = (date) =>{
        const nDate = new Date(date);
        const nD = nDate.getFullYear() + '-' + (nDate.getMonth() + 1) + '-' + nDate.getDate();
        this.setState({
            dateDuringLecture: nD
        })
    }

    handleClose = () => {
        this.setState({
          open: false
        });
    } 

    
    
 render(){
    const { classes } = this.props; 

    return(
      
        <Dialog open={true} fullWidth maxWidth='md'>
            <DialogTitle fontcolor='primary' className={classes.dialogHeader}>SUBMIT PROJECT</DialogTitle>
            <Grid container spacing={2} justify="center" driection="row" className={classes.grid} >
                
                <Grid container item direction="column" xs={12} md={6} spacing={2}>
                    <Grid item>
                        <TextField fullWidth required variant="outlined" id="projectname" label="Name:" onChange={this.handleChange} value={this.state.projectname}/>
                    </Grid>
                    <Grid item>
                        <FormControl fullWidth required variant="outlined" className={classes.FormControl}>
                            <InputLabel>Module</InputLabel>
                            <Select name="moduleSelected" defaultValue="" label="Module" onChange={this.handleSelectChange}>
                                {this.state.modules.map((module) => (
                                        <MenuItem key={module.getID()} value={module.getID()}>{module.getName()}</MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <TextField fullWidth required variant="outlined" id="edvNumber" label="EDV-number:" onChange={this.handleChangeNum} value={this.state.edvNumber || ''}/>
                    </Grid>
                    <Grid item>
                            <FormControl fullWidth required variant="outlined" className={classes.FormControl}>
                                <InputLabel>Project type</InputLabel>
                                <Select label="Projecttype" defaultValue="" onChange={this.selectHandleChangeProjecttype}>
                                    {this.state.projecttypes.map((ptype, index) => (
                                        <MenuItem key={index} value={index}>{ptype.getName()}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                    </Grid>
                    <Grid container item justify="space-between">
                        <Grid item>
                            <Typography>ETCS: {this.showETCS ? this.state.projecttype.getEcts() : null}</Typography>
                        </Grid>
                        <Grid item>
                            <Typography>SWS: {this.showETCS ? this.state.projecttype.getSws() : null}</Typography>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <FormControl fullWidth required variant="outlined" className={classes.FormControl}>
                        <InputLabel>Number of spots</InputLabel>
                            <Select name="numSpots" defaultValue="" label="Number of spots" onChange={this.handleSelectChange}>
                            {this.state.spots.map((number, index) => (
                                        <MenuItem key={index} value={number}>{number}</MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl fullWidth variant="outlined" className={classes.FormControl}>
                        <InputLabel>Additional professors</InputLabel>
                            <Select name="additionalProf" defaultValue="" label="Additional professors" onChange={this.handleSelectChange}>
                                {this.state.professors.map((prof) => (
                                        <MenuItem key={prof.getID()} value={prof.getID()}>{prof.getFirstname()} {prof.getName()}</MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl fullWidth required variant="outlined" className={classes.FormControl}>
                            <InputLabel>Language</InputLabel>
                            <Select name="language" defaultValue="" label="language" onChange={this.handleSelectChange}>
                                <MenuItem value="german">german</MenuItem>
                                <MenuItem value="english">english</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <TextField fullWidth variant="outlined" label="External co-orperation partner:" id="externalPartner" onChange={this.handleChange}/>
                    </Grid>
                    <Grid item>
                        <Typography>Particular room necessary:</Typography>
                        <FormControl>
                                <RadioGroup row={true} id="specialRoom" onChange={this.roomHandleChange} value={String(this.state.specialRoom)}>
                                <FormControlLabel value="true" control={<Radio />} label="yes" />
                                <FormControlLabel value="false" control={<Radio />} label="no" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    { this.state.specialRoom ?
                    <Grid item>
                        <TextField fullWidth variant="outlined" multiline rows={2} id="desiredRoom" label="Desired room:" onChange={this.handleChange} value={this.state.desiredRoom || ''}/>
                    </Grid>
                    : null}
                </Grid>

                <Grid container item direction="column" xs={12} md={6} spacing={2}>
                    <Grid item>
                        <TextField fullWidth required variant="outlined" multiline rows={12} label="Short description:" id="shortDescription" onChange={this.handleChange} value={this.state.shortDescription}/>
                    </Grid>
                    <Grid item>
                        <Typography>Weekly lecture:</Typography>
                        <FormControl>
                                <RadioGroup row={true} id="weekly" name="weekly" onChange={this.handleSelectChange} value={String(this.state.weekly)}>
                                <FormControlLabel value="true" control={<Radio />} label="yes" />
                                <FormControlLabel value="false" control={<Radio />} label="no" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <Typography>Blockdays prior to semester:</Typography>
                        <FormControl fullWidth variant="outlined" className={classes.FormControl}>
                        <InputLabel>Number of blockdays</InputLabel>
                            <Select name="numBlockdaysPriorLecture" defaultValue="" label="Number of blockdays" onChange={this.handleSelectChange}>
                                <MenuItem value={null}>none</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <Typography>Blockdays during the semester:</Typography>
                        <FormControl fullWidth variant="outlined" className={classes.FormControl}>
                        <InputLabel>Number of blockdays</InputLabel>
                            <Select name="numBlockdaysDuringLecture" defaultValue="" label="Number of blockdays" onChange={this.handleSelectChange}>
                                <MenuItem value={null}>none</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                    <Typography>Blockday during semester preferred start date:</Typography>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            inputVariant="outlined"
                            label="Select date"
                            format="dd/MM/yyyy"
                            margin="normal"
                            id="dateDuringLecture"
                            value={this.state.dateDuringLecture}
                            onChange={this.handleDateChange}
                        />
                    </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item>
                        <Typography color="secondary">Only for Interdisciplinary/ Transdisciplinary Projects:</Typography>
                        <Typography>Blockdays during exam week:</Typography>
                        <FormControl fullWidth variant="outlined" className={classes.FormControl}>
                        <InputLabel>Number of blockdays</InputLabel>
                            <Select name="numBlockdaysInExam" defaultValue="" label="Number of blockdays" onChange={this.handleSelectChange}>
                                <MenuItem value={null}>none</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                </Grid>
                
                
                <Grid item> 
                    <Button variant="outlined" onClick={this.handleClose}>Cancel</Button>
                </Grid>
                <Grid item> 
                    <Button variant="contained" color="primary" onClick={this.addProject}>Submit</Button>
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