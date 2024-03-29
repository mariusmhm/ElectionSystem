import React, { Component } from 'react';
import {Button, Collapse, FormControl,  MenuItem, Select, Typography, Grid, Divider } from "@material-ui/core";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { ElectionSystemAPI, ParticipationBO } from '../../api';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import {withStyles} from '@material-ui/core';


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
            participationID: null,
            activeIndex: null,
            select: true,
            lastname: '',
            firstname: '',
            priority: 0,
            cUserID: null,
            buttoncounter:0

        };

        this.baseState = this.state;
        this.toggleClass = this.toggleClass.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        
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


    handleSelect(){
        
        this.setState({select: !this.state.select})

    }

    handleChange(e) {
        this.setState({ priority: e.target.value });
      }

    addParticipation = () =>{
        let newParticipation = new ParticipationBO(this.state.creationDate,this.state.priority,null,this.props.cUserID, this.props.id);
        newParticipation.setDate(this.state.creationDate)
        newParticipation.setPriority(this.state.priority)
        newParticipation.setProjectID(this.props.id)
        newParticipation.setStudentID(this.props.cUserID)
        ElectionSystemAPI.getAPI().addParticipation(newParticipation)
        .catch(e =>
            this.setState({
                updatingError: e
            }))
    }

     

    reload(){
        window.location.reload();
    }


    handleClick(){
        
        
        if(this.state.select === true && this.state.buttoncounter === 0){
            return(
            this.addParticipation(),
            this.handleSelect(),
            this.setState({buttoncounter: 1})
            );
       }
    }



    askStatus(){
        if(this.props.participationID != null){
            return(
                this.setState({select: false})
            );
        }
    }

    

    componentDidMount() {
        this.getUser();
        this.askStatus();
    }



    render() {

        

        const { classes } = this.props;
        const {activeIndex} = this.state;

        

        return (
  
 
            <Grid container justify="flex-start" xs={12} md={12}>
                   
                   
                    <Grid container justify="flex-start" xs={12} md={12} spacing={3}>
                        
                        <Grid item xs={2} md={6}>
                                
                                    <Button
                                            variant="contained"
                                            color="none"
                                            onClick={this.toggleClass.bind(this, this.props.id)}
                                            style={{ backgroundColor: 'transparent', boxShadow: 'none' }}
                                            endIcon={this.state.activeIndex ? <ArrowDropUpIcon/> : <ArrowDropDownIcon />}
                                        >
                                            <Typography variant="h5">{this.props.name}</Typography>
                                    </Button>
                                
                        </Grid>
                        <Grid container xs={10} md={6} justify="flex-end" alignItems="center">
                            <Grid item xs={3} md={3}>
                                <FormControl>
                                
                                    <Select
                                        labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select-helper"
                                        defaultValue="0"
                                        onChange={this.handleChange}
                                        style={{display:  this.state.select ? 'block' : 'none'}}
                                    >
                                        <MenuItem value="5">Priority</MenuItem>
                                        <MenuItem value="1">1st priority</MenuItem>
                                        <MenuItem value="2">2nd priority </MenuItem>
                                        <MenuItem value="3">3rd priority </MenuItem>
                                        <MenuItem value="4">4th priority </MenuItem>
                                    </Select>
                                    
                                         
                                </FormControl>

                                <Typography variant="subtitle2" style={{display:  this.state.select ? 'none' : 'block'}}>
                                         Priority: {this.state.priority}</Typography>

                            </Grid>
                            <Grid item xs={3} md={3}>
                                
                                <Button
                                    
                                    variant="contained"
                                    color="secondary"
                                    
                                    endIcon= {this.state.select ? <PlaylistAddCheckIcon /> :  <DoneAllIcon/>}
                                    color={this.state.select ? "primary": "secondary"} 
                                
                                    onClick={() => {
                                            this.handleClick();
                                    }} >  
                                    {this.state.select ? "Select" : "Selected"}
                                </Button>
                               
                            </Grid>
                        </Grid>
                        
                    </Grid>

                <Divider />
                
                
                
                <Grid xs={12} container justify="flex-end" spacing={12} >

                    <Grid xs={12} md={11} container justify="flex-start"  alignItems="flex-end">
        
                                <Collapse in={activeIndex === this.props.id}>

                                    <Grid xs={12} md={6} item >

                                        <Typography variant="h6">Short Description<br/></Typography>

                                            {this.props.dsc}

                                    </Grid>
                                    <br/>
                                    <Grid container justify="flex-start" md={9} xs={9}>
                                        <Grid item xs={3} md={3}>
                                            <Typography variant="subtitle2">ECTS: {this.props.ects}</Typography>
                                        </Grid>
                                        <Grid item xs={3} md={3}>
                                            <Typography variant="subtitle2">SWS: {this.props.sws}</Typography>
                                        </Grid>
                                        <Grid container justify="flex-end" md={3} xs={3}>
                                            <Grid item xs={3} md={3}>
                                                <Typography variant="subtitle2">professor:&nbsp;{this.state.loaded ? this.state.lastname: null},&nbsp;{this.state.loaded ? this.state.firstname: null}</Typography>
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