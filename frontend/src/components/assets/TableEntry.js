import React, { Component } from 'react';
import { TableRow, TableCell, Button, Collapse, FormControl, InputLabel, MenuItem, Select, Typography } from "@material-ui/core";
import { ExpandMoreIcon } from '@material-ui/icons/ExpandMore';

import { ElectionSystemAPI, ProjectBO, ParticipationBO, ProjecttypeBO } from '../../api';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';

import FormHelperText from '@material-ui/core/FormHelperText';
import NativeSelect from '@material-ui/core/NativeSelect';
import { makeStyles } from '@material-ui/core/styles';




class TableEntry extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tableData: [],
            projects: [],
            projecttypes: [],
            users: [],
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






        };
        this.baseState = this.state;
        this.toggleClass = this.toggleClass.bind(this);
        this.handleSelect = this.handleSelect.bind(this);

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

    componentDidMount() {
        this.getUser();

      
    }



    render() {

        
        const { classes } = this.props;
        const {activeIndex, buttonText} = this.state;

        return (
            <TableRow key={this.props.id}>
                <TableCell>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.toggleClass.bind(this, this.props.id)}
                    >
                        {this.moreLess(this.props.id)}
                    </Button>



                </TableCell>


                <TableCell>
                    <Typography variant="h5">
                        {this.props.name}
                    </Typography>

                    <Collapse in={activeIndex === this.props.id}>
                        {this.props.dsc}
                    </Collapse>
                </TableCell>
                <TableCell>
                    <Typography variant="h5">
                        {this.state.loaded ? this.state.lastname: null}, {this.state.loaded ? this.state.firstname: null}
                    </Typography>
                </TableCell>
                <TableCell>
                    ECTS: {this.props.ects}
                </TableCell>
                <TableCell>
                    SWS:  {this.props.sws}
                </TableCell>
                <TableCell>
                    <TableCell>
                        <FormControl>
                            <InputLabel class="demo-simple-select-helper-label">Priority</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                defaultValue="0"
                            >
                                <MenuItem value="0">None selected</MenuItem>
                                <MenuItem value="1"> 1st priority</MenuItem>
                                <MenuItem value="2">2nd priority </MenuItem>
                                <MenuItem value="3">3rd priority </MenuItem>
                                <MenuItem value="4">4th priority </MenuItem>
                            </Select>
                        </FormControl>
                    </TableCell>
                    <TableCell>
                    <Button
                        variant="contained"
                        color="secondary"
                        
                        endIcon={<PlaylistAddCheckIcon />}
                        color={this.state.select ? "primary": "secondary"} 
                         
                        onClick={this.handleSelect} > {this.state.select ? "Select" : "Deselect"}
                        
                        
                                
                    </Button>
                    </TableCell>
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

    formControl: {
        minWidth: '120px',
        fontSize: '15px'}


});
export default (TableEntry);