import React, {Component} from 'react';
import { TextField, Button, Grid, Typography, Container, Divider} from'@material-ui/core';
import {withStyles} from '@material-ui/core';
import {ElectionSystemAPI, GradingBO, StudentBO, ParticipationBO} from '../../../api';
import TableListEntryTeilnehmer from './TableListEntryTeilnehmer';
import AddStudents from '../../dialogs/AddStudents';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';







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
    projectID: this.props.projectID,
    open: false
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
    }

getStudentByParticipations = () => {
        ElectionSystemAPI.getAPI().getStudentByParticipations( this.props.history.location.state.projectID)
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

    }

    openAddStudentDialog = () => {
        this.setState({
            open: true 
        });
    }

    closeAddStudentDialog = () =>{
        this.setState({
            open: false 
        });
    }

    componentDidMount(){
        this.getAllGrades();
        this.getStudentByParticipations();
    }


    removeStudent(studentid){
        //delete methode hinzufügen weil beim neu laden muss das projekt ja weg sein
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
                <AddStudents
                    open={this.state.open}
                    openAddStudentDialog={this.openAddStudentDialog}
                    closeAddStudentDialog={this.closeAddStudentDialog}
                    projectID ={this.props.history.location.state.projectID}
              />
                <Grid container justify="Center" maxwidth="xl" className={classes.grid, classes.margin} >
                <Button> <ArrowBackIosIcon /> </Button>
                    <Typography variant="h6" color="secondary" className={classes.redHeader}> Participants </Typography>
                </Grid>
                 <Grid container justify="Center" maxwidth="xl" className={classes.grid} >
                     <Typography variant="h6" color="secondary" className={classes.greyHeader}>of project  {this.props.history.location.state.projectName}</Typography>
                 </Grid>
                    <Grid container
                        justify="flex-start"
                        xs={12} md={12}
                        className={classes.grid}>
                            <Grid container justify="flex-start" xs={12} md={12} className={classes.grid}>
                                    <Grid item  xs={1} md={2}>
                                                <Typography variant="h6" className={classes.tableRow}>
                                                    DELETE
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
                                                    {...this.props}
                                                    name = {student.getName()}
                                                    firstname = {student.getFirstname()}
                                                    mrtnr = {student.getMatrikelNr()}
                                                    course = {student.getStudy()}
                                                    student ={student}
                                                    id={student.getID()}
                                                    removeStudent={this.removeStudent}
                                                    pdID ={this.props.history.location.state.projectID}
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
                                    onClick={() => this.openAddStudentDialog()}>
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
