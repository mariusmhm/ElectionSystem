import React, { Component } from 'react';import Grid from '@material-ui/core/Grid';import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core';
import {ElectionSystemAPI, ProjectBO, ParticipationBO, ProjecttypeBO } from '../../../api';
import TableEntryAdmin from './TableEntryAdmin';
import TableEntryButtonTwo from './TableEntryButtonTwo';
import LoadingProgress from '../../dialogs/LoadingProgress';
/**
 * Renders a Project object within a ListEntry and provides a decline, delete, approve button. Links projects
 * to a list of projects. This is done by routing the link to /ProjekteGenehmigen and passing the ProjectBO and
 *  as props to the ProjekteGenehmigen component.
 *
 */

class ListEntryNewProjectsAdmin extends Component {
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
        this.getProjectForState();
        this.getAllProjecttypes();
    }

     /** Gives back the projecttype */
    getAllProjecttypes = () => {
        ElectionSystemAPI.getAPI().getAllProjecttypes()
            .then(ProjecttypeBO =>
                this.setState({
                    projecttypes: ProjecttypeBO,
                    error: null,
                    loadingInProgress: false
                })).catch(e =>
                    this.setState({
                        projecttypes: [],
                        loadingInProgress: false,
                        error: e
                    }));
                     this.setState({
                        loadingInProgress: true,
                        error: null
                    });
    }



    //Gives back the projects by state "new"
    getProjectForState = () =>{
        ElectionSystemAPI.getAPI().getProjectForState(1)
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

     const {projects,loadingInProgress} = this.state;
     const {classes}= this.props;

        return (
            <div>
                <Container maxWidth="md">

                <Grid container justify="flex-start" xs={12} className={classes.grid}>
                    <Grid item xs={12}>
                    <Typography variant='h5' color="secondary" className={classes.redHeader}>NEW PROJECTs</Typography>
                     </Grid>

                                <Grid container justify="flex-start" xs={12} spacing={2} className={classes.grid}>
                                    <Grid item  xs={3} md={3}>
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
                                            <TableEntryButtonTwo
                                                {...this.props}
                                                name = {project.getName()}
                                                prof = {project.getProfessor()}
                                                type = {project.getProjecttype()}
                                                project = {project}
                                                duringSemester = {this.props.duringSemester}
                                            />
                                    )
                                    )}
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

export default withStyles(styles) (ListEntryNewProjectsAdmin);
