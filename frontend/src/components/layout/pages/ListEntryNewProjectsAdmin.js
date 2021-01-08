import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
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

/**
 * Renders a Project object within a ListEntry and provides a decline, delete, approve button. Links projects
 * to a list of projects. This is done by routing the link to /ProjekteGenehmigen and passing the ProjectBO and
 *  as props to the ProjekteGenehmigen component.
 *
 */

class ListEntryNewProjectsAdmin extends Component {
constructor(props){
        super(props)
        this.state= {
            projects: [],
            projecttype:[],
            error: null,
            priority: '',
            updatingError: null,
            deletingError: null,
            loaded: null,




        };
        this.baseState = this.state;
        console.log(this.state.projects)
    }

    componentDidMount(){
        this.getAllProjects();
        this.getProjecttype();
    }

    /** Gives back the projects */
    getAllProjects = () => {
        ElectionSystemAPI.getAPI().getAllProjects()
        .then(projectBO => { this.setState({
                projects: projectBO,
                loaded: true,
                error: null
            },console.log("ausgeführt")
            )
            }).catch(e =>
                this.setState({
                    projects: [],
                    error: e
                }))
    }

    getAllProjecttypes = () => {
        ElectionSystemAPI.getAPI().getAllProjecttypes()
        .then(projecttypeBO =>
            this.setState({
                projecttype: projecttypeBO,
                loaded: true,
                error: null
            })).catch(e =>
                this.setState({
                    projecttype: [],
                    error: e
                }))
    }

    /**Gives back the projecttype by id**/
     getProjecttype = () => {
     ElectionSystemAPI.getAPI().getProjecttype(this.state.projecttypeid)
     .then(projecttypeBO =>{
         this.setState({
             projecttype: projecttypeBO,
             error: null,
             ptloaded: true
         })
     }).catch(e =>
             this.setState({
                 projecttypes:[],
                 error: e
             }))
     }

    /** Gives back the projects */
    getAllProjecttypes = () => {
        ElectionSystemAPI.getAPI().getAllProjecttypes()
        .then(projecttypeBO => { this.setState({
                projecttype: projecttypeBO,
                loaded: true,
                error: null
            },console.log("hei")
            )
            }).catch(e =>
                this.setState({
                    projecttype: [],
                    error: e
                }))
    }



      //Handles the single delete Button
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
          projects: this.state.projects.filter(gradeFromState => gradeFromState.getID() != project.getID())
        })
    }

  render() {

     const {projects} = this.state;
     const {classes}= this.props;

        return (
            <div>
                <Container maxWidth="md">
                    <CssBaseline />
                    <Typography variant='h4' color="secondary" className={classes.redHeader}>New Projects</Typography>
                     <Grid item container
                            direction="column"
                            xs={12}
                            md={12}
                            spacing={2}
                            align="center"
                            className={classes.grid}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>PROJECT</TableCell>
                                        <TableCell>PROJECT TYPE</TableCell>
                                        <TableCell>PROFESSOR</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.projects.map(project => (
                                        <TableRow key={project.getID() } project={project}>
                                            <TableCell> {project.getName()}</TableCell>
                                            <TableCell> {project.getProjectType().get}</TableCell>
                                            <TableCell> {project.getProfessor()}</TableCell>
                                            <TableCell> <Button color="gray" variant="outlined" className={classes.button}> Bewerten</Button> </TableCell>
                                        </TableRow>
                                    ))}
                               </TableBody>
                            </Table>
                        </TableContainer>
                     </Grid>
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
    }
});

export default withStyles(styles) (ListEntryNewProjectsAdmin);
