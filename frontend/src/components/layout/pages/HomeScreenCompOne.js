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
import { AppBar, Tabs, Tab, withStyles, Collapse, Card, Paper, Box, Divider, ButtonBase } from '@material-ui/core';
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
import { id, ja } from 'date-fns/locale';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import TableEntry from '../../assets/TableEntry';
import SelectedProjectEntry from '../../assets/SelectedProjectEntry';




class HomeScreenCompTwo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentUser: 2,
            tableData: [],
            projects: [],
            projecttypes: [],
            participations: [],
            selectedProjects: [],
            participationLoaded: false,
            projectLoaded: false,
            error: null,
            priority: '',
            updatingError: null,
            deletingError: null,
            loaded: null,
            activeIndex: null,
            number: 4,
            participationID: 1,



        };
        this.baseState = this.state;
        
        
        
    }

    getParticipationsForStudent = () => {
        ElectionSystemAPI.getAPI().getParticipationsForStudent(this.state.currentUser)
        .then(ParticipationBO =>
            this.setState({
                participations: ParticipationBO,
                participationLoaded: true,
                error: null
            })).catch(e => 
                this.setState({
                    participationLoaded: [],
                    error: e
                }))
        console.log('Participations loaded from Backend');
        
        
    }
    

    getAllProjects = () => {
        ElectionSystemAPI.getAPI().getAllProjects()
            .then(projectBO =>
                this.setState({
                    projects: projectBO,
                    projectLoaded: true,
                    error: null
                })).catch(e =>
                    this.setState({
                        projects: [],
                        error: e
                    }))
        console.log('Project loaded from Backend');
    }

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
        this.getParticipationsForStudent(); 
        this.getAllProjecttypes();   
    }




    render() {
        const { projects, selectedProjects, participationLoaded, projectLoaded, participations,projecttypes } = this.state;

        console.log('Projekte: ' + projects.length)
        console.log('Pr')
        console.log('Selected: ' + selectedProjects.length)
        console.log(projects.filter(project => project.id === 1))


        return (
            <div>
                <Grid container>
                    <Grid container>
                        {projects.length > 0  ? 
                            <>
                            {
                                projecttypes.map(pt =>
                                    <>
                                    <Grid item xs={12}><Typography>{pt.getName()}</Typography></Grid>
                                    {
                                        projects.map(p =>
                                            participations.filter(ptp => ptp.project_id === p.getID()).length > 0 ? 
                                            pt.getID() === p.getProjecttype() ?
                                            <>
                                            {console.log('Gefunden: ' + participations.find(ptpID => ptpID.project_id === p.getID()).id)}
                                        
                                            <Grid container xs={12}>
                                                
                                            <TableEntry
                                                key = {p.getID()}
                                                id = {p.getID()}
                                                name = {p.getName()}
                                                prof = {p.getProfessor()}
                                                dsc = {p.getShortDescription()}
                                                ects = {pt.getEcts()}
                                                sws = {pt.getSws()}
                                                participationID = {participations.find(ptpID => ptpID.project_id === p.getID()).id}
                                                
                                            />
                                            </Grid>
                                           
                                            </>
                                            :
                                                null
                                            :
                                                null
                                                
                                            
                                            
                                        )
                                    }
                                    
                                    </>
                                    
                                    
                                )
                                
                            } 
                            </>
                            : 
                            <>
                            <b>Loading</b>
                            </>
                        }
                    </Grid>
                <Grid item xs={12}>
                    <Divider/>
                </Grid>
                
                <Grid container>
                    {projects.length > 0  ? 
                        <>
                        {
                            projecttypes.map(pt =>
                                <>
                                <Typography>{pt.getName()}</Typography>
                                {
                                    projects.map(p =>
                                        participations.filter(ptp => ptp.project_id === p.getID()).length > 0 ? 
                                            null
                                        :
                                            pt.getID() === p.getProjecttype() ?
                                            <Grid container xs={12}>
                                            <TableEntry
                                                id = {p.getID()}
                                                name = {p.getName()}
                                                prof = {p.getProfessor()}
                                                dsc = {p.getShortDescription()}
                                                ects = {pt.getEcts()}
                                                sws = {pt.getSws()}  
                                            />
                                            </Grid>
                                            :
                                            null
                                            
                                        
                                    )
                                }
                                </>
                                
                            )
                            
                        } 
                        </>
                        : 
                        <>
                        <b>Loading</b>
                        </>
                    }
                </Grid>
                
                
                    <Grid item xs={12}>
                        <Button onClick={() => window.location.reload(false)}>Click to reload</Button>
                    </Grid>

                </Grid>
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
    },

    Box: {
        color: 'red',
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