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

class CreateKeyCompetence extends Component {
 constructor(props) {
      super(props);

      let today = new Date(),
      date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

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
        .then(moduleBOs =>
            this.setState({
                modules: moduleBOs,
                error: null
            })).catch(e =>
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


     selectHandleChangeProjecttype = (e) =>{
        this.setState({
            ptSelected: this.state.projecttypes[e.target.value].getID(),
            projecttype: this.state.projecttypes[e.target.value],
        });
        this.showETCS = true;
    }


    handleChange =(e) =>{
        this.setState({
            [e.target.id]: e.target.value
        })
    }

   handleSelectChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleChangeNum = (e) =>{
        this.setState({
            [e.target.id]: parseInt(e.target.value, 10)
        });               
    }

    handleClose = () => {
        this.setState({
          open: false
        });
    }




     addProject = () => {
        let newProject = new ProjectBO();
        newProject.setDate(this.state.creationDate);
        newProject.setName(this.state.projectname);
        newProject.setModule(7); /*sets the module id to 7 "KeyCompetence" module selected muss raus? */
        newProject.setProjecttype(this.state.ptSelected);
        newProject.setNumSpots(this.state.numSpots);
        newProject.setAddProfessor(this.state.additionalProf);
        newProject.setEdvNumber(this.state.edvNumber);
        newProject.setShortDescription(this.state.shortDescription);
        newProject.setState(1);
        newProject.setLanguage(this.state.language);
        newProject.setProfessor(this.state.prof);
        newProject.setProfessor(2);
        newProject.setWeekly(false);
        newProject.setSpecialRoom(false);
        newProject.setRoomDesired(null);
        newProject.setExternalPartner(null);
        newProject.setNumBlockDaysPriorLecture(null);
        newProject.setNumBlockDaysDuringLecture(null);
        newProject.setDateBlockDaysDuringLecture(null);
        newProject.setNumBlockDaysInExam(null);
        console.log(JSON.stringify(newProject));
        ElectionSystemAPI.getAPI().addProject(newProject).then(projectBO => {
            this.showETCS = false;
            this.setState(this.baseState);

        }, this.propscloseKeyCom
        ).catch(e =>
            this.setState({
                error: e
            }))

    }




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
