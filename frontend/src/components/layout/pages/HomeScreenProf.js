import React, {Component} from 'react';
import { ElectionSystemAPI } from '../../../api';
import {Grid, Typography, withStyles, LinearProgress, Container, AppBar, Toolbar, Fab, Box} from '@material-ui/core';
import ProfProjectEntry from '../../assets/ProfProjectEntry';
import CreateProject from '../../dialogs/CreateProject';
import AddIcon from '@material-ui/icons/Add';


class HomeScreenProf extends Component {
    constructor(props){
        super(props)
        this.state = {
            loaded: false,
            user: 1,
            projects: [],
            profProjects: [],
            deliverDate: null,
            semesterLoaded: false,
            openpr:false,
            

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

    getAllSemester = () => {

        ElectionSystemAPI.getAPI().getAllSemester()
        .then(semesterBO => {
            this.setState({
                deliverDate: semesterBO.getElection(),
                semesterLoaded: true
            })
        })
        .catch(e =>
            this.setState({
                error: e,
            })
            )
    }

    // opens project
    openProject(){
        this.setState({
            openpr: true });

    }
    // close project
    closeProject = () => {
        this.setState({openpr:false})

    }


    componentDidMount(){
        this.getAllProjects();
        this.getAllProjecttypes();
        this.getAllSemester();
    }


    render () {
        const { projects, profProjects,loaded } = this.state;
        const {classes}= this.props;
        console.log('All Projects : '+ projects)
        console.log('All Projects by this Prof: '+ profProjects)
        console.log(loaded)
        
        
        return(
            <div className={classes.headGrid}>
                {loaded ?  null: <LinearProgress color="secondary"/>}
                <Container maxWidth="MD">
                <Grid container >
                    <Grid item xs={6}>
                    <Typography variant="h1">My Projects</Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <Typography variant="subtitle2" align="right">Deliver Projects until</Typography>

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
                            {...this.props}
                        />

                    </Grid>
                    )}

                    
                </Grid>
                </Container>
                <AppBar position="fixed" color="white" className={classes.appBar}>
                    <Toolbar>
                        
                            <Fab  className={classes.fabButton} color="secondary" variant="extended" aria-lable="add" onClick={() => this.openProject()}>
                                <AddIcon /> new project
                            </Fab>
                        
                    </Toolbar>
                </AppBar>
                < CreateProject
                    openpr={this.state.openpr}
                    openProject={this.openProject}
                    closeProject={this.closeProject}
              />

                
   

            </div>
        );


    }


}

const styles = theme => ({
    headGrid:{
        marginTop: theme.spacing(10),
        marginBottom: theme.spacing(12)
    },
    fabButton: {
        margin: theme.spacing(2),
        top: 0,
        margin: '0 auto',
      },
    buttonBox:{
        align:'center',
        marginLeft: theme.spacing(15)
    },
    appBar: {
      align:'center',
      bottom: '0px',
      top: 'auto'
    }
})
export default withStyles(styles) (HomeScreenProf);