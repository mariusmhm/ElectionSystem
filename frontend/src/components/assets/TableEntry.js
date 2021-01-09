import React, { Component } from 'react';
import { TableRow, TableCell, Button, Collapse, FormControl, InputLabel, MenuItem, Select, Typography } from "@material-ui/core";
import { ExpandMoreIcon } from '@material-ui/icons/ExpandMore';

import { ElectionSystemAPI, ProjectBO, ParticipationBO, ProjecttypeBO } from '../../api';
import ParticipationButton from '../assets/ParticipationButton'


class TableEntry extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tableData: [],
            projects: [],
            projecttypes: [],
            error: null,
            priority: '',
            updatingError: null,
            deletingError: null,
            loaded: null,
            id: null,
            name: null,
            dsc: null,
            prof: null,
            activeIndex: null,






        };
        this.baseState = this.state;
        this.toggleClass = this.toggleClass.bind(this);

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




    render() {

        const { classes } = this.props;
        const {activeIndex} = this.state;

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
                    {this.props.prof}
                </TableCell>
                <TableCell>
                    ECTS
                </TableCell>
                <TableCell>
                    SWS
                </TableCell>
                <TableCell>
                    <TableCell>
                        <FormControl >
                            <InputLabel id="demo-simple-select-label">PRIORITY</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                            >
                                <MenuItem > no priority</MenuItem>
                                <MenuItem > 1st priority</MenuItem>
                                <MenuItem >2nd priority </MenuItem>
                                <MenuItem >3rd priority </MenuItem>
                                <MenuItem >4th priority </MenuItem>
                            </Select>
                        </FormControl>
                    </TableCell>
                    <TableCell>
                        <ParticipationButton />
                    </TableCell>
                </TableCell>
            </TableRow>
        )
    }



}
export default (TableEntry);