import React, {Component} from 'react';
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
import ElectionSystemAPI from '../../api/ElectionSystemAPI';
import ProjectBO from '../../api/ProjectBO';

/**Creates a new Keycompetence as an projectBO**/

class CreateKeyCompetence extends Component {
 constructor(props) {
      super(props);
      // Init an today date
      let today = new Date(),
      date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
       // Init an empty state
      this.state = {
        creationDate: date,
        projectname:'',
        modules: [],
        moSelected:null,
        edvNumber: null,
        projecttypes: [],
        projecttype: {},
        ptSelected:null,
        numSpots: null,
        prof: null,
        professors: [],
        additionalProf: null,
        shortDescription: '',
        language: '',
        spots: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 , 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
        error: null
      }
       // save this state for canceling
      this.baseState = this.state;
    }

    /*get all projecttypes */
    getAllProjecttypes = () => {
        ElectionSystemAPI.getAPI().getAllProjecttypes()
        .then(projecttypesBOs =>
            this.setState({ // Set new state when ProjecttypeBOs have been fetched
                projecttypes: projecttypesBOs,
                error: null
            })).catch(e =>
                this.setState({ //Reset state with error from catch
                    projecttypes:[],
                    error: e
                }))
    }
    /*get all modules */
    getAllModules = () => {
        ElectionSystemAPI.getAPI().getAllModules()
        .then(moduleBOs =>
            this.setState({  // Set new state when ModuleBOs have been fetched
                modules: moduleBOs,
                error: null
            })).catch(e =>
                this.setState({  //Reset state with error from catch
                    modules:[],
                    error: e
                }))
    }


   getUsersForRole = () => {
        ElectionSystemAPI.getAPI().getUserForRole(3)
        .then(userBOs =>{
            this.setState({ // Set new state when UserBO has been fetched
                professors: userBOs,
                error: null
            });
        }).catch(e =>
                this.setState({ //Reset state with error from catch
                    professors:[],
                    error: e
                }))
    }

  /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
   componentDidMount(){
        this.getAllProjecttypes();
        this.getAllModules();
        this.getUsersForRole()
   }

  /** Handles value changes of the forms selected projecttype and validates them */
     selectHandleChangeProjecttype = (e) =>{
        this.setState({
            ptSelected: this.state.projecttypes[e.target.value].getID(),
            projecttype: this.state.projecttypes[e.target.value],
        });
        this.showETCS = true;
    }

