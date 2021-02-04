import React, { Component } from 'react';
import { Grid, Button, Collapse, FormControl, InputLabel, MenuItem, Select, Typography } from "@material-ui/core";
import { ElectionSystemAPI, ProjectBO, ParticipationBO, ProjecttypeBO } from '../../../api';
import {withStyles} from '@material-ui/core';
import { Redirect } from 'react-router'
import { makeStyles } from '@material-ui/core/styles';
import GroupIcon from '@material-ui/icons/Group';
import LoadingProgress from '../../dialogs/LoadingProgress';



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
            priority: 0,
            loadingInProgress: false


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
                    loadingInProgress: false,
                    error: null
                }),console.log(this.state.users)).catch(e =>
                    this.setState({
                        users: [],
                         loadingInProgress: false,
                        error: e
                    }));
                this.setState({
                        loadingInProgress: true,
                        loaded:true,
                        error: null
                    });
    }

    getProjectType = () => {
        ElectionSystemAPI.getAPI().getProjecttype(this.props.type)
        .then(projecttypeBO =>
            this.setState({
            projecttypeName: projecttypeBO.getName(),
            loadingInProgress: false,
            error: null
            })). catch(e =>
            this.setState({
                projecttypeName: [],
                loadingInProgress: false,
                error: e
            }));
        this.setState({
               loadingInProgress: true,
               loaded:true,
               error: null
                    });
    }

    handleClick = () =>{
       this.props.history.push({
           pathname: '/admin/particpations',
           state:{
               projectID: this.props.pd,
               projectName: this.props.name,
               project: this.props.project,
               prof: this.props.prof
           }
       })

    }

    pcHandleClick = () =>{
        console.log('click');
        this.props.history.push({
            pathname: '/admin/project-content',
            state:{
                projectID: this.props.pd,
            }
        })
 
     }

    componentDidMount() {
        this.getUser();
        this.getProjectType();


    }



    render() {


        const {classes}= this.props;
        const {loadingInProgress} = this.state;

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
                        <Button variant ="outlined" onClick={() => this.pcHandleClick()}>Info</Button>
                    </Grid>
                    
                    </Grid>
                   <LoadingProgress show={loadingInProgress} />
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
