import React, {Component} from 'react';
import { Grid, Typography, withStyles, Box} from'@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {ElectionSystemAPI, ProjectBO} from '../../../api';


class ProjectContent extends Component {

   constructor(props) {
      super(props);
      

      this.state = {
          project: {},
          error: null,
          projectname: '',
          projecttype: [],
          weekly:'',
          module: [],
          loaded: false,
          ptloaded: false,
          mloaded: false,
          addProfShow: false,
          currentState:{},
          sLoaded: false,
          edvNumber: null,
          language: null,
          aprof: null,
          apLoaded: false,
          projecttype: this.props.history.location.state.pt
      }

   }

   getAddProf = () => {
    ElectionSystemAPI.getAPI().getUser(this.state.project.add_professor_id)
    .then(userBO =>         
        this.setState({
            aprof: userBO,
            apLoaded: true,
        })).catch(e =>
            this.setState({
                error: e,
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
    ElectionSystemAPI.getAPI().getProject(this.props.history.location.state.projectID)
    .then(projectBO => {
        this.setState({
            project: projectBO,
            projectname: projectBO.getName(),
            edvNumber: projectBO.getEdvNumber(),
            language: projectBO.getLanguage(),
            loaded:true,
        });
        console.log(JSON.Stringify(projectBO));
        if(this.state.project.getAddProfessor() != null){
            this.setState({
                addProfShow: true
            });
            this.getAddProfessor();
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
        this.getCurrentState();
        
    }).catch(e =>
            this.setState({
                project:{},
                error: e
            }))
    }   

    getModule = () => {
        ElectionSystemAPI.getAPI().getModule(this.state.project.getModule())
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

    handleClick = () =>{
        this.props.history.push({
            pathname: '/admin'
        })
 
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
                    <IconButton className={classes.arrowButton} onClick={()=>this.handleClick()}>
                        <ArrowBackIosIcon color="secondary"/> 
                    </IconButton>
                </Grid>
                <Grid container item xs={11}>
                    <Grid item>
                        <Typography className={classes.header}>{ this.state.loaded ? this.state.projectname: null}</Typography>
                    </Grid>
                   <Grid item>
                        <Typography className={classes.state}>{ this.state.sLoaded ? this.state.currentState.name: null}</Typography>
                   </Grid>
                </Grid>

            <Grid container item direction="column" spacing={2} xs={12} md={4}>
                
                <Grid item>
                    <Typography><Box fontWeight='fontWeightBold' display='inline'>Modul:</Box> { this.state.mloaded ? this.state.module.name : null}</Typography>
                </Grid>
                <Grid item>
                    <Typography><Box fontWeight='fontWeightBold' display='inline'>EDV Number:</Box> { this.state.loaded ? this.state.edvNumber : null}</Typography>
                </Grid>
                <Grid item>
                    <Typography><Box fontWeight='fontWeightBold' display='inline'>Project type:</Box> {this.state.projecttype.name}</Typography>
                </Grid>
                <Grid item>
                    <Typography><Box fontWeight='fontWeightBold' display='inline'>ECTS:</Box> {this.state.projecttype.ect}</Typography>
                </Grid>
                <Grid item>
                    <Typography><Box fontWeight='fontWeightBold' display='inline'>SWS:</Box> {this.state.projecttype.sws}</Typography>
                </Grid>
                <Grid item>
                    <Typography><Box fontWeight='fontWeightBold' display='inline'>Language:</Box> { this.state.loaded ? this.state.language : null}</Typography>
                </Grid>
                <Grid item>
                    <Typography><Box fontWeight='fontWeightBold' display='inline'>Professor:</Box> {this.props.history.location.state.prof.firstname} {this.props.history.location.state.prof.name}</Typography>
                </Grid>
                { this.state.addProfShow ? 
                <Grid item>
                    <Typography><Box fontWeight='fontWeightBold' display='inline'>Additional Professors:</Box> { this.state.apLoaded ? this.state.aprof.firstname : null}</Typography>
                </Grid>
                : null
                }
                <Grid item>
                    <Typography><Box fontWeight='fontWeightBold' display='inline'>External co-operation partner:</Box> { this.state.loaded ? this.state.project.external_partner : null}</Typography>
                </Grid>
                <Grid item>
                    <Typography><Box fontWeight='fontWeightBold' display='inline'>Weekly lecture:</Box>  { this.state.loaded ? this.state.weekly : null}</Typography>
                </Grid>
                <Grid item>
                    <Typography><Box fontWeight='fontWeightBold' display='inline'>Particular room necessary:</Box> { this.state.loaded ? this.state.project.room_desired : null}</Typography>
                </Grid>
                <Grid item>
                    <Typography><Box fontWeight='fontWeightBold' display='inline'>Blockdays prior to semester:</Box> { this.state.loaded ? this.state.project.num_blockdays_prior_lecture : null}</Typography>
                </Grid>
                <Grid item>
                    <Typography><Box fontWeight='fontWeightBold' display='inline'>Blockdays during semester:</Box> { this.state.loaded ? this.state.project.num_blockdays_during_lecture : null}</Typography>
                </Grid>
                <Grid item>
                    <Typography><Box fontWeight='fontWeightBold' display='inline'>Blockdays dates:</Box> { this.state.loaded ? this.state.project.date_blockdays_during_lecture : null}</Typography>
                </Grid>
                <Grid item>
                    <Typography><Box fontWeight='fontWeightBold' display='inline'>Blockdays during exam week:</Box> { this.state.loaded ? this.state.project.num_blockdays_in_exam : null}</Typography>
                </Grid>
            </Grid>
            <Grid container item direction="column" spacing={2} xs={12} md={6}>
                <Grid item>
                    <Typography style={{ fontWeight: 600 }}>Short description:</Typography>
                </Grid>
                <Grid item>
                    <Typography>{ this.state.loaded ? this.state.project.short_description : null}</Typography>
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
        marginTop: theme.spacing(10),
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

