import React, { Component } from 'react';
import { TableRow, TableCell, Button, Collapse, FormControl, InputLabel, MenuItem, Select, Typography, TableContainer, Grid, Divider, Container } from "@material-ui/core";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

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
            priority: 0,
            student: 1,






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

    handleChange(e) {
        this.setState({ priority: e.target.value });
      }

    addParticipation = () =>{
        let newParticipation = new ParticipationBO(this.state.priority,null,this.state.student, this.props.id );
        ElectionSystemAPI.getAPI().addParticipation(newParticipation).then(participation => {
            newParticipation.setPriority(this.state.priority)
            newParticipation.setProjectID(this.props.id)
            newParticipation.setStudentID(this.state.student)
            newParticipation.setDate(this.state.date)
            console.log(newParticipation)
            console.log("Participation created");
            
        }).catch(e =>
            
            this.setState({
                updatingError: e
            }))
    }

    componentDidMount() {
        this.getUser();
    }



    render() {

        
        const { classes } = this.props;
        const {activeIndex, buttonText} = this.state;

        return (
            
            <Grid container justify="flex-start" xs={12} xl={12}>

                

                    <Grid container justify="flex-start" xs={12}  >
                        
                        <Grid item xs={12} xl={6}>
                                
                                    <Button
                                            variant="contained"
                                            color="none"
                                            onClick={this.toggleClass.bind(this, this.props.id)}
                                            endIcon={this.state.activeIndex ? <ArrowDropUpIcon/> : <ArrowDropDownIcon />}
                                        >
                                            <Typography variant="h5">{this.props.name}</Typography>
                                    </Button>
                                
                        </Grid>
                        <Grid container xs={12} xl={6} justify="flex-end">
                            <Grid item xs={6} xl={2}>
                                <FormControl>
                                
                                    <Select
                                        labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select-helper"
                                        defaultValue="0"
                                        onChange={this.handleChange}
                                    >
                                        <MenuItem value="0">Priority</MenuItem>
                                        <MenuItem value="1"> 1st priority</MenuItem>
                                        <MenuItem value="2">2nd priority </MenuItem>
                                        <MenuItem value="3">3rd priority </MenuItem>
                                        <MenuItem value="4">4th priority </MenuItem>
                                    </Select>
                                </FormControl>
                            
                            
                            
                            </Grid>
                            <Grid item xs={6} xl={2}>
                                
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    
                                    endIcon={<PlaylistAddCheckIcon />}
                                    color={this.state.select ? "primary": "secondary"} 
                                    
                                    onClick={() => {
                                        this.addParticipation();
                                        this.handleSelect();
                                    }}>  {this.state.select ? "Select" : "Deselect"}      
                                </Button>

                            </Grid>
                        </Grid>
                        
                    </Grid>

                <Divider />
                
                
                
                <Grid xs={12} container justify="flex-end" spacing={12} >

                    <Grid xs={12} xl={11} container justify="flex-start"  alignItems="flex-end">
        
                                <Collapse in={activeIndex === this.props.id}>

                                    <Grid xs={12} xl={6} item >

                                        <Typography variant="h6">Kurzbeschreibung<br/></Typography>

                                            {this.props.dsc}

                                    </Grid>
                                    <br/>
                                    <Grid container justify="flex-start" xl={6} xs={6}>
                                        <Grid item xs={2} xl={2}>
                                            <Typography variant="subtitle2">Ects: {this.props.ects}</Typography>
                                        </Grid>
                                        <Grid item xs={2} xl={2}>
                                            <Typography variant="subtitle2">SWS: {this.props.sws}</Typography>
                                        </Grid>
                                        <Grid container justify="flex-end" xl={2} xs={2}>
                                            <Grid item xs={2} xl={2}>
                                                <Typography variant="subtitle2">Professor*in:&nbsp;{this.props.prof}</Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <br/>
                                    

                                    <Divider />
                                </Collapse>
                        
                    </Grid>

                </Grid> 

                
                
            </Grid>
            

           
            
            
            
        )
    }



}


export default (TableEntry);
