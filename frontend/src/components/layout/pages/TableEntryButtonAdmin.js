import React, { Component } from 'react';
import {  Grid, Button, IconButton, Collapse, FormControl, InputLabel, MenuItem, Select, Typography } from "@material-ui/core";
import { ExpandMoreIcon } from '@material-ui/icons/ExpandMore';

import { ElectionSystemAPI, ProjectBO, ParticipationBO, ProjecttypeBO } from '../../../api';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import {withStyles} from '@material-ui/core';
import FormHelperText from '@material-ui/core/FormHelperText';
import NativeSelect from '@material-ui/core/NativeSelect';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import LoadingProgress from '../../dialogs/LoadingProgress';




class TableEntryButtonAdmin extends Component {
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
            project:'',
            priority: 0,
            loadingInProgress: false


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


    }
   



    render() {


        const { classes } = this.props;
        const {activeIndex, buttonText, loadingInProgress} = this.state;

        return (

            <Grid container justify="flex-start"  xs={12} xl={12} >
                 <Grid container justify="flex-start"  xs={12}>
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
                        <Button aria-label="delete"  variant="outlined">
                          <DeleteIcon fontSize="small" onClick={() => this.props.deleteProject(this.props.project)}/>
                        </Button>
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
export default withStyles(styles) (TableEntryButtonAdmin);