  /** Handles value changes of the forms textfields and validates them */
    handleChange =(e) =>{
        this.setState({
            [e.target.id]: e.target.value
        })
    }
  /** Handles value changes of the forms select and validates them */
   handleSelectChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        });
    }
  /** Handles value changes of the forms textfields as numbers and validates them */
    handleChangeNum = (e) =>{
        this.setState({
            [e.target.id]: parseInt(e.target.value, 10)
        });               
    }
 /** Handles the close / cancel button click event */
    handleClose = () => {
        this.setState({
          open: false
        });
    }



  /** Adds the Keycompetence */
     addProject = () => {
        let newProject = new ProjectBO();
        newProject.setDate(this.state.creationDate);
        newProject.setName(this.state.projectname);
        newProject.setModule(this.state.moSelected);
        newProject.setProjecttype(this.state.ptSelected);
        newProject.setNumSpots(this.state.numSpots);
        newProject.setAddProfessor(this.state.additionalProf);
        newProject.setEdvNumber(this.state.edvNumber);
        newProject.setShortDescription(this.state.shortDescription);
        newProject.setState(2);
        newProject.setLanguage(this.state.language);
        newProject.setProfessor(this.state.prof);
        newProject.setWeekly(false);
        newProject.setSpecialRoom(false);
        newProject.setRoomDesired("");
        newProject.setExternalPartner("");
        newProject.setNumBlockDaysPriorLecture(0);
        newProject.setNumBlockDaysDuringLecture(0);
        newProject.setDateBlockDaysDuringLecture(0);
        newProject.setNumBlockDaysInExam(0);
        console.log(JSON.stringify(newProject));
        ElectionSystemAPI.getAPI().addProject(newProject).then(projectBO => {
         // Backend call sucessfull
         // reinit the dialogs state for a new empty keycompetence
            this.showETCS = false;
            this.setState(this.baseState);
            this.props.closeKeyCom();  // call the parent with the customer object from backend
            this.props.handleReload();
        }
        ).catch(e => //Reset state with error from catch
            this.setState({
                error: e,

            }))

    }



  /** Renders the component */
 render(){
    const { classes } = this.props;
    return(

        <Dialog open={this.props.openk} onClose={this.props.closeKeyCom} fullWidth maxWidth='md'>
            <DialogTitle fontcolor='primary'className={classes.dialogHeader}>CREATE KEY COMPETENCE</DialogTitle>
            <Grid container spacing={2} justify="center" driection="row" className={classes.grid} >
                <Grid item container direction="column" xs={12} md={6} spacing={2}>
                    <Grid item>
                        <TextField fullWidth variant="outlined" id="projectname"
                        label="Name:" onChange={this.handleChange} value={this.state.projectname}/>
                    </Grid>
                    <Grid item>
                        <FormControl fullWidth variant="outlined" className={classes.FormControl}>
                            <InputLabel>Module</InputLabel>
                            <Select id="moSelected" label="Module" onChange={this.handleSelectChange}>
                                    {this.state.modules.map(modules => (
                                        <MenuItem key={modules.getID()} value={modules.getID()}>{modules.getName()}</MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <TextField fullWidth variant="outlined" label="EDV-number:" id="edvNumber" onChange= {this.handleChangeNum}/>
                    </Grid>
                    <Grid item>
                           <FormControl fullWidth variant="outlined" className={classes.FormControl}>
                                <InputLabel>Project type</InputLabel>
                                <Select id="ptSelected" label="Projecttype" onChange={this.selectHandleChangeProjecttype}>
                                    {this.state.projecttypes.map((ptype, index) => (
                                        <MenuItem key={index} value={index}>{ptype.getName()}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                    </Grid>
                    <Grid item container justify="space-between">
                        <Grid item>
                            <Typography>ETCS:{this.showETCS ? this.state.projecttype.getEcts() : null}</Typography>
                        </Grid>
                        <Grid item>
                        <Typography>SWS: {this.showETCS ? this.state.projecttype.getSws() : null}</Typography>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <FormControl fullWidth variant="outlined" className={classes.FormControl}>
                        <InputLabel>Number of spots</InputLabel>
                            <Select name="numSpots" label="Number of spots" onChange={this.handleSelectChange}>
                            {this.state.spots.map((number, index) => (
                                        <MenuItem key={index} value={number}>{number}</MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl fullWidth variant="outlined" className={classes.FormControl}>
                        <InputLabel>Professor</InputLabel>
                            <Select name="prof" label="Professor" onChange={this.handleSelectChange}>
                                {this.state.professors.map((prof) => (
                                        <MenuItem key={prof.getID()} value={prof.getID()}>{prof.getFirstname()} {prof.getName()}</MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl fullWidth variant="outlined" className={classes.FormControl}>
                        <InputLabel>Additional professors</InputLabel>
                            <Select name="additionalProf" label="Additional professors" onChange={this.handleSelectChange}>
                                {this.state.professors.map((prof) => (
                                        <MenuItem key={prof.getID()} value={prof.getID()}>{prof.getFirstname()} {prof.getName()}</MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl fullWidth variant="outlined" className={classes.FormControl}>
                            <InputLabel>Language</InputLabel>
                            <Select name="language" label="language" onChange={this.handleSelectChange}>
                                <MenuItem value="german">german</MenuItem>
                                <MenuItem value="english">english</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <TextField fullWidth variant="outlined" multiline rows={10}
                        label="Short description:" id="shortDescription" onChange={this.handleChange} value={this.state.shortDescription}/>
                    </Grid>
                <Grid container item direction="row" justify="center" alignItems="center" spacing={3}>
                    <Grid item>
                        <Button variant="outlined" onClick={this.props.closeKeyCom}>Cancel</Button>
                    </Grid>               
                    <Grid item>
                    <Button variant="contained" color="primary" onClick={this.addProject}>Submit</Button>
                </Grid>
                </Grid>
                
                
            </Grid>
            </Grid>

        </Dialog>
    );
 }


}
/** Component specific styles */
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


export default withStyles(styles)(CreateKeyCompetence);
