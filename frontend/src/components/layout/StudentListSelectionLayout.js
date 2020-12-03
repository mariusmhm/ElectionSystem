import React, { Component } from 'react';
import { Avatar, Paper, Tab, Tabs, Grid, Container, TextField, Typography, withStyles } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Switch from '@material-ui/core/Switch';
import Prio from './Prio';
import PropTypes from "prop-types";
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';


export default function Switches(props) {
    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
        checkedC: true,
    });

    const handleChange = (event, newValue) => {
        setState(newValue);
    };

    const { tasksIndexes, tasks } = props;

    return (
        <Paper>
            <Table>
                <TableBody>
                    {tasksIndexes.map(value => (
                        <TableRow key={value}>

                            <TableCell ><h3>{tasks[value]}</h3></TableCell>
                            <TableCell>

                            </TableCell>
                            <TableCell>
                                <Prio />
                            </TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    endIcon={<PlaylistAddCheckIcon/>}
                                >
                                    Choose
                                </Button>
                            </TableCell>

                        </TableRow>
                    ))
                    }
                </TableBody>
            </Table>
        </Paper>

    );
}

Switches.propTypes = {
    tasksIndexes: PropTypes.arrayOf(PropTypes.number),
    tasks: PropTypes.arrayOf(PropTypes.node),
    checkedIndexes: PropTypes.array
};