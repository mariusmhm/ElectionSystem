
import React, {Component} from 'react';
import { ElectionSystemAPI } from '../../../api';
import {Grid, Typography, withStyles, LinearProgress} from '@material-ui/core';
import ProfProjectEntry from '../../assets/ProfProjectEntry';


class HomeScreenProf extends Component {
    constructor(props){
        super(props)
        this.state = {
            loaded: false,
            user: 1,
            projects: [],
            profProjects: []

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

            if(project.getProfessor() === this.state.user){
                
                this.setState(prev => ({
                    profProjects: [...prev.profProjects, project]
                }))
                
            }
        })
    }


    componentDidMount(){
        this.getAllProjects();
        this.getAllProjecttypes();
    }


    render () {
        const { projects, profProjects,loaded } = this.state;
        console.log('All Projects : '+ projects)
        console.log('All Projects by this Prof: '+ profProjects)
        console.log(loaded)
        
        
        return(
            <div>
                {loaded ?  null: <LinearProgress color="secondary"/>}
                <Grid container >
                    <Grid item xs={6}>
                    <Typography>My Projects</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography align="right">Deliver Projects</Typography>
                    </Grid>
                    {profProjects.map(project => 
                    <Grid item xs={12}>
                        
                        <ProfProjectEntry
                            key = {project.getID()}
                            id = {project.getID()}
                            name = {project.getName()}
                            prof = {project.getProfessor()}
                            dsc = {project.getShortDescription()}
                            state = {project.getState()}
                        />

                    </Grid>
                    )}
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

export default withStyles(styles) (HomeScreenProf);

