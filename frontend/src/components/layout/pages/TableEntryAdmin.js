import React, { Component } from 'react';
import { Grid, Button, Collapse, FormControl, InputLabel, MenuItem, Select, Typography } from "@material-ui/core";
import { ElectionSystemAPI, ProjectBO, ParticipationBO, ProjecttypeBO } from '../../../api';
import {withStyles} from '@material-ui/core';
import { Redirect } from 'react-router'
import { makeStyles } from '@material-ui/core/styles';
import GroupIcon from '@material-ui/icons/Group';




class TableEntryAdmin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tableData: [],
            projects: [],
            projecttypes: [],
            users: [],
            type: null,
            projecttypeName: '',
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
            priority: 0


        };
        this.baseState = this.state;
        
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

    handleClick = () =>{
       this.props.history.push({
           pathname: '/particpations',
           state:{
               projectID: this.props.pd
           }
       })

    }

    componentDidMount() {
        this.getUser();
        this.getProjectType();


    }



    render() {


        const {classes}= this.props;
        const {activeIndex, buttonText} = this.state;

        return (

            <Grid container justify="flex-start" xs={12}>
                <Grid container justify="flex-start" xs={12} spacing={2}>
                    <Grid item xs={3} md={3}>
                        {this.props.name}
                    </Grid>
                    <Grid item xs={3} md={3}>
                        {this.state.loaded ? this.state.lastname: null}, {this.state.loaded ? this.state.firstname: null}
                    </Grid>
                    <Grid item xs={3} md={3}>
                        {this.state.loaded ? this.state.projecttypeName: null}
                    </Grid>
                    <Grid item xs={3} md={1}>
                        <Button variant ="outlined" onClick={() => this.handleClick()}><GroupIcon/></Button>
                    </Grid>
                    <Grid item xs={3} md={2}>
                        <Button variant ="outlined">Info</Button>
                    </Grid>
                    
                    </Grid>
            </Grid>

        )
    }
}


const styles = theme => ({
    grid: {
        width: '100%',
        margin: '0px',
        paddingTop: theme.spacing(1)
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

export default withStyles(styles) (TableEntryAdmin);
