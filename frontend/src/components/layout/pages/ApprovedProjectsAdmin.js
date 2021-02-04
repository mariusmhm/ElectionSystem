import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import {withStyles} from '@material-ui/core';
import {ElectionSystemAPI, ProjectBO, ParticipationBO, ProjecttypeBO } from '../../../api';
import TableEntryAdmin from './TableEntryAdmin';
import LoadingProgress from '../../dialogs/LoadingProgress';



class ApprovedProjectsAdmin extends Component {
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
            deletingInProgress: false,
            loadingInProgress: false

        };
        this.baseState = this.state;
    }

    componentDidMount(){
        this.getProjectForStateOne();

    }

      /**Delets the project  **/
      deleteProjectHandler = (project) => {
        console.log(project);
        ElectionSystemAPI.getAPI().deleteProject(project.getID()).then(project => {
          console.log(project);
        }).catch(e =>
          this.setState({
            deletingError: e
          })
        );

        this.setState({
          projects: this.state.projects.filter(projectFromState => projectFromState.getID() != project.getID()),
        });
  }


    //Gives back the projects by state "approved"
    getProjectForStateOne = () =>{
        ElectionSystemAPI.getAPI().getProjectForState(2)
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

    const {projects, deletingInProgress, loadingInProgress} = this.state;
     const {classes}= this.props;
        return (
            <div>
                <Container maxWidth="md">
                    <Grid container  justify="flex-start" xs={12} className={classes.grid}>
                    <Grid item align="flex-start" xs={12}>
                    <Typography variant='h5' color="secondary" className={classes.redHeader} >THIS SEMESTER</Typography>
                    </Grid>
                    <Grid item align="flex-start" xs={12} spacing={2}>
                    <Typography variant='h6' color="primary">Approved Projects</Typography>
                    </Grid>
                    <Grid container justify="flex-start" xs={12} spacing={2} className={classes.grid}>
                                 <Grid item xs={3} md={3} >
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
                                 <Grid item container spacing={2}>
                                {this.state.projects.map(project => (
                                            <TableEntryAdmin
                                                {...this.props}
                                                project = {project}
                                                name = {project.getName()}
                                                prof = {project.getProfessor()}
                                                type = {project.getProjecttype()}
                                                pd = {project.getID()}
                                                duringSemester = {this.props.duringSemester}
                                            />
                                )
                                )}
                        </Grid>
                    </Grid>
                </Grid>
                <LoadingProgress show={deletingInProgress} />
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
export default withStyles(styles) (ApprovedProjectsAdmin);
