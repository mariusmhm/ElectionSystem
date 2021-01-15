import React, {Component} from 'react';
import {Button, Icon, Grid, TextField, Typography, withStyles} from'@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {ElectionSystemAPI, ProjecttypeBO} from '../../../api';


let projectid = 1;

class ProjectContent extends Component {

   constructor(props) {
      super(props);
      

      this.state = {
          user: {},
          project: [],
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
    }).catch(e =>
            this.setState({
                project:[],
                error: e
            }))
    }   

    getProjecttype = () => {
    ElectionSystemAPI.getAPI().getProjecttype(this.state.projecttypeid)
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
        ElectionSystemAPI.getAPI().getModule(this.state.moduleid)
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

componentDidMount(){
    this.getProject();
    this.getProjecttype();
    this.getModule();
    this.getUser();
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
            <Grid item xs={11}>
                    <Typography className={classes.header}>{ this.state.loaded ? this.state.projectname : null}</Typography>
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
                <Grid item>
                    <Typography>State: { this.state.loaded ? this.state.project.getState() : null}</Typography>
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
    }
});

export default withStyles(styles)(ProjectContent);

