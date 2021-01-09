import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { AppBar, Tabs, Tab, withStyles, Collapse, Card } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import { makeStyles } from '@material-ui/core/styles';
import { ja } from 'date-fns/locale';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';


class ParticipationButton extends Component {

    constructor(props) {
        super(props)
        this.state = {
            color: true

        };
        this.changeColor = this.changeColor.bind(this);
    }


    changeColor(){
        this.setState({color: !this.state.color})
    }



    render() {
        const {color} = this.state;
        return(<div>
        <Button
            variant="contained"
            color="secondary"
            endIcon={<PlaylistAddCheckIcon />}
            color={this.state.color ? "primary": "secondary"} onClick={this.changeColor} >Choose
        </Button>
        </div>)
    }
}

export default (ParticipationButton);