import React, {Component} from 'react';
import { TextField, Button, Grid, Typography, TableContainer, Input, Table, TableBody, TableCell, TableHead, TableRow, Container} from'@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import {withStyles} from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import {ElectionSystemAPI, GradingBO, StudentBO, ParticipationBO} from '../../../api';

/**
 * Shows a list of Students of a Project.
 *
 Depending on the Project-State you are aible to change the grade of a student.
 *
 It allows to add new Project participants
 *
 * @see See [EntryListAdmin](#EntryListAdmin)
 *
 * @author [Gruppe 8)
 */


class EntryListAdmin extends Component {



constructor(props){
    super(props)

/**Init an empty state*/
    this.state= {
    students:[],
    participations:[],
    gradings: [],
    error: null,
    grade: '',
    grading_ids:'',
    name: '',
    study:'',
    priority:'',
    martrikelNummer:'',
    updatingError: null,
    deletingError: null,
    };
    this.baseState = this.state;

}
/** Fetches all  GradingBOs*/
getAllGrades = () => {
        ElectionSystemAPI.getAPI().getAllGrades()
        .then(gradingBOs =>
        //The state gradings, error, loaded will be set here
            this.setState({
                gradings: gradingBOs,
                grading_ids:GradingBO.getID,
                loaded: true,
                error: null
            })).catch(e =>
            //if there is an error,the state of gradings will be an empty list
                this.setState({
                    gradings:[],
                    grading_ids:[],
                    error: e
                }))
        console.log('ausgeführt');
    }

//Updates the Participation
    updateParticipation = () => {
        let originParticipation = this.state.participation;
        /** clone original participation, in case the backend call fails*/
        let updatedParticipation = Object.assign(new ParticipationBO(), originParticipation); //eventuell raus nehehmen
        /** set the new attributes from our dialog*/
        updatedParticipation.setGradingID(this.state.grading_id);
        updatedParticipation.setPriority(this.state.priority);
        console.log(JSON.stringify(updatedParticipation));
        ElectionSystemAPI.getAPI().updateParticipation(updatedParticipation).catch(e => console.log(e));

    }

    handleSelectChange(event) {
    /**Handles the change of the dropdown menue*/
        this.setState({
        /**Is a new Item selected, the item will be set as the new state*/
            grading_id: event.target.value
        });
  }


/** Gives a list of students by project of ParticipationBO*/
getStudentByParticipations = () => {
        ElectionSystemAPI.getAPI().getStudentByParticipations(5)
        .then(studentBOs =>
        /**The state students, error, loaded will be set here*/
            this.setState({
                students: studentBOs,
                loaded: true,
                error: null
            })).catch(e =>
            /**if there is an error,the state of gradings will be an empty list*/
                this.setState({
                    students:[],
                    error: e
                }))
        console.log('ausgeführt');

    }
    /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
    componentDidMount(){
        this.getAllGrades();
        this.getStudentByParticipations();
    }


 render(){
     const { classes } = this.props;
     const { gradings, error, students} = this.state;

    return(
            <Container maxWidth="md">
                    <Grid container
                        direction="column"
                        justify="space-around"
                        className={classes.grid}>
                            <Typography variant="h4" > Project </Typography>
                            <Typography
                                variant="h6"
                                color="secondary"
                                className={classes.redHeader}>
                                    entry list
                            </Typography>
                    </Grid>
                    <Grid container
                        direction="row"
                        justify="space-around"
                        alignItems="center"
                        className={classes.grid}>
                        <Grid item>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>NAME</TableCell>
                                            <TableCell>MARTRICULATION NUMBER</TableCell>
                                            <TableCell>COURSE OF STUDY</TableCell>
                                            <TableCell>GRADE</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.state.students.map(student => (
                                            <TableRow key={student.getID()} student={student}>
                                                <TableCell > {student.getName()} </TableCell>
                                                <TableCell >{student.getMatrikelNr()} </TableCell>
                                                <TableCell > {student.getStudy()}</TableCell>
                                                <TableCell>
                                                    <FormControl>
                                                        <InputLabel >GRADE </InputLabel>
                                                            <Select
                                                                labelId="grading"
                                                                    value={this.state.grading_id}
                                                                    onChange={this.handleSelectChang}>
                                                                        {this.state.gradings.map((grading, index) => (
                                                                            <MenuItem key={index} value={index}>
                                                                                {grading.getGrade()}
                                                                            </MenuItem>
                                                                        ))}
                                                            </Select>
                                                    </FormControl>
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        variant="contained"
                                                        color="secondary"
                                                        onClick={this.updateParticipation} >
                                                            SAVE
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                                 ))}
                                    </TableBody>
                                </Table>
                        </TableContainer>
                        </Grid>
                        <Grid item container
                            direction="column"
                            xs={12}
                            md={12}
                            spacing={2}
                            align="center"
                            className={classes.grid}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    className={classes.button}
                                    onClick={this.updateParticipation}>
                                        ADD STUDENT
                                </Button>
                        </Grid>
                    </Grid>
                </Container>

    );
 }
}

/** Component specific styles */
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

export default withStyles(styles)(EntryListAdmin);
