import React, {Component} from 'react';
import {Button, Grid, Typography, withStyles, FormControl, 
     MenuItem, Select, InputLabel, Box} from'@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {ElectionSystemAPI, ProjectBO} from '../../../api';


let projectid = 1;

class ProjectContent extends Component {

   constructor(props) {
      super(props);
      

      this.state = {
          userRole: 'administration', // hier den user role id nach änderung speichern und unten if ... ändern
          project: {},
          error: null,
          projectname: '',
          projecttypeid: 1,
          projecttype: [],
          weekly:'',
          moduleid: 1,
          module: [],
          loaded: false,
          ptloaded: false,
          mloaded: false,
          addProfShow: false,
          allStates:[],
          currentState:{},
          sLoaded: false,
          newState: null,
      }

   }
    
    getStates = () => {
    ElectionSystemAPI.getAPI().getAllStates()
    .then(states => 
        this.setState({
            allStates: states,
        })).catch(e =>
            this.setState({
                allStates:[],
                error: e
            }))
    } 

    getCurrentState = () => {
    ElectionSystemAPI.getAPI().getState(this.state.project.getState())
    .then(state => 
        this.setState({
            currentState: state,
            sLoaded: true,
        })).catch(e =>
            this.setState({
                currentState:{},
                error: e
            }))
    }

    getProject = () => {
    ElectionSystemAPI.getAPI().getProject(8)
    .then(projectBO => {
        this.setState({
            project: projectBO,
            projectname: projectBO.getName(),
            loaded:true
        });
        if(this.state.project.getAddProfessor() != null){
            this.setState({
                addProfShow: true
            })
        }
        if(this.state.project.getWeekly()){
            this.setState({
                weekly: 'yes'
            })
        }else{
            this.setState({
                weekly: 'no'
            })
        }
        this.getProjecttype();
        this.getModule();
        this.getStates();
        this.getCurrentState();
    }).catch(e =>
            this.setState({
                project:{},
                error: e
            }))
    }   

    getProjecttype = () => {
    ElectionSystemAPI.getAPI().getProjecttype(this.state.project.getProjecttype())
    .then(projecttypeBO =>{
        this.setState({
            projecttype: projecttypeBO,
            error: null,
            ptloaded: true
        })
    }).catch(e =>
            this.setState({
                projecttypes:[],
                error: e
            }))
    }

    getModule = () => {
        ElectionSystemAPI.getAPI().getModule(this.state.project.getProjecttype())
        .then(moduleBO => {
            this.setState({
                module: moduleBO,
                error: null,
                mloaded: true,
            })
        }).catch(e =>
                this.setState({
                    module:[],
                    error: e
                }))
    }

    updateProject = () => {
        // clone original semester, in case the backend call fails
        let updatedProject = Object.assign(new ProjectBO(), this.state.project); //eventuell raus nehehmen
        // set the new attributes from our dialog
        if(updatedProject.getAddProfessor() === null){
            updatedProject.setAddProfessor(37)
        }else if(updatedProject.getDateBlockDaysDuringLecture() === null){
            updatedProject.setDateBlockDaysDuringLecture('null')
        }
        updatedProject.setState(this.state.newState);
        console.log(JSON.stringify(updatedProject));
        ElectionSystemAPI.getAPI().updateProject(updatedProject).catch(e => console.log(e));

    } 

    handleSelectChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    componentDidMount(){
        this.getProject();
    }




