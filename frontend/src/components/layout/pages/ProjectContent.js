import React, {Component} from 'react';
import {Button, Icon, Grid, TextField, Typography, withStyles, FormControl, 
    FormControlLabel, MenuItem, Select, InputLabel} from'@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {ElectionSystemAPI, ProjectBO} from '../../../api';


let projectid = 1;

class ProjectContent extends Component {

   constructor(props) {
      super(props);
      

      this.state = {
          user: {},
          project: {},
          error: null,
          projectname: '',
          projecttypeid: 1,
          projecttype: [],
          moduleid: 1,
          module: [],
          loaded: false,
          ptloaded: false,
          mloaded: false,
          addProfShow: false,
          roleAdmin: false,
          allStates:[],
          currentState:{},
          sLoaded: false,
          newState: null,
      }
   }


   getUser = () => {
    ElectionSystemAPI.getAPI().getUser(36)
    .then(userBO => {
        this.setState({
            user: userBO,
        });
        if(this.state.user.getRole() === "Admin"){
            this.setState({
                roleAdmin: true,
            })
        }
    }).catch(e =>
            this.setState({
                user:{},
                error: e
            }))
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
    ElectionSystemAPI.getAPI().getProject(projectid)
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
        this.getProjecttype();
        this.getModule();
        this.getUser();
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
                    <Typography>Modul: { this.state.mloaded ? this.state.module.getName() : null}</Typography>
                </Grid>
                <Grid item>
                    <Typography>EDV Number: </Typography>
                </Grid>
                <Grid item>
                    <Typography>Project type: { this.state.ptloaded ? this.state.projecttype.getName() : null}</Typography>
                </Grid>
                <Grid item>
                    <Typography>ECTS:  { this.state.ptloaded ? this.state.projecttype.getEcts() : null}</Typography>
                </Grid>
                <Grid item>
                    <Typography>SWS: { this.state.ptloaded ? this.state.projecttype.getSws() : null}</Typography>
                </Grid>
                <Grid item>
                    <Typography>Language: { this.state.loaded ? this.state.project.getLanguage() : null}</Typography>
                </Grid>
                { this.state.addProfShow ? 
                <Grid item>
                    <Typography>Additional Professors: { this.state.loaded ? this.state.project.getAddProfessor() : null}</Typography>
                </Grid>
                : null
                }
                <Grid item>
                    <Typography>External co-operation partner: { this.state.loaded ? this.state.project.getExternalPartner() : null}</Typography>
                </Grid>
                <Grid item>
                    <Typography>Weekly lecture:  { this.state.loaded ? this.state.project.getWeekly() : null}</Typography>
                </Grid>
                <Grid item>
                    <Typography>Particular room necessary: { this.state.loaded ? this.state.project.getRoomDesired() : null}</Typography>
                </Grid>
                <Grid item>
                    <Typography>Blockdays prior to semester: { this.state.loaded ? this.state.project.getNumBlockDaysPriorLecture() : null}</Typography>
                </Grid>
                <Grid item>
                    <Typography>Blockdays during semester: { this.state.loaded ? this.state.project.getNumBlockDaysPriorLecture() : null}</Typography>
                </Grid>
                <Grid item>
                    <Typography>Blockdays during exam week: { this.state.loaded ? this.state.project.getNumBlockDaysInExam() : null}</Typography>
                </Grid>
            </Grid>
            <Grid container direction="column" spacing={2} xs={12} md={6}>
                <Grid item>
                    <Typography>Short description: </Typography>
                </Grid>
                <Grid item>
                    <Typography>{ this.state.loaded ? this.state.project.getShortDescription() : null}</Typography>
                </Grid>
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
                </Grid>
                
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
        paddingLeft: theme.spacing(1)
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

