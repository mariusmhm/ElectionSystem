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
            participations:{},
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
        if(this.state.participations != null){
            console.log('lets go: '+ JSON.stringify(this.state.participations));
        let updatedParticipation = Object.assign(new ParticipationBO(), this.state.participations) ;
        
        // set the new attributes from our dialog
        updatedParticipation.setStudentID(this.props.student.getID())
        updatedParticipation.setGradingID(this.state.gradingIdForSelect);
        
        ElectionSystemAPI.getAPI().updateParticipation(updatedParticipation).catch(e => console.log(e));
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
            this.setState({
                participations: participationBO,
                partid: participationBO.getID(),
                partLoaded: true,
                error: null
        })})
        
            
        .catch(e =>
            this.setState({
                
                error: e
        }))
    }
            
    defineOp = () => {
        
            console.log('defineOp started');
            console.log('id:'+this.state.participations.id)
            console.log('priority:'+this.state.participations.priority)
            console.log('grading_id:'+this.state.participations.grading_id)
            console.log('student_id:'+this.state.participations.student_id)
            console.log('project_id:'+this.state.participations.project_id)
            if(this.state.del){
                this.deleteParicipation(this.state.participations)
                
            }else{
                this.updateParticipation()
                
            }
        
    }
    

    getParticipationForStudentAndProjectTwo =() =>{
        console.log('hallo grading');
        ElectionSystemAPI.getAPI().getParticipationForStudentAndProject(this.props.id,this.props.pdID)
        .then(participationBO =>
            this.setState({
                participationForGrading: participationBO,
                gradingIdForSelect: participationBO.getGradingID(),
                loaded: true,
                error: null
            }, function(){
                console.log(participationBO.getGradingID());
                console.log('gradin id');
                if(this.state.gradingIdForSelect !== null){
                this.setState({
                    labelname: '',
                })
                }
                console.log(this.state.gradingIdForSelect)
            })).catch(e =>
                this.setState({
                    participationForGrading:[],
                    error: e
                }))
    }



    handleSelectChangeGrade = (e) =>{
        console.log("New Grading Selected")
        console.log(e.target.value);
        this.setState({
            gradingIdForSelect: e.target.value
        });
        thishandleClick()
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

    handleClick = (student) =>{
        this.getParticipationForStudentAndProject()



    }


     deleteParicipation = (participation) => {
        ElectionSystemAPI.getAPI().deleteParticipation(participation.getID()).then(participation => {

        }).catch(e =>
          this.setState({
            error: e
          })
        );
        this.props.removeStudent(participation.getStudentID());
    }

    deleteHandler(student){
        this.setState({
            del: true

        })
        this.getParticipationForStudentAndProject(student.getID(),this.props.pdID);
        console.log(this.state.gradingIdForSelect)

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
                    <Grid item xs={1} md={1}>
                        <Button variant="outlined" onClick={() => this.defineOp()} disabled={this.state.disabled}> SAVE </Button>
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
