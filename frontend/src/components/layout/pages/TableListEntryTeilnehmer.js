import React, { Component } from 'react';
import { TableRow, TableCell, Button, Collapse, FormControl, InputLabel, MenuItem, Select, Typography } from "@material-ui/core";
import { ExpandMoreIcon } from '@material-ui/icons/ExpandMore';

import { ElectionSystemAPI, ProjectBO, ParticipationBO, ProjecttypeBO, StudentBO, GradingBO } from '../../../api';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';

import FormHelperText from '@material-ui/core/FormHelperText';
import NativeSelect from '@material-ui/core/NativeSelect';
import { makeStyles } from '@material-ui/core/styles';




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
            name: null,
            mrtnr:null,
            course:null,
            activeIndex: null,
            select: true,
            lastname: '',
            priority:'',
            gradingid:'',
            partid:'',
            studentid:'',
            student:'',
            gradings:[],
            students:[],
            participations: [],
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
        let originParticipation = this.state.participations;
        // clone original participation, in case the backend call fails
        let updatedParticipation = Object.assign(new ParticipationBO(), originParticipation);
        // set the new attributes from our dialog
        updatedParticipation.setGradingID(this.state.gradingid);
        console.log(JSON.stringify(updatedParticipation));
        console.log(JSON.stringify(originParticipation));
        ElectionSystemAPI.getAPI().updateParticipation(updatedParticipation).catch(e => console.log(e));

    }
    getParticipationForStudentAndProject =() =>{
        ElectionSystemAPI.getAPI().getParticipationForStudentAndProject(1,1)
        .then(participationBO =>
            this.setState({
                participations: participationBO,
                partid: participationBO.getID(),
                loaded: true,
                error: null
            }),
            console.log(this.state.participations)
            ).catch(e =>
                this.setState({
                    participations:[],
                    error: e
                }))
        console.log('ausgeführt');

    }


    getStudentByParticipations = () => {
        ElectionSystemAPI.getAPI().getStudentByParticipations(2)
        .then(studentBOs =>
            this.setState({
                students: studentBOs,
                studentid: studentBOs.getID(),
                loaded: true,
                error: null
            })).catch(e =>
                this.setState({
                    students:[],
                    error: e
                }))
        console.log('ausgeführt');

    }


    handleSelectChangeGrade = (e) =>{
        console.log(e.target.value);
        console.log("New Grade Selected!")
        this.setState({
            [e.target.name]: e.target.value

        });
    }

    componentDidMount() {
         this.getStudentByParticipations();
         this.getAllGrades();
         this.getParticipationsForStudentProject();
    }

    render() {

        const { classes } = this.props;
        const {activeIndex, buttonText} = this.state;
        const { gradings, error, students} = this.state;

        return (
            <TableRow key={this.props.id}>
                <TableCell>
                        {this.props.name}
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
                       <InputLabel >GRADE </InputLabel>
                           <Select
                            label="GRADE"
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
                    <Button variant="outlined" onClick={this.updateParticipation}> SAVE </Button>
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
    button: {
        marginTop: theme.spacing(3)
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
