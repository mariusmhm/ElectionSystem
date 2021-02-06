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
          module: null,
          num_blockdays_during_lecture: null,
          num_blockdays_prior_lecture:null,
          num_blockdays_in_exam:null,
          date_blockdays_during_lecture: '',
          weekly: null,
          date: '',
          short_description:null,
          room_desired:null,
          external_partner: null,
          loaded: false,
          ptloaded: false,
          mloaded: false,
          addProfShow: false,
          currentState:'',
          sLoaded: false,
          edvNumber: null,
          language: null,
          aprof: null,
          apLoaded: false,
          projecttype: this.props.history.location.state.pt,
      }

   }

   getAddProf = () => {
    ElectionSystemAPI.getAPI().getUser(this.state.project.add_professor_id)
    .then(userBO =>         
        this.setState({
            aprof: userBO,
            loaded: true,
        })).catch(e =>
            this.setState({
                error: e,
            }))
    }

    getModule = () => {
        ElectionSystemAPI.getAPI().getModule(this.state.project.module)
        .then(moduleBO => {
            this.setState({
                module: moduleBO.getName(),
                error: null,
                loaded: true,
            });
        }).catch(e =>
                this.setState({
                    module:[],
                    error: e
                }))
    }

    getCurrentState = () => {
    ElectionSystemAPI.getAPI().getState(this.state.project.state)
    .then(state => 
        this.setState({
            currentState: state.getName(),
            sLoaded: true,
        }), console.log(this.state.currentState)).catch(e =>
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
            module: projectBO.getModule(),
            num_blockdays_during_lecture: projectBO.getNumBlockDaysDuringLecture(),
            external_partner: projectBO.getExternalPartner(),
            room_desired: projectBO.getRoomDesired(),
            num_blockdays_prior_lecture:projectBO.getNumBlockDaysPriorLecture(),
            short_description:projectBO.getShortDescription(),
            num_blockdays_in_exam:projectBO.getNumBlockDaysInExam(),
            date_blockdays_during_lecture:projectBO.getDateBlockDaysDuringLecture(),
            date:projectBO.getDate(),
            weekly:JSON.stringify(projectBO.getWeekly()),
            loaded:true,
        });
        this.getProjecttype();
        this.getModule();
        this.getCurrentState();
        if(this.state.project.getAddProfessor() != null){
            this.setState({
                addProfShow: true
            });
            this.getAddProfessor();
        }
    }).catch(e =>
            this.setState({
                project:{},
                error: e
            }))
    }

    handleClick = () =>{
        this.props.history.push({
            pathname: '/admin',
            state:{
                cUser: this.props.history.location.state.cUser
            }
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
                        <Typography className={classes.state}>{ this.state.sLoaded ? this.state.currentState: null}</Typography>
                   </Grid>
                </Grid>

            <Grid container item direction="column" spacing={2} xs={12} md={4}>
                
                <Grid item>
                    <Typography><Box fontWeight='fontWeightBold' display='inline'>Modul:</Box> { this.state.loaded ? this.state.module : null}</Typography>
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
                    <Typography><Box fontWeight='fontWeightBold' display='inline'>Additional Professors:</Box> { this.state.loaded ? this.state.aprof.firstname : null}</Typography>
                </Grid>
                : null
                }
                <Grid item>
                    <Typography><Box fontWeight='fontWeightBold' display='inline'>External co-operation partner:</Box> { this.state.loaded ? this.state.external_partner : null}</Typography>
                </Grid>
                <Grid item>
                    <Typography><Box fontWeight='fontWeightBold' display='inline'>Weekly lecture:</Box>  { this.state.loaded ? this.state.weekly : null}</Typography>
                </Grid>
                <Grid item>
                    <Typography><Box fontWeight='fontWeightBold' display='inline'>Particular room necessary:</Box> { this.state.loaded ? this.state.room_desired : null}</Typography>
                </Grid>
                <Grid item>
                    <Typography><Box fontWeight='fontWeightBold' display='inline'>Blockdays prior to semester:</Box> { this.state.loaded ? this.state.num_blockdays_prior_lecture : null}</Typography>
                </Grid>
                <Grid item>
                    <Typography><Box fontWeight='fontWeightBold' display='inline'>Blockdays during semester:</Box> { this.state.loaded ? this.state.num_blockdays_during_lecture : null}</Typography>
                </Grid>
                <Grid item>
                    <Typography><Box fontWeight='fontWeightBold' display='inline'>Blockdays dates:</Box> { this.state.loaded ? this.state.date_blockdays_during_lecture : null}</Typography>
                </Grid>
                <Grid item>
                    <Typography><Box fontWeight='fontWeightBold' display='inline'>Blockdays during exam week:</Box> { this.state.loaded ? this.state.num_blockdays_in_exam : null}</Typography>
                </Grid>
                <Grid item>
                    <Typography><Box fontWeight='fontWeightBold' display='inline'> Creation Date:</Box> { this.state.loaded ? this.state.date : null}</Typography>
                </Grid>
            </Grid>
            <Grid container item direction="column" spacing={2} xs={12} md={6}>
                <Grid item>
                    <Typography style={{ fontWeight: 600 }}>Short description:</Typography>
                </Grid>
                <Grid item>
                    <Typography>{ this.state.loaded ? this.state.short_description : null}</Typography>
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

