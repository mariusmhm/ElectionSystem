import React, {Component} from 'react';
import {Dialog,
    TextField,
    FormControl,
    Button,
    Grid,
    Typography,
    FormControlLabel,
    RadioGroup,
    Radio,
    DialogTitle
    } from'@material-ui/core';
import {withStyles} from '@material-ui/core';
import {ElectionSystemAPI, SemesterBO} from '../../api';




let open= true;

class Semester extends Component {
    constructor(props){
        super(props)
        this.state= {
            semester: [],
            error: null,
            wintersemester: '',
            gradingEndDate:'',
            submitEndProjectsDate:'',
            submitProjectsBeginnDate:"",
            gradingBeginnDate:'',
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
        .then(SemesterBO =>
            this.setState({
                semester: SemesterBO,
                error: null
            })).catch(e =>
                this.setState({
                    semester:[],
                    error: e
                }))
        console.log('ausgeführt');
    }

    /** Updates the customer */
    updateSemester = () => {
        // clone the original cutomer, in case the backend call fails
        let updatedSemester = Object.assign(new SemesterBO()); //eventuell raus nehehmen
        // set the new attributes from our dialog
        updatedSemester.setWintersemester(this.state.wintersemester);
        updatedSemester.setGradingEndDate(this.state.gradingEndDate);
        updatedSemester.submitProjectsEndDate(this.state.submitProjectsEndDate);
        updatedSemester.submitProjectsBeginnDate(this.state.submitProjectsBeginnDate);
        updatedSemester.submitGradingBeginnDate(this.state.gradongBeginnDate);
        ElectionSystemAPI.getAPI().updateSemester(updatedSemester).then(semester => {
        this.setState({
            updatingInProgress: false,              // disable loading indicator
            updatingError: null                     // no error message
        });
      // keep the new state as base state
      this.baseState.wintersemester = this.state.wintersemester;
      this.baseState.gradingEndDate = this.state.gradingEndDate;
      this.baseState.submitProjectsEndDate = this.state.submitProjectsEndDate;
      this.baseState.submitProjectsBeginnDate = this.state.submitProjectsBeginnDate;
      this.baseState.gradingBeginnDate = this.state.gradingBeginnDate;
      this.props.onClose(updatedSemester);      // call the parent with the new customer
    }).catch(e =>
      this.setState({
        updatingInProgress: false,              // disable loading indicator
        updatingError: e                        // show error message
      })
    );
    // set loading to true
    this.setState({
      updatingInProgress: true,                 // show loading indicator
      updatingError: null                       // disable error message
    });
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
                    <RadioGroup row={true} onChange={this.handleRadioChange} value={value}>
                         <FormControlLabel
                            value="true"
                            control={<Radio />}
                            label="winter semester"
                            align="left"/>
                         <FormControlLabel
                            value="false"
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
                        DUE DATE FOR NEW PROJCTS
            </Typography>
                <Grid item align="center">
                    <TextField required
                        id="filled-required"
                        label="from:"
                        defaultValue={semester.getAllSemester(state.submitProjectsBeginnDate)}
                        variant="outlined"
                    />
                </Grid>
                <Grid item >
                    <TextField required
                        id="filled-required"
                        label="to:"
                        defaultValue={semester.getAllSemester(state.submitProjectsEndDate)}
                        variant="outlined" />
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
                    <TextField required
                        id="filled-required"
                        label="from:"
                        defaultValue={semester.getAllSemester(gradingBeginnDate)}
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12} md={12}>
                    <TextField required
                        id="filled-required"
                        label="to:"
                        defaultValue={semester.getAllSemester(gradingEndDate)}
                        variant="outlined"
                    />
                </Grid>
            </Grid>
            </Grid>
            <Grid item container direction="row" xs={12} md={12} spacing={2} align="center" className={classes.grid}>
            <FormControl onSubmit={this.handleSubmit}>
                    <Grid item xs={6}>
                        <Button
                        variant="outlined"
                        color="secondary"
                        align="center"
                        className={classes.button}>
                            CANCLE
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
                        onClick={updatedSemester}>
                            DONE
                        </Button>
                    </Grid>

            </FormControl>
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
