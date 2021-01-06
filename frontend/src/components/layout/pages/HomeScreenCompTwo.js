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
import {ElectionSystemAPI, ProjectBO, ParticipationBO, ProjecttypeBO } from '../../../api';




class HomeScreenCompTwo extends Component {
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

    

    /** Gives back the semester */
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
        console.log('ausgeführt');
    }

    componentDidMount(){
        this.getAllProjects();
    }




  render() {
        const {classes}= this.props;
        const {projects} = this.state;

        return (

             <div>
                <Container maxWidth="xl">
                    <CssBaseline />
                    <Typography className={classes.grayHeader}> PROJECT OVERVIEW </Typography>

                    <Grid item container
                        direction="row"
                        xs={12}
                        md={12}
                        spacing={2}
                        align="center"
                        className={classes.grid}>
                            <Grid item xs={4}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-label">SEMESTER</InputLabel>
                                        <Select labelId="semester">
                                                    <MenuItem > 1</MenuItem>
                                                    <MenuItem > 2</MenuItem>
                                                    <MenuItem >3 </MenuItem>
                                                    <MenuItem >4</MenuItem>
                                                    <MenuItem> 5 </MenuItem>
                                                    <MenuItem> 6</MenuItem>
                                        </Select>
                                </FormControl>
                            </Grid>
                        <Grid item xs={4} className={classes.grid}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-label">PROJECT TYPE</InputLabel>
                                        <Select
                                            labelId="projecttype">
                                                <MenuItem > Key-Competence </MenuItem>
                                                <MenuItem > subject-specific </MenuItem>
                                                <MenuItem > interdisciplinary projects </MenuItem>
                                                <MenuItem > transdisciplinary projects</MenuItem>
                                        </Select>
                                </FormControl>
                        </Grid>
                        <Grid item xs={4} className={classes.grid}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-label">PROFESSOR</InputLabel>
                                        <Select labelId="professor">
                                        {this.state.projects.map((project, index) => (
                                                <MenuItem key={index} value={index}> {project.getProfessor()}</MenuItem>
                                        ))}

                                        </Select>
                                </FormControl>
                        </Grid>
                    </Grid>
                    <Typography className={classes.redHeader}> key-competences </Typography>
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
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.projects.map(project => (
                                        <TableRow key={project.getID()} project={project}>
                                            



                                            <TableCell>

                                                <TreeView
                                                    key={project.getID()}
                                                    project={project}
                                                    defaultCollapseIcon={<ExpandMoreIcon />}
                                                    defaultExpandIcon={<ChevronRightIcon />}>
                                                        <TreeItem nodeId="1"  label={project.getName()}>
                                                            <TreeItem className={classes.redHeader} nodeId="2" label="SHORT DESCRIPTION"/>
                                                            <TreeItem nodeId="3" className={classes.grayHeader} label={"SHORT DESCRIPTION " + project.getShortDescription()}/>
                                                            <TreeItem nodeId="3" className={classes.grayHeader} label={"Room Desired " + project.getRoomDesired()}/>
                                                            <TreeItem nodeId="3" className={classes.grayHeader} label={"Special Room " + project.getSpecialRoom()}/>
                                                            <TreeItem nodeId="3" className={classes.grayHeader} label={"Number " + project.getNumBlockDaysPriorLecture()}/>
                                                            <TreeItem nodeId="3" className={classes.grayHeader} label={"Number " + project.getDateBlockDaysDuringLecture()}/>
                                                            <TreeItem nodeId="3" className={classes.grayHeader} label={"Number " + project.getNumBlockDaysDuringLecture()}/>
                                                            <TreeItem nodeId="3" className={classes.grayHeader} label={"Number " + project.getNumBlockDaysInExam()}/>
                                                            <TreeItem nodeId="3" className={classes.grayHeader} label={"Weekly " + project.getWeekly()}/>
                                                            <TreeItem nodeId="3" className={classes.grayHeader} label={"NumberSpots " + project.getNumSpots()}/>
                                                            <TreeItem nodeId="3" className={classes.grayHeader} label={"Language " + project.getLanguage()}/>
                                                            <TreeItem nodeId="3" className={classes.grayHeader} label={"External Partner:  " + project.getExternalPartner()}/>
                                                            <TreeItem nodeId="3" className={classes.grayHeader} label={"Partner " + project.getProjectType()}/>
                                                            <TreeItem nodeId="3" className={classes.grayHeader} label={"Module " + project.getModule()}/>
                                                            <TreeItem nodeId="3" className={classes.grayHeader} label={"Professor " + project.getProfessor()}/>
                                                            <TreeItem nodeId="3" className={classes.grayHeader} label={"Second Professor" + project.getAddProfessor()}/>
                                                            






                                                            <TreeItem nodeId="4" className={classes.redHeader}label="ECT:"/>
                                                            <TreeItem nodeId="4" className={classes.redHeader}label="SWS:"/>
                                                            <TreeItem nodeId="4" className={classes.redHeader}label={"Professor:" + project.getProfessor()}/>
                                                        </TreeItem>
                                                </TreeView>
                                            
                                            </TableCell>
                                            <TableCell>
                                                <FormControl className={classes.formControl}>
                                                    <InputLabel id="demo-simple-select-label">PRIORITY</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            className={classes.selectEmpty}>
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
                                                  className={classes.button}>
                                                    DESELECT
                                                </Button>
                                            </TableCell>
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
        fontSize: 20
    },

    grayHeader:{
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
}));
export default withStyles(styles) (HomeScreenCompTwo);
