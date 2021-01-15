import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles,Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ElectionSystemAPI } from '../../../api';
import TableEntry from '../../assets/TableEntry';



class HomeScreenCompTwo extends Component {
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



        };
        this.baseState = this.state;
        
        
        
    }


    

    /** Gives back the project */
    getAllProjects = () => {
        ElectionSystemAPI.getAPI().getAllProjects()
            .then(projectBO =>
                this.setState({
                    projects: projectBO,
                    loaded: true,
                    error: null
                })).catch(e =>
                    this.setState({
                        projects: [],
                        error: e
                    }))
        console.log('Project ausgeführt');
    }

    /** Gives back the projecttype */
    getAllProjecttypes = () => {
        ElectionSystemAPI.getAPI().getAllProjecttypes()
            .then(ProjecttypeBO =>
                this.setState({
                    projecttypes: ProjecttypeBO,
                    loaded: true,
                    error: null
                })).catch(e =>
                    this.setState({
                        projecttypes: [],
                        error: e
                    }))
        console.log('Projecttype ausgeführt');
    }

    componentDidMount() {
        this.getAllProjects();
        this.getAllProjecttypes();

    }




    render() {
        const { classes } = this.props;
        const { projects } = this.state;
        const {activeIndex} = this.state;
 

        return (
            <div>
                <Container maxWidth="xl">
                    <CssBaseline />
                    <Typography variant="h1">Project overview</Typography>
                    <Paper>
                    <Table>

                        <TableHead>

                            <TableRow align="right">
                                
                                <TableCell />
                                <TableCell >
                                    <Typography variant="h2">
                                        Project
                                    </Typography>
                                </TableCell>
                                <TableCell />
                                <TableCell />
                                
                                <TableCell >
                                    <Typography variant="h2">
                                        Professor
                                    </Typography>
                                </TableCell>
                                
                                <TableCell >
                                    <Typography variant="h2">
                                        ECTS
                                    </Typography>
                                </TableCell>
                                <TableCell >
                                    <Typography variant="h2">
                                        SWS
                                    </Typography>
                                </TableCell>
                                <TableCell >
                                    <Typography variant="h2">
                                        Priority
                                    </Typography>
                                </TableCell>
                                <TableCell >
                                    <Typography variant="h2">
                                        Choose
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>


                        {this.state.projecttypes.map(projecttype => (
                            <TableBody>
                                <TableRow>
                                    <TableCell colSpan="10" style={{ backgroundColor: 'grey', color: 'white' }}>
                                        <Typography variant="h3">
                                            {projecttype.getName()}
                                            {projecttype.getID()}
                                            
                                        </Typography>
                                    </TableCell>
                                </TableRow>


                                {this.state.projects.map(project => {
                                    if (project.getProjectType() === projecttype.getID()) {
                                        return (
                                            <TableEntry
                                                id = {project.getID()}
                                                name = {project.getName()}
                                                prof = {project.getProfessor()}
                                                dsc = {project.getShortDescription()}
                                                ects = {projecttype.getEcts()}
                                                sws = {projecttype.getSws()}
                                            />
                                            
                                        )
                                    }
                                }

                                )}


                            </TableBody>

                        ))}

                    </Table>
                    </Paper>
                </Container>

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
    }


});

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
      },
      expandOpen: {
        transform: 'rotate(180deg)',
      },
      
}));
export default withStyles(styles)(HomeScreenCompTwo);
