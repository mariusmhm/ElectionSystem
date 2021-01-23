import React, { Component } from 'react';
import { TableRow, TableCell, Button, Collapse, FormControl, InputLabel, MenuItem, Select, Typography } from "@material-ui/core";
import { ExpandMoreIcon } from '@material-ui/icons/ExpandMore';

import { ElectionSystemAPI, ProjectBO, ParticipationBO, ProjecttypeBO, StudentBO, GradingBO, SemesterBO } from '../../../api';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';

import FormHelperText from '@material-ui/core/FormHelperText';
import NativeSelect from '@material-ui/core/NativeSelect';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';



class TableListEntryTeilnehmer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            priority: '',
            updatingError: null,
            deletingError: null,
            loaded: false,
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
                loaded: true,
                error: null
            })).catch(e =>
                this.setState({
                    gradings:[],
                    error: e
                }))
        console.log('ausgeführt');

    }

    //Updates the grade of the student in a participation object
    updateParticipation= () => {
        // clone original participation, in case the backend call fails
        let updatedParticipation = new ParticipationBO();
        // set the new attributes from our dialog
        console.log('gradingid' + this.state.gradingIdForSelect);
        updatedParticipation = this.state.participations;
        updatedParticipation.setGradingID(this.state.gradingIdForSelect);
        console.log(JSON.stringify(updatedParticipation));
        ElectionSystemAPI.getAPI().updateParticipation(updatedParticipation).catch(e => console.log(e));
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


    getParticipationForStudentAndProject =(studentid, projectid) =>{
        ElectionSystemAPI.getAPI().getParticipationForStudentAndProject(studentid,projectid)
        .then(participationBO =>{
            this.setState({
                participations: participationBO,
                partid: participationBO.getID(),
                loaded: true,
                error: null
            });
            console.log(this.state.del);
            if(this.state.del){
                this.deleteParicipation(this.state.participations);
                console.log('delete');
            }else if(this.state.del === false){
                this.updateParticipation();
                console.log('update');
            }

            }).catch(e =>
                this.setState({
                    participations:[],
                    error: e
                }))
        console.log('ausgeführt');
    }

    getParticipationForStudentAndProjectTwo =() =>{
        ElectionSystemAPI.getAPI().getParticipationForStudentAndProject(this.props.id,1)
        .then(participationBO =>{
            this.setState({
                participationForGrading: participationBO,
                gradingIdForSelect: participationBO.getGradingID(),

                loaded: true,
                error: null
            });
            if(this.state.gradingIdForSelect !== null){
                this.setState({
                    labelname: '',
                })
            }

            console.log(this.state.gradingIdForSelect)
            }).catch(e =>
                this.setState({
                    participations:[],
                    error: e
                }))
        console.log('ausgeführt');
    }



    handleSelectChangeGrade = (e) =>{
        console.log(e.target.value);
        console.log("New Grade Selected!")
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

    handleClick = (student) =>{
        this.getParticipationForStudentAndProject(student.getID(),1)


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
        this.getParticipationForStudentAndProject(student.getID(),1)

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




        return (
            <TableRow key={this.props.id}>
                <TableCell>
                    <Button aria-label="delete" variant="outlined" onClick={() => this.deleteHandler(this.props.student)}>
                        <DeleteIcon />
                    </Button>
                </TableCell>
                <TableCell>
                        {this.props.name}
                </TableCell>
                 <TableCell>
                        {this.props.firstname}
                </TableCell>
                <TableCell>
                        {this.props.mrtnr}
                </TableCell>
                <TableCell>
                        {this.props.course}
                </TableCell>

                <TableCell>
                    <FormControl
                        style={{minWidth: 120}}
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
                </TableCell>
                <TableCell>
                    <Button variant="outlined" onClick={() => this.handleClick(this.props.student)} disabled={this.state.disabled}> SAVE </Button>
                </TableCell>


            </TableRow>
        )
    }
}

const styles = theme => ({
    grid: {
        width: '100%',
        margin: '0px',
        padding: theme.spacing(3)
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
    },


});
export default (TableListEntryTeilnehmer);
