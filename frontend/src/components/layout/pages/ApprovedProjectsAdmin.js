import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core';
import { ElectionSystemAPI } from '../../../api';
import TableEntryAdmin from './TableEntryAdmin';
import LoadingProgress from '../../dialogs/LoadingProgress';


/**
 * Controlls  the list of approved projects.
 *
 * @see See [TableEntryAdmin]
 *
 * @author [Gruppe]
 */

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
            loadingInProgress: false,
            project: this.props.project,

        };
        this.baseState = this.state;


    }
    

    componentDidMount(){
        

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
                                {this.props.projects.map(project => (
                                            <TableEntryAdmin
                                                {...this.props}
                                                project = {project}
                                                name = {project.getName()}
                                                prof = {project.getProfessor()}
                                                type = {project.getProjecttype()}
                                                pd = {project.getID()}
                                                duringSemester = {this.props.duringSemester}
                                            />)
                                )
                                }
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
