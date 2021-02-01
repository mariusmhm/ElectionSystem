import React, { Component } from 'react';
import {  Button, Collapse } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import { Redirect } from 'react-router'
import { ElectionSystemAPI, ProjectBO, ParticipationBO, ProjecttypeBO } from '../../../api';
import {withStyles} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';





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
            error: null,
            priority: '',
            project:'',
            proj:'',
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
            duringSemester: false,

            
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

    handleClick = () => {
        console.log('openProjectUpdateAdmin')
        this.props.history.push({
            pathname: '/admin/project-edit',
            state:{
                project: this.props.project,
            }
        })

    }

    componentDidMount() {
        this.getUser();
        this.getProjectType();
        this.getAllProjects();
    }

     /** Gives back the projects */
    getAllProjects = () => {
        ElectionSystemAPI.getAPI().getAllProjects()
            .then(ProjectsBO =>
                this.setState({
                    projects: ProjectsBO,
                    loaded: true,
                    error: null
                })).catch(e =>
                    this.setState({
                        projects: [],
                        error: e
                    }))
    }


    render() {


        const { classes } = this.props;
        const {activeIndex} = this.state;

        return (
           <Grid container  justify="flex-start"  xs={12} xl={12} className={classes.grid}>
                 <Grid container justify="flex-start" xs={12} className={classes.grid}>
                    <Grid item xs={3} md={3}>
                        {this.props.name}
                    </Grid>
                    <Grid item xs={3} md={3}>
                        {this.state.loaded ? this.state.lastname: null}, {this.state.loaded ? this.state.firstname: null}
                    </Grid>
                     <Grid item xs={3} md={2}>
                        {this.state.loaded ? this.state.projecttypeName: null}
                     </Grid>
                    <Grid item xs={3} md={4}>
                            <Button variant ="outlined" onClick={this.handleClick} >Edit </Button>
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
        padding: theme.spacing(1)
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
export default withStyles(styles) (TableEntryButtonTwo);
