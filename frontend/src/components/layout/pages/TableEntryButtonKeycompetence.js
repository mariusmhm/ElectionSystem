import React, { Component } from 'react';
import { TableRow, TableCell, Button, IconButton, Collapse, FormControl, InputLabel, MenuItem, Select, Typography } from "@material-ui/core";
import { ExpandMoreIcon } from '@material-ui/icons/ExpandMore';

import { ElectionSystemAPI, ProjectBO, ParticipationBO, ProjecttypeBO, ModuleBO } from '../../../api';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';

import FormHelperText from '@material-ui/core/FormHelperText';
import NativeSelect from '@material-ui/core/NativeSelect';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';




class TableEntryButtonTwo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tableData: [],
            projects: [],
            projecttypes: [],
            users: [],
            type: null,
            projecttypeName: '',
            moduleName: '',
            error: null,
            priority: '',
            updatingError: null,
            deletingError: null,
            loaded: false,
            id: null,
            name: null,
            dsc: null,
            prof: null,
            ects: null,
            sws: null,
            activeIndex: null,
            select: true,
            lastname: '',
            firstname: '',
            project:'',
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

    getProjectType = () => {
        ElectionSystemAPI.getAPI().getProjecttype(this.props.type)
        .then(projecttypeBO =>
            this.setState({
            projecttypeName: projecttypeBO.getName(),
            loaded:true,
            error: null
            })). catch(e =>
            this.setState({
                projecttypeName: [],
                error: e
            }))
    }


     getModule = () => {
        ElectionSystemAPI.getAPI().getModule(this.props.module)
                .then(moduleBO =>
                        this.setState({
                        moduleName: moduleBO.getName(),
                        loaded:true,
                        error: null
                        })). catch(e =>
                        this.setState({
                            moduleName: [],
                            error: e
                        }))
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
        this.getProjectType();
        this.getModule();
    }






    render() {


        const { classes } = this.props;
        const {activeIndex, buttonText} = this.state;

        return (
            <TableRow key={this.props.id}>

                <TableCell>
                        {this.props.name}
                    <Collapse in={activeIndex === this.props.id}>
                        {this.props.dsc}
                    </Collapse>
                </TableCell>

                <TableCell>
                        {this.state.loaded ? this.state.lastname: null}, {this.state.loaded ? this.state.firstname: null}
                </TableCell>
                <TableCell>
                        {this.state.loaded ? this.state.projecttypeName: null}
                </TableCell>
                        {this.state.loaded ? this.state.moduleName: null}
                <TableCell>
                     <Button variant ="outlined">Participator</Button>
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
export default (TableEntryButtonTwo);
