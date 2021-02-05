import React, { Component } from 'react';
import {Button, Collapse, FormControl,  MenuItem, Select, Typography, Grid, Divider } from "@material-ui/core";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { Redirect, Route } from 'react-router'
import { ElectionSystemAPI, ParticipationBO,} from '../../api';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import DoneAllIcon from '@material-ui/icons/DoneAll';

import GradingEditingDialog from '../dialogs/GradingEditingDialog'



import {withStyles} from '@material-ui/core';
import ProjectReport from '../layout/pages/ProjectReport';
import { Link } from 'react-router-dom';





class TableEntry extends Component {
    constructor(props) {
        super(props)

        let today = new Date(),
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        this.state = {
            creationDate: date,
            tableData: [],
            projects: [],
            projecttypes: [],
            users: [],
            error: null,
            updatingError: null,
            deletingError: null,
            loaded: false,
            id: null,
            name: null,
            dsc: null,
            prof: null,
            ects: null,
            sws: null,
            participationID: this.props.participationID,
            activeIndex: null,
            select: true,
            lastname: '',
            firstname: '',
            priority: 0,
            cUserID: null,
            buttoncounter:0,
            grading: 2,
            grade: [],
            open: false,
            gradeLoaded: false,
            







        };
        this.baseState = this.state;
        this.toggleClass = this.toggleClass.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        
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
                })).catch(e =>
                    this.setState({
                        users: [],
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
        this.setState({ priority: e.target.value });
      }

    

    handleClickOpen = () => {
        this.props.history.push({
            pathname: '/project-report',
            state:{
                participationid: this.state.participationID
            }
        })
      }

    handleClose = () => {
        this.setState({open: false})
        
      };

    getGradingByGradingID = () => {
        ElectionSystemAPI.getAPI().getGrade(this.props.grading)
        .then(gradingBO =>
            this.setState({
                grade: gradingBO,
                gradeLoaded: true,
                error: null
            }))
            
        
        
        
        .catch(e => 

                this.setState({
                    participationLoaded: [],
                    error: e

                }))
        
    }


    componentDidMount() {
        this.getUser();
        this.getGradingByGradingID();
        
    }



    render() {

        

        const { classes } = this.props;
        const {activeIndex} = this.state;

        console.log('Grade '+this.state.grade)

        

        return (
  
 
            <Grid container justify="flex-start" xs={12} md={12}>
                   
                   
                    <Grid container justify="flex-start" xs={12}>
                        
                        <Grid item xs={6} md={6}>
                                
                                    <Button
                                            variant="contained"
                                            color="none"
                                            onClick={this.toggleClass.bind(this, this.props.id)}
                                            style={{ backgroundColor: 'transparent', boxShadow: 'none' }}
                                            endIcon={this.state.activeIndex ? <ArrowDropDownIcon /> : <ArrowDropDownIcon />}
                                        >
                                            <Typography variant="h5">{this.props.name}</Typography>
                                    </Button>
                                
                        </Grid>

                        <Grid container xs={6} md={6} justify="flex-end" spacing={3}>
                            
                            <Grid item xs={4} md={3}>
                            <Typography variant="subtitle2">
                                         Grade: {this.state.gradeLoaded ? this.state.grade.getGrade():null}</Typography>
                            </Grid>
                            
                            
                            <Grid item xs={4} md={3}>
                            
                                <Button 
                                variant="contained" 
                                color="primary" 
                                fullWidth
                                onClick={this.handleClickOpen}
                                >
                                    Report
                                </Button>
                                
                            </Grid>
                        </Grid>
                        
                    </Grid>

                <Divider />
                
                
                
                <Grid xs={12} container justify="flex-end" spacing={12} >

                    <Grid xs={12} md={11} container justify="flex-start"  alignItems="flex-end">
        
                                <Collapse in={activeIndex === this.props.id}>

                                    <Grid xs={12} md={11} item >

                                        <Typography variant="h6">Kurzbeschreibung<br/></Typography>

                                            {this.props.dsc}

                                    </Grid>
                                    <br/>
                                    <Grid container justify="flex-start" md={9} xs={9}>
                                        <Grid item xs={3} md={3}>
                                            <Typography variant="subtitle2">Ects: {this.props.ects}</Typography>
                                        </Grid>
                                        <Grid item xs={3} md={3}>
                                            <Typography variant="subtitle2">SWS: {this.props.sws}</Typography>
                                        </Grid>
                                        <Grid container justify="flex-end" md={3} xs={3}>
                                            <Grid item xs={3} md={3}>
                                                <Typography variant="subtitle2">Professor*in:&nbsp;{this.state.loaded ? this.state.lastname: null},&nbsp;{this.state.loaded ? this.state.firstname: null}</Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <br/>
                                    

                                    
                                </Collapse>
                        
                    </Grid>

                </Grid> 

                
            
            
             
            
            </Grid>
            

           
            
            
            
        )
    }



}




const styles = theme => ({
    grid:{
        width: '100%',
        margin: '0px',
        padding: theme.spacing(3)
    },
    button:{
        marginTop: theme.spacing(3)
    },
    redHeader:{
        color: theme.palette.red,
        fontFamily: 'Arial',
        fontStyle: 'bold',
        fontSize: 15
    },
 
});

export default withStyles(styles)(TableEntry);