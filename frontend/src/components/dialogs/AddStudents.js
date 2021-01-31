import React, {Component} from 'react';
import {Dialog,
    TextField,
    Button,
    DialogTitle,
    Grid} from'@material-ui/core';
import {withStyles} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {ElectionSystemAPI, ParticipationBO} from '../../api';

class AddStudents extends Component {

    constructor(props){
        super(props)

        let today = new Date(),
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        this.state= {
           students:[],
           error: null,
           updatingError: null,
           studentSelected: null,
           creationDate: date,



        };
        this.baseState = this.state;
    }


    // Reads out all Students
    getAllStudents = () => {
        ElectionSystemAPI.getAPI().getAllStudents()
        .then(studentBOs =>
            this.setState({
            students: studentBOs,
            error: null
            }, function(){
                console.log(this.state.students)
            })).catch(e =>
                this.setState({
                    students: [],
                    error: e
                }))


    }

    componentDidMount(){
        
        this.getAllStudents();
    }

    
    componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state,callback)=>{
            return;
        };
    }


    //Add a new Student to a Project
    addStudent = () => {
        console.log(this.state.studentSelected);
        let newParticipation = new ParticipationBO();
        newParticipation.setProjectID(this.props.projectID);
        newParticipation.setStudentID(this.state.studentSelected.getID());
        newParticipation.setPriority(null);
        newParticipation.setGradingID(null);
        newParticipation.setDate(this.state.creationDate);
        ElectionSystemAPI.getAPI().addParticipation(newParticipation)
        .then(par => {
            this.props.closeAddStudentDialog();
            this.setState(this.baseState);

        }).catch(e =>
            this.setState({
                updatingError: e
            }))

    }

    onInputChangehandler = (e, value) =>{
        this.setState({
            studentSelected: value
        }, console.log(this.state.studentSelected))
    }


 render(){
    const { classes } = this.props;
    
    return(
        <Dialog open={this.props.open} onClose={this.props.closeAddStudentDialog} maxWidth='xs' fullWidth>
            <DialogTitle fontcolor='primary' className={classes.dialogHeader}>Add Student</DialogTitle>
                
            <Grid container spacing={2} justify="center" className={classes.grid} >

                <Grid item>
                    <Autocomplete
                        value={this.state.studentSelected}
                        onChange={(e, value) => this.setState({ studentSelected: value})}
                        onInputChange={this.onInputChangehandler}
                        id="search-student"
                        options={this.state.students}
                        getOptionLabel={(student) => (student.name + ' ' + student.firstname)}
                        style={{ width: 300 }}
                        renderInput={(params) => (
                        <TextField {...params} label="Search Student" variant="outlined" />
                        )}
                    />
                </Grid>

                <Grid container direction="row" justify="center" alignItems="center" spacing={2} className={classes.button}>
                
                <Grid item>
                    <Button variant="outlined" color="secondary" onClick={this.props.closeAddStudentDialog}>Cancel</Button>
                
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" onClick={this.addStudent} >Add</Button>
                </Grid>
                </Grid>

            </Grid>

        </Dialog>
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
    dialogHeader:{
        textAlign: "center"
    },
});


export default withStyles(styles)(AddStudents);
