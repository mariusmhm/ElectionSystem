import React, { Component } from 'react';
import { Button } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import { ElectionSystemAPI } from '../../../api';
import {withStyles} from '@material-ui/core';
import LoadingProgress from '../../dialogs/LoadingProgress';


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
            loadingInProgress: false,
            ptype: {},

            
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
                    error: null,
                })).catch(e =>
                    this.setState({
                        users: [],
                        loadingInProgress: false,
                        error: e
                    }));
                this.setState({
                     loadingInProgress: true,
                     error: null
                    });

    }


    getProjectType = () => {
        ElectionSystemAPI.getAPI().getProjecttype(this.props.type)
        .then(projecttypeBO =>
            this.setState({
            projecttypeName: projecttypeBO.getName(),
            ptype: projecttypeBO,
            loadingInProgress: false,
            error: null
            })). catch(e =>
            this.setState({
                projecttypeName: [],
                loadingInProgress: false,
                error: e
            }));
            this.setState({
                 loaded:true,
                 loadingInProgress: true,
                 error: null
                 });
    }

    handleClick = () => {
        this.props.history.push({
            pathname: '/admin/project-edit',
            state:{
                project: this.props.project,
                ptype: this.state.ptype,
                cUser: this.props.history.location.state.cUser
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
                    loadingInProgress: false,
                    error: null
                })).catch(e =>
                    this.setState({
                        projects: [],
                        loadingInProgress: false,
                        error: e
                    }));
                this.setState({
                    loadingInProgress: true,
                    error: null
                 });
    }


    render() {


        const { classes } = this.props;
        const { loadingInProgress, loaded} = this.state;

        return (
           <Grid container  justify="flex-start"  xs={12} xl={12}>
                 <Grid container justify="flex-start" xs={12}>
                    <Grid item xs={3} md={3}>
                        {this.props.name}
                    </Grid>
                    <Grid item xs={3} md={3}>
                        {this.state.loaded ? this.state.lastname: null}, {this.state.loaded ? this.state.firstname: null}
                    </Grid>
                     <Grid item xs={3} md={3}>
                        {this.state.loaded ? this.state.projecttypeName: null}
                     </Grid>
                    <Grid item xs={3} md={3}>
                            <Button variant ="outlined" onClick={this.handleClick} >Edit </Button>
                    </Grid>
                 </Grid>
                   <LoadingProgress show={loadingInProgress}/>
             </Grid>

        )
    }
}




export default TableEntryButtonTwo;
