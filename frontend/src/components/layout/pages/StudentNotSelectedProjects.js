import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles,  Divider, LinearProgress, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ElectionSystemAPI } from '../../../api';
import NotSelectedProjectEntry from '../../assets/NotSelectedProjectEntry';
import SelectedProjectEntry from '../../assets/SelectedProjectEntry';


class HomeScreenCompOne extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cUserID: this.props.history.location.state.cUserID,
            number: 4,
            participationID: 1,
            activeIndex: null,

            projects: [],
            projecttypes: [],
            participations: [],
            selectedProjects: [],
            unselectedProjects: [],

            participationLoaded: false,
            projectLoaded: false,
            projecttypeLoaded: false,
            loaded: false,
            reload: true,

            error: null,
            priority: '',
            updatingError: null,
            deletingError: null,

        };

        this.baseState = this.state;
        this.reload = this.reload.bind(this);
        
    }

    getAllProjecttypes = () => {
        ElectionSystemAPI.getAPI().getAllProjecttypes()
            .then(ProjecttypeBO =>
                this.setState({
                    projecttypes: ProjecttypeBO,
                    projecttypeLoaded: true,
                    error: null
                }))
                .catch(e =>
                    this.setState({
                        projecttypes: [],
                        error: e
                    }))
    }


    getParticipationsForStudent = () => {
        ElectionSystemAPI.getAPI().getParticipationsForStudent(this.state.cUserID)
        .then(ParticipationBO =>
            this.setState({
                participations: ParticipationBO,
                participationLoaded: true,
                error: null
            }))
            
        .then(this.getAllProjects)
        
        
        .catch(e => 

                this.setState({
                    participationLoaded: [],
                    error: e

                }))
        
    }

    getAllProjects = () => {
        ElectionSystemAPI.getAPI().getProjectForState(2)
            .then(projectBO =>

                
                this.setState({
                    projects: projectBO,
                    projectLoaded: true,
                    error: null
                }))

            .then(this.sortProjects).then(this.setState({loaded: true}))
                      

            .catch(e =>
                this.setState({
                    projects: [],
                    error: e
                }))
        
    }

    sortProjects = () =>{
        
        this.state.projects.forEach(project=> {

            if(this.state.participations.filter(part => part.project_id === project.id).length > 0 ){
                
                this.setState(prev => ({
                    selectedProjects: [...prev.selectedProjects, project]
                }))
                
            }

            else{
                
                this.setState(prev => ({
                    unselectedProjects: [...prev.unselectedProjects, project]
                }))               
            }

        })


    }

    

    reload = () => {
        this.props.history.push({
                pathname:"/index.html",
                state: {
                cUserID: this.props.history.location.state.cUserID
                }
            }, window.location.reload())
    }
    
    
    
    

    componentDidMount() {
        this.getParticipationsForStudent(); 
        this.getAllProjecttypes(); 
        
       
        
   
    }


    render() {
        const {  participations,projecttypes,selectedProjects, unselectedProjects,loaded } = this.state;
        const {classes}= this.props;



        
        return (
            <div className={classes.headGrid}>
                {loaded ?  null: <><LinearProgress color="secondary" /></>}
                <Container maxWidth="md">
                

                <Grid item xs={12}>
                <Divider/>
                <Typography variant="h2">All projects</Typography>
                
                </Grid>

                {unselectedProjects.length > 0 ? 
                    
                    projecttypes.map(pt => 

                        unselectedProjects.filter(p => p.projecttype_id ===pt.id).length > 0 ?
                        
                            <Grid item xs={12}>
                                <br/>
                                <Typography color="secondary" variant="h5">{pt.getName()}</Typography>
                                <br/>
                                {
                                    unselectedProjects.map(project =>
                                        
                                        project.projecttype_id === pt.id ?

                                        <>
                                        <NotSelectedProjectEntry
                                            key = {project.getID()}
                                            id = {project.getID()}
                                            name = {project.getName()}
                                            prof = {project.getProfessor()}
                                            dsc = {project.getShortDescription()}
                                            ects = {pt.getEcts()}
                                            sws = {pt.getSws()}
                                            cUserID = {this.state.cUserID}
                                            
                                        />
                                        <Divider/>
                                        </>

                                        :null

                                    )
                                }
                            </Grid>
                        
                        :null
                            
                    )     
                
                :null
                
        
            }
            </Container>   
            </div>
        );
    }
}




const styles = theme => ({
    grid: {
        width: '100%',
        margin: '0px',
        padding: theme.spacing(3)
    },
    button: {
        marginTop: theme.spacing(3)
    },
    redHeader: {
        color: theme.palette.red,
        fontFamily: 'Arial',
        fontStyle: 'bold',
        fontSize: 20
    },

    grayHeader: {
        color: theme.palette.gray,
        fontFamily: 'Arial',
        fontStyle: 'bold',
        fontSize: 35
    },

    Box: {
        color: 'red',
    },
    headGrid:{
        marginTop: theme.spacing(10),
        marginBottom: theme.spacing(12)
    }


});


export default withStyles(styles)(HomeScreenCompOne);
