import React, { Component } from 'react';
import { Grid, Container, Button, FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { ExpandMoreIcon } from '@material-ui/icons/ExpandMore';
import { ElectionSystemAPI, ParticipationBO, StudentBO, GradingBO, SemesterBO, ProjectBO} from '../../../api';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import {withStyles} from '@material-ui/core';
import FormHelperText from '@material-ui/core/FormHelperText';
import NativeSelect from '@material-ui/core/NativeSelect';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import LoadingProgress from '../../dialogs/LoadingProgress';




class TableListEntryTeilnehmer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            priority: '',
            updatingError: null,
            deletingError: null,
            loaded: null,
            id: null,
            del: false,
            firstname:null,
            participationForGrading:{},
            name: null,
            mrtnr:null,
            course:null,
            activeIndex: null,
            select: true,
            lastname: '',
            gradingIdForSelect:null,
            loadingInProgress: false,
            partLoaded: false,
            priority:'',
            gradingPeriod:null,
            semester:{},
            labelname:'Grade',
            disabled:false,
            partid:'',
            studentid:'',
            student:null,
            gradings:[],
            students:[],
            participation:{},
            firstname: '',
            priority: 0


        };
        this.baseState = this.state;
    }


    getAllGrades = () => {
        ElectionSystemAPI.getAPI().getAllGrades()
        .then(gradingBOs =>
            this.setState({
                gradings: gradingBOs,
                loadingInProgress: false,
                error: null
            })).catch(e =>
                this.setState({
                    gradings:[],
                    error: e,
                    loadingInProgress: false,
                }))

    }

    //Updates the grade of the student in a participation object
    updateParticipation= () => {
        // clone original participation, in case the backend call fails
        if(this.state.participation != null){
            let updatedParticipation = Object.assign(new ParticipationBO(), this.state.participation);
            updatedParticipation.setGradingID(this.state.gradingIdForSelect);
            if(updatedParticipation.getPriority() === null){
                updatedParticipation.setPriority(4);
            }
    }
    }



    getAllSemester = () => {

        ElectionSystemAPI.getAPI().getAllSemester()
        .then(semesterBO =>{
            this.setState({
                semester: semesterBO,
                gradingPeriod: semesterBO.getGrading(),
                error: null,
                loaded:true
            });
            this.handleButtonStyle();
             }).catch(e =>
                this.setState({
                    semester: {},
                    error: e
                }))
    }


    getParticipationForStudentAndProject =() =>{
        ElectionSystemAPI.getAPI().getParticipationForStudentAndProject(this.props.student.getID(),this.props.pdID)
        .then(participationBO =>{
            this.stateHandler(participationBO);
            }).catch(e =>
            this.setState({
                error: e
        }))
    }

    stateHandler = (pb) =>{
        this.setState({
            participation: pb,
        }, function(){
            if(this.state.del){
                this.deleteParicipation(pb)
                
            }else{
                this.updateParticipation()
                
            }
        })

    }
    

    getParticipationForStudentAndProjectTwo =() =>{
        ElectionSystemAPI.getAPI().getParticipationForStudentAndProject(this.props.id,this.props.pdID)
        .then(participationBO =>
            this.setState({
                participationForGrading: participationBO,
                gradingIdForSelect: participationBO.getGradingID(),
                loaded: true,
                error: null
            }, function(){
                if(this.state.gradingIdForSelect !== null){
                this.setState({
                    labelname: '',
                })
                }
            })).catch(e =>
                this.setState({
                    participationForGrading:[],
                    error: e
                }))
    }



    handleSelectChangeGrade = (e) =>{
        this.setState({
            gradingIdForSelect: e.target.value
        });
    }

    handleButtonStyle(){

        if(this.state.gradingPeriod){
            this.setState({
                disabled: false
            })
        } else{
            this.setState({
                disabled: true
            })
        }
    }

    handleClick = () =>{
        this.getParticipationForStudentAndProject();

    }


    deleteParicipation = (participation) => {
        let studentid = participation.getStudentID();
        ElectionSystemAPI.getAPI().deleteParticipation(participation.getID())
        .then(par => {
            this.props.removeStudent(studentid);
        }).catch(e =>
          this.setState({
            error: e
          })
        );
        
    }

    deleteHandler(student){
        this.setState({
            del: true

        })
        this.getParticipationForStudentAndProject(student.getID(),this.props.pdID);

    }




    componentDidMount() {
         this.getAllGrades();
         this.getAllSemester();
         this.getParticipationForStudentAndProjectTwo();

    }

    render() {

        const { classes } = this.props;
        const {activeIndex, buttonText} = this.state;
        const { gradings, error, students} = this.state;
        const {projects, loadingInProgress} = this.state;




        return (
            <Container maxWidth="xl">
                <Grid container justify="flex-start" xs={12} md={12} className={classes.grid}>

                    <Grid item xs={1} md={2}>
                        <Button aria-label="delete" variant="outlined" onClick={() => this.deleteHandler(this.props.student)}>
                            <DeleteIcon />
                        </Button>
                    </Grid>
                    <Grid item xs={1} md={2}>
                        {this.props.name}
                    </Grid>
                    <Grid item xs={1} md={1}>
                        {this.props.firstname}
                    </Grid>
                    <Grid item xs={1} md={1}>
                        {this.props.mrtnr}
                    </Grid>
                    <Grid item xs={1} md={2}>
                        {this.props.course}
                    </Grid>
                    <Grid item xs={1} md={1}>
                        <FormControl
                            style={{minWidth: 90}}
                            variant="outlined">
                                <InputLabel > {this.state.labelname}</InputLabel>
                                    <Select
                                        label={this.state.labelname}
                                        value={this.state.gradingIdForSelect}
                                        defaultValue=""
                                        onChange={this.handleSelectChangeGrade}
                                        name="gradingid">
                                        {this.state.gradings.map((grading) => (
                                            <MenuItem key={grading.getID()} value={grading.getID()}>
                                                {grading.getGrade()}
                                            </MenuItem>
                                        ))}
                                    </Select>
                        </FormControl>
                    </Grid>
                    <Grid className={classes.save} item xs={1} md={1}>
                        <Button variant="outlined" onClick={this.handleClick} disabled={this.state.disabled}> SAVE </Button>
                    </Grid>
                    <Grid/>
                </Grid>
                 <LoadingProgress show={loadingInProgress} />
            </Container>
        )
    }
}

const styles = theme => ({
    grid: {
        width: '100%',
        margin: '0px',
        padding: theme.spacing(1),

    },
    
    save: {
        marginLeft: '20px',
    },

    redHeader: {
        color: theme.palette.red,
        fontFamily: 'Arial',
        fontStyle: 'bold',
        fontSize: 20
    },

    grayHeader: {
        color: theme.palette.gray,
        fontFamily: 'Arial',
        fontStyle: 'bold',
        fontSize: 35,
    }


});
export default withStyles(styles) (TableListEntryTeilnehmer);
