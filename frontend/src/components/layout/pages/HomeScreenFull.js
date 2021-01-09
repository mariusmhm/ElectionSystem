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
import { AppBar, Tabs, Tab, withStyles, Collapse, Card, Paper } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import { makeStyles } from '@material-ui/core/styles';
import { ElectionSystemAPI, ProjectBO, ParticipationBO, ProjecttypeBO } from '../../../api';
import { ja } from 'date-fns/locale';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
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
            value: null,
            id: null,



            


        };
        this.baseState = this.state;
        
        
        
    }

    toggleClass(index, e) {
        this.setState({
          activeIndex: this.state.activeIndex === index ? null : index
        });
      }

    moreLess(index) {
        if (this.state.activeIndex === index) {
          return (
            <span>
              <i className="fas fa-angle-up" /> Hide Description
            </span>
          );
        } else {
          return (
            <span>
              <i className="fas fa-angle-down" /> Show Description
            </span>
          );
        }
      }

    handleChange(value) {
        if (typeof value != "string"){
            return;
        }
        this.setState({
            value: value
        });
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
        this.handleChange();

    }




    render() {
        const { classes } = this.props;
        const { projects } = this.state;
        const {activeIndex, id} = this.state;
 

        return (
            <div>
                <Container maxWidth="xl">
                    <CssBaseline />
                    <Typography variant="h1" align='center'>Project overview</Typography>
                    
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        variant="fullWidth"
                        indicatorColor="secondary"
                        
                    >
                        
                        <Tab label="SELECT" />
                        <Tab label="MY SELECTION" />
                    </Tabs>
                    <Paper>
                        {this.state.projecttypes.map(projecttypes => (
                            <Grid>
                            <Card style={{ backgroundColor: 'grey', color: 'white' }}>
                                <Grid container spacing={3}>
                                    <Grid item xs={4} spacing={3}>
                                        <Typography variant="h6" align='left'>
                                            {projecttypes.getName()}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4} spacing={3}>
                                        <Typography variant="h6" align='left'>
                                            ECTS: {projecttypes.getEcts()}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4} spacing={3}>
                                        <Typography variant="h6" align='left'>
                                            SWS: {projecttypes.getSws()}
                                        </Typography>
                                    </Grid>
                                </Grid>   
                            </Card>
                            <Grid container spacing={3}>
                            <TableEntry 
                                id = {projecttypes.getID()}
                                
                            />
                            </Grid>
                                
                            </Grid>
                            
                        ))}
                    </Paper>

                    
                </Container>
            </div>
            /*
            <div>
                <Container maxWidth="xl">
                    <CssBaseline />
                    <Typography variant="h1">Project overview</Typography>
                    <Paper>
                    <Table>

                        <TableHead>

                            <TableRow align="right">
                                <TableCell />
                                <TableCell />
                                <TableCell >
                                    <Typography variant="h2">
                                        Project
                                    </Typography>
                                </TableCell>
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
                                        Wählen
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>


                        {this.state.projecttypes.map(projecttype => (
                            <TableBody>
                                <TableRow>
                                    <TableCell colSpan="7" style={{ backgroundColor: 'grey', color: 'white' }}>
                                        <Typography variant="h3">
                                            {projecttype.getName()}
                                            {projecttype.getID()}
                                        </Typography>
                                    </TableCell>
                                </TableRow>


                                {this.state.projects.map(project => {
                                    if (project.getProjectType() === projecttype.getID()) {
                                        return (
                                            
                                            <TableRow key={project.getID()}>
                                                <TableCell>
                                                    <Button 
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={this.toggleClass.bind(this, project.getID())}
                                                    >
                                                        {this.moreLess(project.getID())}
                                                    </Button>
                                                    
                                                
                                                   
                                                </TableCell>
                                                
                                                <TableEntry

                                                />
                                                <TableCell>
                                                    <Typography variant="h5">
                                                        {project.getName()}
                                                    </Typography>
                                                    
                                                    <Collapse in={activeIndex === project.getID()}>
                                                        {project.getShortDescription()}
                                                    </Collapse>
                                                </TableCell>
                                                <TableCell>
                                                    {project.getProfessor()}
                                                </TableCell>
                                                <TableCell>
                                                    {projecttype.getEcts()}
                                                </TableCell>
                                                <TableCell>
                                                    {projecttype.getSws()}
                                                </TableCell>
                                                <TableCell>
                                                    <TableCell>
                                                        <FormControl >
                                                            <InputLabel id="demo-simple-select-label">PRIORITY</InputLabel>
                                                            <Select
                                                                labelId="demo-simple-select-label"
                                                                id="demo-simple-select"
                                                            >
                                                                <MenuItem > no priority</MenuItem>
                                                                <MenuItem > 1st priority</MenuItem>
                                                                <MenuItem >2nd priority </MenuItem>
                                                                <MenuItem >3rd priority </MenuItem>
                                                                <MenuItem >4th priority </MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </TableCell>
                                                    <TableCell>

                                                        <Button
                                                            variant="contained"
                                                            color="secondary"
                                                            endIcon={<PlaylistAddCheckIcon />}
                                                        >
                                                            Choose
                                                                </Button>

                                                    </TableCell>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    }
                                }

                                )}


                            </TableBody>

                        ))}

                    </Table>
                    </Paper>"
                </Container>

            </div>*/
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
