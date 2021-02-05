import React, {Component} from 'react';
import {Dialog,
    Button,
    Grid,
    FormControlLabel,
    TextField,
    DialogTitle,
    Switch
    } from'@material-ui/core';
import {withStyles} from '@material-ui/core';
import {ElectionSystemAPI, SemesterBO} from '../../api';


class Semester extends Component {
    constructor(props){
        super(props)
        this.state= {
            semester: {},
            error: null,
            open: null,
            name: '',
            grading: null,
            subProjects: null,
            election: null,
            updatingError: null,
            deletingError: null,
            loaded: null,

        };
        this.baseState = this.state;
    }

    componentDidMount(){
        this.getAllSemester();
    }
    
    

    /** Gives back the semester */
    getAllSemester = () => {
        ElectionSystemAPI.getAPI().getAllSemester()
        .then(semesterBO =>
            this.setState({
                semester: semesterBO,
                name: semesterBO.getName(),
                grading: semesterBO.getGrading(),
                subProjects: semesterBO.getSubmitProjects(),
                election: semesterBO.getElection(),
                loaded: true,
                error: null
            })).catch(e =>
                this.setState({
                    semester: {},
                    error: e
                }))
    }

    //Updates the semester
    updateSemester = () => {
        // clone original semester, in case the backend call fails
        let updatedSemester = Object.assign(new SemesterBO(), this.state.semester); //eventuell raus nehehmen
        // set the new attributes from our dialog
        updatedSemester.setName(this.state.name);
        updatedSemester.setSubmitProjects(this.state.subProjects);
        updatedSemester.setGrading(this.state.grading);
        updatedSemester.setElection(this.state.election);        
        console.log(JSON.stringify(updatedSemester));
        ElectionSystemAPI.getAPI().updateSemester(updatedSemester)
        .then(semester => {
            this.props.closeDialog()
        });

    } 

    /** Handles the close / cancel button click event */
    handleClose = () => {
        // Reset the state
        this.setState(this.baseState);
        this.props.onClose(null);
    }

    handleChangeSwitch = (e) =>{
      this.setState({
          [e.target.name]: e.target.checked
      })
    }

    handleTextFieldChange = e =>{
        this.setState({
        [e.target.id]: e.target.value
        })
    }

    handleElection = () =>{
        if(this.state.election === false){
            ElectionSystemAPI.getAPI().election();
            console.log('election started');
            this.setState({
                grading:true
            });
        }else{
            alert('Close election for students');
        }
    }


 render(){
 const { classes } = this.props;
    return(
        <Dialog open={this.props.open} onClose={this.props.closeDialog} fullWidth maxWidth='xs'>
        <DialogTitle
            fontcolor='primary'
            className={classes.dialogHeader}>
                EDIT THE SEMESTER PERIOD
        </DialogTitle>
            <Grid container direction="column"  spacing={2} align="center" className={classes.grid}>
                <Grid item xs={12}>
                    <TextField fullWidth variant="outlined" id="name" label="Name" onChange={this.handleTextFieldChange} value={this.state.name}/>
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel 
                    control={<Switch color="secondary" checked={this.state.subProjects} onChange={this.handleChangeSwitch} name="subProjects" />}
                    label="Submit Projects"
                    />
                </Grid>
                <Grid item align="center" xs={12}>
                <FormControlLabel 
                    control={<Switch color="secondary" checked={this.state.grading} onChange={this.handleChangeSwitch} name="grading" />}
                    label="Grading"
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel 
                    control={<Switch color="secondary" checked={this.state.election} onChange={this.handleChangeSwitch} name="election" />}
                    label="Election"
                    />
                </Grid>

                <Grid item xs={12}>
                    <Button variant="outlined" backgroundColor="red" onClick={this.handleElection}> evaluate election </Button>
                </Grid>
                <Grid container direction="row" align="center" className={classes.mGrid}>
                    <Grid item xs={6}>
                        <Button variant="outlined" color="primary" align="center" onClick={this.props.closeDialog}>
                            CANCEL
                        </Button>
                    </Grid>
                    <Grid item xs={6}> 
                        <Button variant="contained" color="primary" align="center" onClick={this.updateSemester}>
                            DONE
                        </Button>
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
        padding: theme.spacing(3),
        paddingTop: theme.spacing(0)
    },
    mGrid:{
        paddingTop: theme.spacing(3)
    },
    dialogHeader:{
        textAlign: "center"
    },
    redHeader:{
        color: theme.palette.red,
        fontFamily: 'Arial',
        fontStyle: 'bold',
        fontSize: 15
    }
});
export default withStyles(styles)(Semester);