 render(){
    const { classes } = this.props; 
    
    

    return (
        <div className={classes.pageContent}>
            
            <Grid container spacing={2} justify="center" className={classes.grid}>
                <Grid item xs={1} style={{ alignItems: 'center'}}>
                    <IconButton className={classes.arrowButton}>
                        <ArrowBackIosIcon color="secondary"/> 
                    </IconButton>
                </Grid>
                <Grid container xs={11}>
                    <Grid item>
                        <Typography className={classes.header}>{ this.state.loaded ? this.state.projectname: null}</Typography>
                    </Grid>
                   <Grid item>
                        <Typography className={classes.state}>{ this.state.sLoaded ? this.state.currentState.getName(): null}</Typography>
                   </Grid>
                </Grid>

            <Grid container direction="column" spacing={2} xs={12} md={4}>
                
                <Grid item>
                    <Typography><Box fontWeight='fontWeightBold' display='inline'>Modul:</Box> { this.state.mloaded ? this.state.module.getName() : null}</Typography>
                </Grid>
                <Grid item>
                    <Typography><Box fontWeight='fontWeightBold' display='inline'>EDV Number:</Box> { this.state.loaded ? this.state.project.getEdvNumber() : null}</Typography>
                </Grid>
                <Grid item>
                    <Typography><Box fontWeight='fontWeightBold' display='inline'>Project type:</Box> { this.state.ptloaded ? this.state.projecttype.getName() : null}</Typography>
                </Grid>
                <Grid item>
                    <Typography><Box fontWeight='fontWeightBold' display='inline'>ECTS:</Box> { this.state.ptloaded ? this.state.projecttype.getEcts() : null}</Typography>
                </Grid>
                <Grid item>
                    <Typography><Box fontWeight='fontWeightBold' display='inline'>SWS:</Box> { this.state.ptloaded ? this.state.projecttype.getSws() : null}</Typography>
                </Grid>
                <Grid item>
                    <Typography><Box fontWeight='fontWeightBold' display='inline'>Language:</Box> { this.state.loaded ? this.state.project.getLanguage() : null}</Typography>
                </Grid>
                { this.state.addProfShow ? 
                <Grid item>
                    <Typography><Box fontWeight='fontWeightBold' display='inline'>Additional Professors:</Box> { this.state.loaded ? this.state.project.getAddProfessor() : null}</Typography>
                </Grid>
                : null
                }
                <Grid item>
                    <Typography><Box fontWeight='fontWeightBold' display='inline'>External co-operation partner:</Box> { this.state.loaded ? this.state.project.getExternalPartner() : null}</Typography>
                </Grid>
                <Grid item>
                    <Typography><Box fontWeight='fontWeightBold' display='inline'>Weekly lecture:</Box>  { this.state.loaded ? this.state.weekly : null}</Typography>
                </Grid>
                <Grid item>
                    <Typography><Box fontWeight='fontWeightBold' display='inline'>Particular room necessary:</Box> { this.state.loaded ? this.state.project.getRoomDesired() : null}</Typography>
                </Grid>
                <Grid item>
                    <Typography><Box fontWeight='fontWeightBold' display='inline'>Blockdays prior to semester:</Box> { this.state.loaded ? this.state.project.getNumBlockDaysPriorLecture() : null}</Typography>
                </Grid>
                <Grid item>
                    <Typography><Box fontWeight='fontWeightBold' display='inline'>Blockdays during semester:</Box> { this.state.loaded ? this.state.project.getNumBlockDaysPriorLecture() : null}</Typography>
                </Grid>
                <Grid item>
                    <Typography><Box fontWeight='fontWeightBold' display='inline'>Blockdays during exam week:</Box> { this.state.loaded ? this.state.project.getNumBlockDaysInExam() : null}</Typography>
                </Grid>
            </Grid>
            <Grid container direction="column" spacing={2} xs={12} md={6}>
                <Grid item>
                    <Typography style={{ fontWeight: 600 }}>Short description:</Typography>
                </Grid>
                <Grid item>
                    <Typography>{ this.state.loaded ? this.state.project.getShortDescription() : null}</Typography>
                </Grid>
<<<<<<< HEAD
                {/* <Grid item>
                    <Typography>State: { this.state.loaded ? this.state.project.getState() : null}</Typography>
                </Grid> */}
                <Grid item>
                    <Typography>Reason:</Typography>
=======
                { this.state.userRole === "administration" &&
                <Grid container>
                    <Grid item>
                    <FormControl style={{minWidth: 120}} variant="outlined" className={classes.FormControl}>
                            <InputLabel>Revalue</InputLabel>
                            <Select name="newState" label="revalue" onChange={this.handleSelectChange}>
                                {this.state.allStates.map((state) => (
                                        <MenuItem key={state.getID()} value={state.getID()}>{state.getName()}</MenuItem>
                                    ))}
                            </Select>
                    </FormControl>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="primary" className={classes.button} onClick={this.updateProject}>Ok</Button>
                    </Grid>
>>>>>>> f049612fae8942aa3d5cf0ab9197abb38f0073d6
                </Grid>
                }
                
            </Grid>
            
            </Grid>
        </div>



    ) 
 }
}

const styles = theme => ({
    grid:{
        width: '100%',
        marginTop: theme.spacing(2),
        margin: theme.spacing(3),
        paddingLeft: theme.spacing(2)
        
    },
    pageContent:{
        margin: theme.spacing(1)
    },
    header: {
        fontSize: '1.5rem',
        paddingTop: theme.spacing(1),
        paddingLeft: theme.spacing(1),
        fontWeight: 'bold'
    },
    state:{
        paddingTop: theme.spacing(2),
        paddingLeft: theme.spacing(2)
    },
    button:{
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(2)
    }
});

export default withStyles(styles)(ProjectContent);

