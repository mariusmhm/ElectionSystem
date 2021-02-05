import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core';
import {ElectionSystemAPI } from '../../../api';
import TableEntryButtonAdmin from './TableEntryButtonAdmin';
import LoadingProgress from '../../dialogs/LoadingProgress';



class RejectedProjectsAdmin extends Component {
constructor(props) {
        super(props)
        this.state = {
            tableData: [],
            projects: [],
            projecttypes: [],
            error: null,
            priority: '',
            updatingError: null,
            deletingError: null,
            loaded: null,
            activeIndex: null,
            loadingInProgress: false

        };
        this.baseState = this.state;
    }

    componentDidMount(){

        this.getProjectForStateTwo();
    }

      /**Delets the project  **/
    deleteProjectHandler = (projectid) => {
        ElectionSystemAPI.getAPI().deleteProject(projectid)
        this.setState({
          projects: this.state.projects.filter(gradeFromState => gradeFromState.getID() != projectid)
        })
    }



    //Gives back the projects by state "rejected"
    getProjectForStateTwo = () =>{
        ElectionSystemAPI.getAPI().getProjectForState(3)
        .then(projectBO => { this.setState({
            projects: projectBO,
            loadingInProgress: false,
            error: null
        })}).catch(e =>
            this.setState({
                projects:[],
                 loadingInProgress: false,
                error: e
        }));
        this.setState({
                loadingInProgress: true,
                error: null
        });
    }


  render() {

    const {projects, loadingInProgress} = this.state;
     const {classes}= this.props;
        return (
            <div>
                <Container maxWidth="md">
                    <Grid container  justify="flex-start" xs={12} className={classes.grid} >
                        <Grid item align="flex-start" xs={12}>
                            <Typography variant='h6' color="gray">Rejected Projects</Typography>
                        </Grid>
                        <Grid container justify="flex-start" xs={12} className={classes.grid} spacing={2}> 
                                    <Grid item xs={3} md={3}>

                                            <Typography variant="h6" className={classes.tableRow}>
                                                project
                                            </Typography>
                                    </Grid>
                                    <Grid item xs={3} md={3}>
                                            <Typography variant="h6" className={classes.tableRow}>
                                                professor
                                            </Typography>
                                    </Grid>
                                    <Grid item xs={3} md={3}>
                                            <Typography variant="h6" className={classes.tableRow}>
                                                type
                                            </Typography>
                                    </Grid>
                                <Grid item xs={12} spacing={2}>
                                {this.state.projects.map(project => (
                                            <TableEntryButtonAdmin
                                                name = {project.getName()}
                                                prof = {project.getProfessor()}
                                                type = {project.getProjecttype()}
                                                project ={project}
                                                deleteProject={this.deleteProjectHandler}
                                            />
                                ))}
                                </Grid>
                        </Grid>
                    </Grid>
                   <LoadingProgress show={loadingInProgress} />
				</Container>
		    </div>
		);
	}
}
const styles = theme => ({
    grid:{
        width: '100%',
        margin: '0px',
        paddingTop: theme.spacing(3)
    },
    button:{
        marginTop: theme.spacing(3)
    },
    redHeader:{
        color: theme.palette.red,
        fontFamily: 'Arial',
        fontStyle: 'bold',
        fontSize: 30
    },
    tableRow:{
    color:'lightGray',
    fontFamily:'Arial'
    }
});
export default withStyles(styles) (RejectedProjectsAdmin);
