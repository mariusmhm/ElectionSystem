import React, {Component} from 'react';
import { TextField, Button, Grid, Typography, TableContainer, Input, Table, TableBody, TableCell, TableHead, TableRow, Container} from'@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import {withStyles} from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import {ElectionSystemAPI, GradingBO, StudentBO, ParticipationBO} from '../../../api';
import TableListEntryTeilnehmer from './TableListEntryTeilnehmer';







class EntryListAdmin extends Component {



constructor(props){
    super(props)

    this.state= {
    students:[],
    participations:[],
    gradings: [],
    error: null,
    grade: '',
    name: '',
    firstname:'',
    study:'',
    id: null,
    martrikelNummer:'',
    updatingError: null,
    deletingError: null,
    };
    this.baseState = this.state;

}

getAllGrades = () => {
        ElectionSystemAPI.getAPI().getAllGrades()
        .then(gradingBOs =>
            this.setState({
                gradings: gradingBOs,
                loaded: true,
                error: null
            })).catch(e =>
                this.setState({
                    gradings:[],
                    error: e
                }))
        console.log('ausgeführt');
    }

getStudentByParticipations = () => {
        ElectionSystemAPI.getAPI().getStudentByParticipations(1)
        .then(studentBOs =>
            this.setState({
                students: studentBOs,
                loaded: true,
                error: null
            })).catch(e =>
                this.setState({
                    students:[],
                    error: e
                }))
        console.log('ausgeführt');

    }

    componentDidMount(){
        this.getAllGrades();
        this.getStudentByParticipations();
    }


    removeStudent(studentid){
        console.log('remove student');
        this.setState({
            students: this.state.students.filter(student => student.getID() !== studentid)
        });

    }

 render(){
     const { classes } = this.props;
     const { gradings, error, students} = this.state;

    return(
            <Container maxWidth="md">
                    <Grid container
                        direction="column"
                        justify="space-around"
                        className={classes.pagecontent}>
                            <Typography variant="h4" > Project </Typography>
                            <Typography variant="h6" color="secondary" className={classes.redHeader}> entry list </Typography>
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
                                        <TableCell>
                                                <Typography variant="h6" className={classes.tableRow}>
                                                    Delete
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="h6" className={classes.tableRow}>
                                                    NAME
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="h6" className={classes.tableRow}>
                                                    FIRSTNAME
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="h6" className={classes.tableRow}>
                                                    MRT
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="h6" className={classes.tableRow}>
                                                    STUDY
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="h6" className={classes.tableRow}>
                                                    GRADE
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                {this.state.students.map(student => (
                                            <TableListEntryTeilnehmer
                                                name = {student.getName()}
                                                firstname = {student.getFirstname()}
                                                mrtnr = {student.getMatrikelNr()}
                                                course = {student.getStudy()}
                                                student ={student}
                                                id={student.getID()}
                                                removeStudent={this.removeStudent}

                                            />
                                )
                                )}
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
                                    onClick={this.updateGrade}>
                                        ADD STUDENT
                                </Button>
                        </Grid>
                    </Grid>
                </Container>

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
    },

    tableRow:{
    color:'lightGray',
    fontFamily:'Arial'
    },

    pagecontent:{
        width: '100%',
        marginTop: theme.spacing(10)
    }
});

export default withStyles(styles)(EntryListAdmin);
