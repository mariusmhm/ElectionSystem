import React, {Component} from 'react';
import { TextField, Button, Grid, Typography, TableContainer, Input, Table, TableBody, TableCell, Divider,  TableHead, TableRow, Container} from'@material-ui/core';
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
        ElectionSystemAPI.getAPI().getStudentByParticipations(2)
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
            <Container maxWidth="xl">
                <Grid container justify="Center" maxwidth="xl" className={classes.grid, classes.margin} >
                    <Typography variant="h6" color="secondary" className={classes.redHeader}> entry list </Typography>
                </Grid>
                 <Grid container justify="Center" maxwidth="xl" className={classes.grid} >
                     <Typography variant="h6" color="secondary" className={classes.greyHeader}>of project participants</Typography>
                 </Grid>
                    <Grid container
                        justify="flex-start"
                        xs={12} md={12}
                        className={classes.grid}>
                            <Grid container justify="flex-start" xs={12} md={12} className={classes.grid}>
                                    <Grid item  xs={1} md={2}>
                                                <Typography variant="h6" className={classes.tableRow}>
                                                    Delete
                                                </Typography>
                                    </Grid>
                                    <Grid item xs={1} md={2}>
                                                <Typography variant="h6" className={classes.tableRow}>
                                                    NAME
                                                </Typography>
                                    </Grid>
                                    <Grid item xs={1} md={1}>
                                                <Typography variant="h6" className={classes.tableRow}>
                                                    FIRSTN.
                                                </Typography>
                                    </Grid>
                                    <Grid item xs={1} md={1}>
                                                <Typography variant="h6" className={classes.tableRow}>
                                                    MRT
                                                </Typography>
                                    </Grid>
                                    <Grid item xs={1} md={2}>
                                                <Typography variant="h6" className={classes.tableRow}>
                                                    STUDY
                                                </Typography>
                                    </Grid>
                                    <Grid item xs={1} xl={2}>
                                                <Typography variant="h6" className={classes.tableRow}>
                                                    GRADE
                                                </Typography>
                                    </Grid>
                                    <Grid item xs={12} xl={12}>
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
                                    </Grid>
                                    <Divider/>
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
                                    color="gray"
                                    size="large"
                                    onClick={this.updateGrade}>
                                        GRADING COMPLETED
                                </Button>
                        </Grid>
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
        padding: theme.spacing(3),

    },
    margin:{
        marginTop: theme.spacing(10)
    },
    button:{
        marginTop: theme.spacing(3)
    },
    redHeader:{
        color: theme.palette.red,
        fontFamily: 'Arial',
        fontStyle: 'bold',
        fontSize: 40
    },
    greyHeader:{
        color: 'grey',
        fontFamily: 'Arial',
        fontStyle: 'bold',
        fontSize: 27
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
