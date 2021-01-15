import React, { Component } from 'react';
import { TableRow, TableCell, Button, Collapse, FormControl, InputLabel, MenuItem, Select, Typography } from "@material-ui/core";
import { ExpandMoreIcon } from '@material-ui/icons/ExpandMore';

import { ElectionSystemAPI, ProjectBO, ParticipationBO, ProjecttypeBO, StudentBO } from '../../../api';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';

import FormHelperText from '@material-ui/core/FormHelperText';
import NativeSelect from '@material-ui/core/NativeSelect';
import { makeStyles } from '@material-ui/core/styles';




class TableListEntryTeilnehmer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tableData: [],
            users: [],
            error: null,
            priority: '',
            updatingError: null,
            deletingError: null,
            loaded: false,
            id: null,
            name: null,
            mrtnr:null,
            course:null,
            dsc: null,
            prof: null,
            ects: null,
            sws: null,
            activeIndex: null,
            select: true,
            lastname: '',
            student:'',
            gradings:'',
            students:[],
            firstname: '',
            priority: 0


        };
        this.baseState = this.state;
        this.toggleClass = this.toggleClass.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    getUser = () => {
        ElectionSystemAPI.getAPI().getUser(this.props.prof)
            .then(userBO =>
                this.setState({
                    users: userBO,
                    lastname: userBO.getName(),
                    firstname: userBO.getFirstname(),
                    loaded: true,
                    error: null
                }),console.log(this.state.users)).catch(e =>
                    this.setState({
                        users: [],
                        error: e
                    }))
        console.log('User ausgeführt');
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

    getStudentByParticipations = () => {
        ElectionSystemAPI.getAPI().getStudentByParticipations(2)
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
        console.log('ausgeführt');

    }

    toggleClass(index, e) {
        this.setState({
          activeIndex: this.state.activeIndex === index ? null : index
        });
      }

    moreLess(index) {
        if (this.state.activeIndex === index) {
          return (
            <span>
              <i className="fas fa-angle-up" /> Hide Description
            </span>
          );
        } else {
          return (
            <span>
              <i className="fas fa-angle-down" /> Show Description
            </span>
          );
        }
      }

    handleSelect(){
        this.setState({select: !this.state.select})

    }

    handleChange(e) {
        console.log("Fruit Selected!!");
        this.setState({ priority: e.target.value });
      }

    componentDidMount() {
        this.getUser();
         this.getStudentByParticipation();
         this.getAllGrades();



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
                    <FormControl>
                       <InputLabel >GRADE </InputLabel>
                           <Select labelId="grading">
                              {this.state.gradings.map((grading, index) => (
                                  <MenuItem key={index} value={index}>
                                     {grading.getGrade()}
                                         </MenuItem>
                                             ))}
                           </Select>
                    </FormControl>
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
        fontSize: 35
    },



});
export default (TableListEntryTeilnehmer);
