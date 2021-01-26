import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography'

import Button from '@material-ui/core/Button';
import { AppBar, Tabs, Tab, withStyles, Collapse, Card, Paper, Box, Divider, ButtonBase, TableSortLabel } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import { ElectionSystemAPI, ProjectBO, ParticipationBO, ProjecttypeBO } from '../../../api';

import TableEntry from '../../assets/TableEntry';


class HomeScreenCompTwo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentUser: 2,
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
            loaded: true,

            error: null,
            priority: '',
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
        ElectionSystemAPI.getAPI().getParticipationsForStudent(this.state.currentUser)
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
        ElectionSystemAPI.getAPI().getAllProjects()
            .then(projectBO =>

                
                this.setState({
                    projects: projectBO,
                    projectLoaded: true,
                    error: null
                }))

            .then(this.sortProjects)
                      

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

        }).then(console.log('Ready'))


    }



    componentDidMount() {
        
        this.getParticipationsForStudent(); 
        this.getAllProjecttypes(); 
       
        
    }





    render() {
        const { projects, participations,projecttypes,selectedProjects, unselectedProjects } = this.state;


        console.log('All Projects: ' + projects)
        console.log('All Participations: ' + participations)
        console.log('All Projecttypes: ' + projecttypes)
        console.log('Selected: '+ selectedProjects)
        console.log('Not Selected: '+ unselectedProjects)


        return (
            <div>
                <Grid container >
                    {selectedProjects.length > 0 ? 
                    
                            projecttypes.map(pt => 

                                selectedProjects.filter(p => p.projecttype_id ===pt.id).length > 0 ?
                                
                                    <Grid item xs={12}>
                                        <Typography>{pt.getName()}</Typography>
                                        {
                                            selectedProjects.map(project =>
                                                
                                                project.projecttype_id === pt.id ?

                                                <>
                                                <Typography>{project.getID()}</Typography>
                                                </>

                                                :null

                                            )
                                        }
                                    </Grid>
                                
                                :null
                                    
                            )     
                        
                        :null
                
                    }

                <Grid item xs={12}>
                <Divider/>
                <Typography>Hier kommen nicht gewählte</Typography>
                <Divider/>
                </Grid>

                {unselectedProjects.length > 0 ? 
                    
                    projecttypes.map(pt => 

                        unselectedProjects.filter(p => p.projecttype_id ===pt.id).length > 0 ?
                        
                            <Grid item xs={12}>
                                <Typography>{pt.getName()}</Typography>
                                {
                                    unselectedProjects.map(project =>
                                        
                                        project.projecttype_id === pt.id ?

                                        <>
                                        <Typography>{project.getID()}</Typography>
                                        </>

                                        :null

                                    )
                                }
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