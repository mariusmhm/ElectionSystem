import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { AppBar,Box,Grid, Tabs, Tab, withStyles, Collapse, Card, Paper } from '@material-ui/core';
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
            select: null,



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
                    <Box padding={5} marginTop={5} marginBottom={5} style={{ backgroundColor: '#e31134', color: 'white' }}>
                    <Typography variant="h2" align="center" >Project Overview</Typography>
                    </Box>
                    
                    <Grid spacing={3}>

                        
                            {this.state.projecttypes.map(projecttype => (
                                <Grid xs={12} spacing={3} justify="space-evenly">
                                            <Typography variant="h3" centered >
                                                {projecttype.getName()}
                                                {projecttype.getID()}
                                            </Typography>
                                        
                                    


                                    {this.state.projects.map(project => {
                                        if (project.getProjecttype() === projecttype.getID()){
                                            return (
                                                
                                                    <Card>
                                                <TableEntry
                                                    id = {project.getID()}
                                                    name = {project.getName()}
                                                    prof = {project.getProfessor()}
                                                    dsc = {project.getShortDescription()}
                                                    ects = {projecttype.getEcts()}
                                                    sws = {projecttype.getSws()}  
                                                />
                                                </Card>
                                                
                                            )
                                        }
                                    }

                                    )}
                                
                                </Grid>
                            ))}
                        


                        

                    </Grid>
                    
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
