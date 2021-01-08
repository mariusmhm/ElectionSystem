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




class ListEntryThisSemesterAdmin extends Component {
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
    }

    componentDidMount(){
        this.getAllProjects();
    }

    /** Gives back the projects */
    getAllProjects = () => {
        ElectionSystemAPI.getAPI().getAllProjects()
        .then(projectBO =>
            this.setState({
                projects: projectBO,
                loaded: true,
                error: null
            })).catch(e =>
                this.setState({
                    project: [],
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
        ElectionSystemAPI.getAPI().getProjecttype()
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
          projects: this.state.projects.filter(projectFromState => projectFromState.getID() != project.getID())
        })
    }




  render() {

    const {projects} = this.state;
     const {classes}= this.props;
        return (
            <div>
                <Container maxWidth="md">
                    <CssBaseline />
                    <Typography variant='h4' color="secondary">THIS SEMESTER</Typography>
                    <br/>
                    <Typography variant='h6' color="gray">Approved Projects</Typography>
                    <br/>
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
                                        <TableCell> PROFESSOR </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.projects.map(project => (
                                        <TableRow key={project.getID()}>
                                            <TableCell> {project.getName()} </TableCell>
                                            <TableCell> {project.getProjectType()} </TableCell>
                                            <TableCell> {project.getProfessor()} </TableCell>
                                        </TableRow>

                                    ))}
                               </TableBody>
                            </Table>
                        </TableContainer>
                     </Grid>
                    <Typography variant='h6' color="gray">Declined Projects</Typography>
                    <br/>
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
                                        <TableCell>PROFESSPR</TableCell>
                                        <TableCell> <Button  variant="contained" color="secondary" startIcon={<DeleteIcon />} className={classes.button}>Delete All</Button> </TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.projects.map(project => (
                                        <TableRow key={project.getID()} project={project}>
                                            <TableCell> {project.getName()} </TableCell>
                                            <TableCell> {project.getProjectType()} </TableCell>
                                            <TableCell> {project.getProfessor()} </TableCell>
                                            <TableCell> <IconButton aria-label="delete"><DeleteIcon onClick={this.deleteProjectHandler(project)}/> </IconButton></TableCell>
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
        fontSize: 15
    }
});
export default withStyles(styles) (ListEntryThisSemesterAdmin);
