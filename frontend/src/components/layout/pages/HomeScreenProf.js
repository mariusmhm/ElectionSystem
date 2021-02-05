import React, {Component} from 'react';
import { ElectionSystemAPI } from '../../../api';
import {Grid, Typography, withStyles, LinearProgress, Container, AppBar, Toolbar, Fab, Divider} from '@material-ui/core';
import ProfProjectEntry from '../../assets/ProfProjectEntry';
import CreateProject from '../../dialogs/CreateProject';
import AddIcon from '@material-ui/icons/Add';


class HomeScreenProf extends Component {
    constructor(props){
        super(props)
        this.state = {
            loaded: false,
            cUserID: this.props.history.location.state.cUserID,
            cUser: this.props.history.location.state.cUser,
            projects: [],
            profProjects: [],
            addProjects: [],
            projecttypes: [],
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
                })).then(console.log('Projects loaded'))

    }

    sortProjects = () =>{
        
        this.state.projects.forEach(project=> {

            if(project.getProfessor() === this.state.cUserID ){
                
                this.setState(prev => ({
                    profProjects: [...prev.profProjects, project]
                }))
                
            }

            else if (project.getAddProfessor() === this.state.cUserID){
                
                this.setState(prev => ({
                    addProjects: [...prev.addProjects, project]
                }))               
            }

            else{
                console.log('Not')
            }


            

        }).then(console.log('Ready'))


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
        const { profProjects, addProjects, loaded, cUserID,projecttypes } = this.state;
        const {classes}= this.props;
        console.log('ProfProjects: ' + profProjects);
        console.log('AddProjects: ' + addProjects)
        
        
        return(
            <div className={classes.headGrid}>
                {loaded ?  null: <LinearProgress color="secondary"/>}
                <Container maxWidth="MD">
                <Grid container >
                    <Grid item xs={6}>
                    <Typography variant="h5">My Projects</Typography>
                    </Grid>
                    

                    {profProjects.length > 0 ? 
                                        
                                        projecttypes.map(pt => 

                                            profProjects.filter(p => p.projecttype_id ===pt.id).length > 0 ?
                                            
                                                <Grid item xs={12}>
                                                    <Typography color="secondary">{pt.getName()}</Typography>
                                                    {
                                                        profProjects.map(project =>
                                                            
                                                            project.projecttype_id === pt.id ?

                                                            <>
                                                                <ProfProjectEntry
                                                                    key = {project.getID()}
                                                                    id = {project.getID()}
                                                                    name = {project.getName()}
                                                                    prof = {project.getProfessor()}
                                                                    dsc = {project.getShortDescription()}
                                                                    ects = {pt.getEcts()}
                                                                    sws = {pt.getSws()}
                                                                    state = {project.getState()}
                                                                    {...this.props}
                                                                    
                                                                />

                                                                
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
                <br/>
                <Divider/>
                <br/>
                <Grid container >
                    <Grid item xs={6}>
                    <Typography variant="h5">My Projects as Add Prof</Typography>
                    </Grid>
                    

                    {addProjects.length > 0 ? 
                                        
                                        projecttypes.map(pt => 

                                            addProjects.filter(p => p.projecttype_id ===pt.id).length > 0 ?
                                            
                                                <Grid item xs={12}>
                                                    <Typography color="secondary">{pt.getName()}</Typography>
                                                    {
                                                        addProjects.map(project =>
                                                            
                                                            project.projecttype_id === pt.id ?

                                                            <>
                                                                <ProfProjectEntry
                                                                    key = {project.getID()}
                                                                    id = {project.getID()}
                                                                    name = {project.getName()}
                                                                    prof = {project.getProfessor()}
                                                                    dsc = {project.getShortDescription()}
                                                                    ects = {pt.getEcts()}
                                                                    sws = {pt.getSws()}
                                                                    state = {project.getState()}
                                                                    {...this.props}
                                                                    
                                                                />

                                                                
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
                </Container>
                <AppBar position="fixed" color="white" className={classes.appBar}>
                    <Toolbar>
                        
                            <Fab  className={classes.fabButton} color="secondary" variant="extended" aria-label="add" onClick={() => this.openProject()}>
                                <AddIcon /> new project
                            </Fab>
                        
                    </Toolbar>
                </AppBar>
                {cUserID != null ? 
                    < CreateProject
                        openpr={this.state.openpr}
                        openProject={this.openProject}
                        closeProject={this.closeProject}
                        {...this.props}
                    />
                : null}

                
   

            </div>
        );


    }


}

const styles = theme => ({
    headGrid:{
        marginTop: theme.spacing(10),
        marginBottom: theme.spacing(10)
    },
    fabButton: {
        top: 0,
        margin: '0 auto',
      },
    appBar: {
      align:'center',
      bottom: '0px',
      top: 'auto'
    }
})
export default withStyles(styles) (HomeScreenProf);