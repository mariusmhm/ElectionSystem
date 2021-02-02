import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';

import Typography from '@material-ui/core/Typography'

import Button from '@material-ui/core/Button';
import { withStyles,  Divider, LinearProgress } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import { ElectionSystemAPI } from '../../../api';

import ProjectEntry from '../../assets/ProjectEntry';


class HomeScreenCompTwo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cUser: null,
            number: 4,
            participationID: 1,
            activeIndex: null,

            projects: [],
            projecttypes: [],
            participations: [],
            gradings: [],
            selectedProjects: [],
            unselectedProjects: [],

            participationLoaded: false,
            projectLoaded: false,
            projecttypeLoaded: false,
            loaded: false,
            reload: true,

            error: null,
            priority: '',
            grading: '',
            updatingError: null,
            deletingError: null,

        };

        this.baseState = this.state;
       
    }

    getAllProjecttypes = () => {
        ElectionSystemAPI.getAPI().getAllProjecttypes()
            .then(ProjecttypeBO =>
                this.setState({
                    projecttypes: ProjecttypeBO,
                    projecttypeLoaded: true,
                    error: null
                })).catch(e =>
                    this.setState({
                        projecttypes: [],
                        error: e
                    }))
        console.log('Projecttype ausgeführt');
    }


    getParticipationsForStudent = () => {
        ElectionSystemAPI.getAPI().getParticipationsForStudent(this.props.cUser)
        .then(ParticipationBO =>
            this.setState({
                participations: ParticipationBO,
                participationLoaded: true,
                error: null
            }))
            
        .then(this.getAllProjects)
        
        
        .catch(e => 

                this.setState({
                    participations: [],
                    error: e

                }))
        
    }

    getAllProjects = () => {
        ElectionSystemAPI.getAPI().getAllProjects()
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



        })


    }

    getAllGrades = () => {
        ElectionSystemAPI.getAPI().getAllGrades()
            .then(gradingBO =>

                
                this.setState({
                    gradings: gradingBO,
                    error: null
                }))

              
                      

            .catch(e =>
                this.setState({
                    gradings: [],
                    error: e
                }))
                console.log('Gradings ausgeführt');
            }
    
    reload (){
        window.location.reload(false)
    }

    componentDidMount() {
        
        this.getParticipationsForStudent(); 
        this.getAllProjecttypes(); 
        this.getAllGrades();
   
    }





    render() {

        const { participations,projecttypes,selectedProjects, loaded } = this.state;

        

        return (
            <div>
                {loaded ?  null: <><LinearProgress color="secondary" value={50}/></>}
                <Grid container >
                
                <Typography variant="h2">My selected projects</Typography>
                
                
                    {selectedProjects.length > 0 ? 
                    
                            projecttypes.map(pt => 

                                selectedProjects.filter(p => p.projecttype_id ===pt.id).length > 0 ?
                                
                                    <Grid item xs={12}>
                                        <Typography color="secondary">{pt.getName()}</Typography>
                                        {
                                            selectedProjects.map(project =>
                                                
                                                project.projecttype_id === pt.id ?

                                                <>
                                                <br/>
                                                
                                                    <ProjectEntry
                                                        key = {project.getID()}
                                                        id = {project.getID()}
                                                        name = {project.getName()}
                                                        prof = {project.getProfessor()}
                                                        dsc = {project.getShortDescription()}
                                                        ects = {pt.getEcts()}
                                                        sws = {pt.getSws()}
                                                        participationID = {participations.find(ptpID => ptpID.project_id === project.getID()).id}
                                                        priority = {participations.find(ptpID => ptpID.project_id === project.getID()).priority}
                                                        grading = {participations.find(ptpID => ptpID.project_id === project.getID()).grading_id}
                                                        cUser = {this.state.cUser}
                                                        {...this.props}
                                                    />
                                                    
                                                    <Divider/>
                                                </>

                                                :null

                                            )
                                            
                                        }

                                
                                <Button 
                                variant="contained" 
                                color="primary" 
                                fullWidth
                                style={{marginTop: "25px"}}
                                onClick={this.handleClickOpen}
                                >
                                        Show Fullreport
                                </Button>
                                    </Grid>
                                
                                :null
                                    
                            )     
                        
                        :null
                
                    }
                    

                
                </Grid>
               
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
    }


});

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
      },
      expandOpen: {
        transform: 'rotate(180deg)',
      },
      
}));
export default withStyles(styles)(HomeScreenCompTwo);