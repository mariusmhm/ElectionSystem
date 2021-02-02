import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core';
import {ElectionSystemAPI, ProjectBO, ParticipationBO, ProjecttypeBO } from '../../../api';
import TableEntryButtonKeycompetence from './TableEntryButtonKeycompetence';
import LoadingProgress from '../../dialogs/LoadingProgress';



class ApprovedKeycompetence extends Component {
constructor(props) {
        super(props)
        this.state = {
            tableData: [],
            projects: [],
            projecttypes: [],
            error: null,
            updatingError: null,
            deletingError: null,
            loaded: null,
            activeIndex: null,
            loadingInProgress: false

        };
        this.baseState = this.state;
    }

    componentDidMount(){
        this.getProjectForModule();
        this.getProjectForState();
    }




       getProjectForModule= () =>{
        ElectionSystemAPI.getAPI().getProjectForModule(7) /*get the module id where module is Keycompetence*/
        .then(projectBO => {this.setState({
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


   getProjectForState = () =>{
        ElectionSystemAPI.getAPI().getProjectForState(2) /*get the approved Keycompetence */
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
                    <Grid container  justify="flex-start" xs={12} md={12} className={classes.grid}>
                    <CssBaseline />
                    <Grid item align="flex-start" xs={12} md={12} className={classes.grid}>
                    <Typography variant='h6' color="gray">Keycompetence</Typography>
                    </Grid>
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
                                                projecttype
                                            </Typography>
                                 </Grid>
                                    <Grid item xs={3} md={3}>
                                            <Typography variant="h6" className={classes.tableRow}>
                                                participator
                                            </Typography>
                                 </Grid>
                                 <Grid item xs={12} md={12} className={classes.grid}>
                                {this.state.projects.map(project => (
                                            <TableEntryButtonKeycompetence
                                                name = {project.getName()}
                                                prof = {project.getProfessor()}
                                                type = {project.getProjecttype()}
                                                id = {project.getID()}

                                            />
                                )
                                )}
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
        padding: theme.spacing(3)
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

export default withStyles(styles) (ApprovedKeycompetence);
