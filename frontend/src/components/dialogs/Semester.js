import React, {Component} from 'react';
import {Dialog,
    FormControl,
    Button,
    Grid,
    Typography,
    FormControlLabel,
    RadioGroup,
    Radio,
    DialogTitle
    } from'@material-ui/core';
import DateFnsUtils from "@date-io/date-fns";
import {
        MuiPickersUtilsProvider,
        KeyboardDatePicker,
      } from '@material-ui/pickers';
import {withStyles} from '@material-ui/core';
import {ElectionSystemAPI, SemesterBO} from '../../api';




let open= true;

class Semester extends Component {
    constructor(props){
        super(props)
        this.state= {
            semester: {},
            sLoaded: false,
            error: null,
            wintersemester: '',
            gradingEndDate: '',
            submitProjectsEndDate: '',
            submitProjectsBeginnDate: '',
            gradingBeginnDate: '',
            updatingError: null,
            deletingError: null,



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
                wintersemester: semesterBO.getWintersemester(),
                gradingEndDate: semesterBO.getGradingEndDate(),
                submitProjectsEndDate: semesterBO.getSubmitProjectsEndDate(),
                submitProjectsBeginnDate: semesterBO.getSubmitProjectsBeginnDate(),
                gradingBeginnDate: semesterBO.getGradingBeginnDate(),
                sLoaded: true,
                error: null
            })).catch(e =>
                this.setState({
                    semester:{},
                    error: e
                }))
    }

    //Updates the semester
    updateSemester = () => {
        // clone the original cutomer, in case the backend call fails
        let updatedSemester = Object.assign(new SemesterBO()); //eventuell raus nehehmen
        // set the new attributes from our dialog
        console.log(this.state.wintersemester);
        console.log(this.state.gradingBeginnDate);
        console.log(this.state.gradingEndDate);
        console.log(this.state.submitProjectsBeginnDate);
        console.log(this.state.submitProjectsEndDate);
        updatedSemester.setID(this.state.semester.getID())
        updatedSemester.setWintersemester(this.state.wintersemester);
        updatedSemester.setGradingEndDate(this.state.gradingEndDate);
        updatedSemester.setSubmitProjectsEndDate(this.state.submitProjectsEndDate);
        updatedSemester.setSubmitProjectsBeginnDate(this.state.submitProjectsBeginnDate);
        updatedSemester.setGradingBeginnDate(this.state.gradingBeginnDate);
        ElectionSystemAPI.getAPI().updateSemester(updatedSemester)
        .then(semester => 
        this.setState({            
            updatingError: null                     // no error message
        })).catch(e =>
         this.setState({
            updatingError: e                        // show error message
        })
        );

    } 

  /** Handles the close / cancel button click event */
  handleClose = () => {
    // Reset the state
    this.setState(this.baseState);
    this.props.onClose(null);
  }

  handleRadioChange = (event) => {
    this.setState({
    wintersemester: event.target.value
    })
  };

  handleSubmitProjectsBeginnDateChange = (date) => {
    const nDate = new Date(date);
    const nD = nDate.getFullYear() + '-' + (nDate.getMonth() + 1) + '-' + nDate.getDate();
    this.setState({
        submitProjectsBeginnDate: nD
    })
  };

  handleSubmitProjectsEndDateChange = (date) => {
    const nDate = new Date(date);
    const nD = nDate.getFullYear() + '-' + (nDate.getMonth() + 1) + '-' + nDate.getDate();
    this.setState({
        submitProjectsEndDate: nD
    })
  };

  handleGradingBeginnDateChange = (date) => {
    const nDate = new Date(date);
    const nD = nDate.getFullYear() + '-' + (nDate.getMonth() + 1) + '-' + nDate.getDate();
    this.setState({
        gradingBeginnDate: nD
    })
  };

  handleGradingEndDateChange = (date) => {
    const nDate = new Date(date);
    const nD = nDate.getFullYear() + '-' + (nDate.getMonth() + 1) + '-' + nDate.getDate();
    this.setState({
        gradingEndDate: nD
    })
  };

 render(){
 const { classes } = this.props;

 const { semester, error } = this.state;
    return(
        <Dialog open={open} fullWidth maxWidth='xs'>
        <DialogTitle
            fontcolor='primary'
            className={classes.dialogHeader}>
                EDIT THE SEMESTER PERIOD
        </DialogTitle>
            <Grid item container direction="column" xs={12} md={12} spacing={2} align="center" className={classes.grid}>
                <FormControl align="center">
                    <RadioGroup row={true} defaultValue={this.state.wintersemester ? "false" : "true"} onChange={this.handleRadioChange} >
                         <FormControlLabel
                            value= "true"
                            control={<Radio />}
                            label="winter semester"
                            align="left"/>
                         <FormControlLabel
                            value= "false"
                            control={<Radio />}
                            label="summer semester"
                            align="right" />
                    </RadioGroup>
                </FormControl>
            <Grid item container direction="column" xs={12} md={12} spacing={2} align="center" className={classes.grid}>
            <Grid item container direction="column" xs={12} md={12} spacing={2} align="center" className={classes.grid}>
            <Typography
                    variant="h6"
                    color="secondary"
                    align="center"
                    className={classes.redHeader}>
                        DUE DATE FOR NEW PROJECTS
            </Typography>
                <Grid item align="center">
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="dd/MM/yyyy"
                            margin="normal"
                            id="date-picker-projects-beginn"
                            value={this.state.submitProjectsBeginnDate}
                            onChange={this.handleSubmitProjectsBeginnDateChange}
                            KeyboardButtonProps={{
                            'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </Grid>
                <Grid item >
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="dd/MM/yyyy"
                            margin="normal"
                            id="date-picker-projects-end"
                            value={this.state.submitProjectsEndDate}
                            onChange={this.handleSubmitProjectsEndDateChange}
                            KeyboardButtonProps={{
                            'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </Grid>
            </Grid>
             <Grid item container direction="column" xs={12} md={12} spacing={2} align="center" className={classes.grid}>
            <Typography
                variant="h6"
                align="center"
                color="secondary"
                className={classes.redHeader}>
                    DUE DATE FOR GIVING GRADES
            </Typography>
                <Grid item xs={12} md={12}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="dd/MM/yyyy"
                            margin="normal"
                            id="date-picker-grading-beginn"
                            value={this.state.gradingBeginnDate}
                            onChange={this.handleGradingBeginnDateChange}
                            KeyboardButtonProps={{
                            'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={12} md={12}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="dd/MM/yyyy"
                            margin="normal"
                            id="date-picker-grading-end"
                            value={this.state.gradingEndDate}
                            onChange={this.handleGradingEndDateChange}
                            KeyboardButtonProps={{
                            'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </Grid>
            </Grid>
            </Grid>
            <Grid item container direction="row" xs={12} md={12} spacing={2} align="center" className={classes.grid}>
                    <Grid item xs={6}>
                        <Button
                        variant="outlined"
                        color="secondary"
                        align="center"
                        className={classes.button}>
                            CANCEL
                        </Button>
                    </Grid>
                    <Grid>
                        <br/>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                        type="submit"
                        variant="outlined"
                        align="center"
                        className={classes.button}
                        onClick={this.updateSemester}>
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
        padding: theme.spacing(3)
    },
    dialogHeader:{
        textAlign: "center"
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
export default withStyles(styles)(Semester);
