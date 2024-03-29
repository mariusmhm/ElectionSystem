import React, {Component} from 'react';
import { TextField, Button, Grid, Typography, Container, Divider} from'@material-ui/core';
import {withStyles} from '@material-ui/core';
import {ElectionSystemAPI, ProjectBO} from '../../../api';
import TableListEntryTeilnehmer from './TableListEntryTeilnehmer';
import AddStudents from '../../dialogs/AddStudents';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';







class EntryListAdmin extends Component {



constructor(props){
    super(props)

    this.state= {
    students:[],
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
    open: false,
    projectID: null,
    project: null,
    cu: null,
    };
    this.baseState = this.state;
    this.removeStudent = this.removeStudent.bind(this);
    this.reloadStudents = this.reloadStudents.bind(this);
    this.setProject = this.setProject.bind(this);


}   
    setProject(){
        if(this.props.history.location.state.project !== null){
            this.setState({
                projectID: this.props.history.location.state.projectID,
                project:this.props.history.location.state.project,
                cu: this.props.history.location.state.cUser.role_id,
            }, () => this.getStudents(this.state.projectID))
        }

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

    getStudents = (projectid) => {
        ElectionSystemAPI.getAPI().getStudentByParticipations(projectid)
        .then(studentBOs =>
            this.setState({
                students: studentBOs,
                loaded: true,
                error: null
            })).catch(e =>
                this.setState({
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
        this.setProject();
    }

    handleClick = () =>{
        if (this.state.cu === 1){
        this.props.history.push({
            pathname: '/admin',
            state: {
                cUser: this.props.history.location.state.cUser
            }
        })
        }else if(this.state.cu === 3){
            this.props.history.push({
                pathname: '/professor',
                state: {
                    cUser: this.props.history.location.state.cUser,
                    cUserID: this.props.history.location.state.cUserID,
                }
            },this.forceUpdate())
        }
 
     }
     
    reloadStudents(){            
        this.getStudents(this.state.projectID);    
    }

    updateProject = () => {
        // clone original semester, in case the backend call fails
        let updatedProject = Object.assign(new ProjectBO(), this.props.history.location.state.project); //eventuell raus nehehmen
        // set the new value for the state so it gets archived
        if (updatedProject.getDateBlockDaysDuringLecture() === null){
            updatedProject.setDateBlockDaysDuringLecture("0000-00-00")
        }
        updatedProject.setState(4);

        ElectionSystemAPI.getAPI().updateProject(updatedProject);

    } 


    removeStudent(studentid){
        let filtered = this.state.students.filter(student => student.getID() !== studentid);
        this.setState({
            students: filtered
        });
        
    }

 render(){
     const { classes } = this.props;
     const { gradings, error, students} = this.state;

    return(
            <Container >
                <AddStudents
                    open={this.state.open}
                    openAddStudentDialog={this.openAddStudentDialog}
                    closeAddStudentDialog={this.closeAddStudentDialog}
                    projectID ={this.state.projectID}
                    reloadStudents={this.reloadStudents}
              />
                <Grid container justify="Center" maxwidth="md" className={classes.grid, classes.margin} >
                <Button onClick={this.handleClick}> <ArrowBackIosIcon /> </Button>
                    <Typography variant="h6" color="secondary" className={classes.redHeader}> Participants </Typography>
                </Grid>
                 <Grid container justify="Center" maxwidth="md" className={classes.grid} >
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
                                    <Grid item xs={1} md={2}>
                                                <Typography variant="h6" className={classes.tableRow}>
                                                    GRADE
                                                </Typography>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
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
                                                    pdID ={this.state.projectID}


                                                />
                                            )
                                            )}
                                    </Grid>
                                    <Divider/>
                        <Grid item container 
                            direction="row"
                            xs={12}
                            md={12}
                            spacing={2}
                            align="center"
                            className={classes.grid}>
                                <Grid item xs={12} md={6}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    fullWidth
                                    onClick={() => this.openAddStudentDialog()}>
                                        ADD STUDENT
                                </Button>
                                </Grid>
                            { this.state.cu === 1 ?
                                <Grid item xs={12} md={6}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    onClick={this.updateProject}>
                                        GRADING COMPLETED
                                </Button>
                            </Grid>
                            : null
                            }                    
                            
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
