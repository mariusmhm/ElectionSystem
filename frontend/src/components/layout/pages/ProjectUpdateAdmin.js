import React, {Component} from 'react';
import {Dialog,
    DialogTitle, 
    MenuItem, 
    Select, 
    InputLabel, 
    TextField, 
    RadioGroup, 
    FormControl, 
    FormControlLabel, 
    Radio, 
    Button,
    Grid,
    Box,
    Typography} from'@material-ui/core';
import {withStyles} from '@material-ui/core';
import DateFnsUtils from "@date-io/date-fns";
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import {ElectionSystemAPI, ProjectBO} from '../../../api';


class ProjectUpdateAdmin extends Component {


    constructor(props) {
      super(props);


      this.state = {
        allStates:[],
        project: this.props.history.location.state.project,
        projectname: this.props.history.location.state.project.name,
        modules: [],
        moduleSelected: null,
        edvNumber: this.props.history.location.state.project.edv_number,
        projecttypes: [],
        projecttype: {},
        ptSelected: null,
        numSpots: null,
        professors: [],
        additionalProf: null,
        weekly: false,
        specialRoom: false,
        desiredRoom: null,
        shortDescription: this.props.history.location.state.project.short_decription,
        language: this.props.history.location.state.project.language,
        externalPartner: this.props.history.location.state.project.external_partner,
        numBlockdaysPriorLecture: null,
        numBlockdaysDuringLecture: null,
        dateDuringLecture: null,
        numBlockdaysInExam: null,
        error: null,
        spots: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
            15 , 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
            28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40]
      }


      this.baseState = this.state;


    }

    getAllProjecttypes = () => {
        ElectionSystemAPI.getAPI().getAllProjecttypes()
        .then(projecttypesBOs =>
            this.setState({
                projecttypes: projecttypesBOs,
                error: null
            })).catch(e =>
                this.setState({
                    projecttypes:[],
                    error: e
                }))
    }

    getStates = () => {
        ElectionSystemAPI.getAPI().getAllStates()
        .then(states => 
            this.setState({
                allStates: states,
            })).catch(e =>
                this.setState({
                    allStates:[],
                    error: e
                }))
    } 

    getAllModules = () => {
        ElectionSystemAPI.getAPI().getAllModules()
        .then(moduleBOs =>{
            this.setState({
                modules: moduleBOs,
                error: null
            });
        }).catch(e =>
                this.setState({
                    modules:[],
                    error: e
                }))
    }

    componentDidMount(){
        this.getAllProjecttypes();
        this.getAllModules();
        this.getStates();
    }

    selectHandleChangeProjecttype = (e) =>{
        this.setState({
            projecttype: this.state.projecttypes[e.target.value],
            ptSelected: this.state.projecttypes[e.target.value].getID()
        });
        this.showETCS = true;
    }

    handleChange = (e) =>{
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleChangeNum = (e) =>{
        this.setState({
            [e.target.id]: parseInt(e.target.value, 10)
        });
    }

    handleSelectChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    roomHandleChange = (e) =>{
        if(e.target.value === "true"){
            this.setState({
                specialRoom: true
            })
        }else if(e.target.value){
            this.setState({
                specialRoom: false
            })
        }
    }

    handleDateChange = (date) =>{
        const nDate = new Date(date);
        const nD = nDate.getFullYear() + '-' + (nDate.getMonth() + 1) + '-' + nDate.getDate();
        this.setState({
            dateDuringLecture: nD
        })

    }

    handleClick = () =>{
        this.props.history.push({
            pathname: '/admin'
        })
 
    }

     render(){
        const { classes } = this.props; 
        
        
    
        return (
            <div className={classes.pageContent}>
                
                <Grid container spacing={2} justify="center" className={classes.grid}>
                    <Grid item xs={1} style={{ alignItems: 'center'}}>
                        <IconButton className={classes.arrowButton} onClick={()=>this.handleClick()}>
                            <ArrowBackIosIcon color="secondary"/> 
                        </IconButton>
                    </Grid>
                    <Grid item xs={11} md={11} style={{ alignItems: 'center'}}>
                        <Typography className={classes.header}>Edit Project: {this.state.projectname} </Typography>
                    </Grid>
                    <Grid item xs={11} md={6}>
                            <TextField id="projectname" fullWidth variant="outlined" label="Name:" onChange={this.handleChange} value={this.state.projectname}/>
                    </Grid>
                    <Grid item xs={9} md={4}>
                        <FormControl fullWidth required variant="outlined" className={classes.FormControl}>
                            <InputLabel>Revalue</InputLabel>
                            <Select name="newState" defaultValue="" label="revalue" onChange={this.handleSelectChange}>
                                {this.state.allStates.map((state) => (
                                        <MenuItem key={state.getID()} value={state.getID()}>{state.getName()}</MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                    </Grid>
                   
    
                <Grid container item direction="column" spacing={2} xs={12} md={4}>
                    
                    <Grid item>
                    <FormControl fullWidth variant="outlined" className={classes.FormControl}>
                            <InputLabel>Module</InputLabel>
                            <Select name="moduleSelected" defaultValue="moduleSelected" label="Module" onChange={this.handleSelectChange}>
                                {this.state.modules.map((module) => (
                                        <MenuItem key={module.getID()} value={module.getID()}>{module.getName()}</MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                    <TextField fullWidth variant="outlined" id="edvNumber" label="EDV-number:" onChange={this.handleChangeNum} value={this.state.edvNumber}/>
                    </Grid>
                    <Grid item>
                    <FormControl fullWidth variant="outlined" className={classes.FormControl}>
                                <InputLabel>Project type</InputLabel>
                                <Select label="Projecttype" defaultValue="" onChange={this.selectHandleChangeProjecttype}>
                                    {this.state.projecttypes.map((ptype, index) => (
                                        <MenuItem key={index} value={index}>{ptype.getName()}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                    </Grid>
                    <Grid container item justify="space-between">
                        <Grid item>
                            <Typography>ETCS: {this.showETCS ? this.state.projecttype.getEcts() : null}</Typography>
                        </Grid>
                        <Grid item>
                            <Typography>SWS: {this.showETCS ? this.state.projecttype.getSws() : null}</Typography>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <FormControl fullWidth variant="outlined" className={classes.FormControl}>
                        <InputLabel>Number of spots</InputLabel>
                            <Select name="numSpots" defaultValue="" label="Number of spots" onChange={this.handleSelectChange}>
                            {this.state.spots.map((number, index) => (
                                        <MenuItem key={index} value={number}>{number}</MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                    <FormControl fullWidth variant="outlined" className={classes.FormControl}>
                        <InputLabel>Additional professors</InputLabel>
                            <Select name="additionalProf" defaultValue="" label="Additional professors" onChange={this.handleSelectChange}>
                                {this.state.professors.map((prof) => (
                                        <MenuItem key={prof.getID()} value={prof.getID()}>{prof.getFirstname()} {prof.getName()}</MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl fullWidth variant="outlined" className={classes.FormControl}>
                            <InputLabel>Language</InputLabel>
                            <Select name="language" defaultValue="" label="language" onChange={this.handleSelectChange}>
                                <MenuItem value="german">german</MenuItem>
                                <MenuItem value="english">english</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <TextField fullWidth variant="outlined" label="External co-orperation partner:" id="externalPartner" onChange={this.handleChange} value={this.state.externalPartner}/>
                    </Grid>
                    <Grid item>
                        <Typography>Particular room necessary:</Typography>
                        <FormControl>
                                <RadioGroup row={true} id="specialRoom" onChange={this.roomHandleChange} value={String(this.state.specialRoom)}>
                                <FormControlLabel value="true" control={<Radio />} label="yes" />
                                <FormControlLabel value="false" control={<Radio />} label="no" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    { this.state.specialRoom ?
                    <Grid item>
                        <TextField fullWidth variant="outlined" multiline rows={2} id="desiredRoom" label="Desired room:" onChange={this.handleChange} value={this.state.desiredRoom || ''}/>
                    </Grid>
                    : null}
                </Grid>
                <Grid container item direction="column" spacing={2} xs={12} md={6}>
                    <Grid item>
                        <TextField fullWidth variant="outlined" multiline rows={12} label="Short description:" id="shortDescription" onChange={this.handleChange} value={this.state.shortDescription}/>
                    </Grid>
                    <Grid item>
                        <Typography>Weekly lecture:</Typography>
                        <FormControl>
                                <RadioGroup row={true} id="weekly" name="weekly" onChange={this.handleSelectChange} value={String(this.state.weekly)}>
                                <FormControlLabel value="true" control={<Radio />} label="yes" />
                                <FormControlLabel value="false" control={<Radio />} label="no" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <Typography>Blockdays prior to semester:</Typography>
                        <FormControl fullWidth variant="outlined" className={classes.FormControl}>
                        <InputLabel>Number of blockdays</InputLabel>
                            <Select name="numBlockdaysPriorLecture" defaultValue="" label="Number of blockdays" onChange={this.handleSelectChange}>
                                <MenuItem value={null}>none</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <Typography>Blockdays during the semester:</Typography>
                        <FormControl fullWidth variant="outlined" className={classes.FormControl}>
                        <InputLabel>Number of blockdays</InputLabel>
                            <Select name="numBlockdaysDuringLecture" defaultValue="" label="Number of blockdays" onChange={this.handleSelectChange}>
                                <MenuItem value={null}>none</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                    <Typography>Blockday during semester preferred start date:</Typography>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            inputVariant="outlined"
                            label="Select date"
                            format="dd/MM/yyyy"
                            margin="normal"
                            id="dateDuringLecture"
                            value={this.state.dateDuringLecture}
                            onChange={this.handleDateChange}
                        />
                    </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item>
                        <Typography color="secondary">Only for Interdisciplinary/ Transdisciplinary Projects:</Typography>
                        <Typography>Blockdays during exam week:</Typography>
                        <FormControl fullWidth variant="outlined" className={classes.FormControl}>
                        <InputLabel>Number of blockdays</InputLabel>
                            <Select name="numBlockdaysInExam" defaultValue="" label="Number of blockdays" onChange={this.handleSelectChange}>
                                <MenuItem value={null}>none</MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    
                    <Grid item>
                        <Button variant="contained" color="primary" >Submit</Button>
                    </Grid>
                   
                    
                    
                </Grid>
                
                </Grid>
            </div>
    
    
    
        ) 
     }
    }
    
    const styles = theme => ({
        grid:{
            width: '100%',
            marginTop: theme.spacing(10),
            margin: theme.spacing(3),
            paddingLeft: theme.spacing(2)
            
        },
        pageContent:{
            margin: theme.spacing(1)
        },
        header: {
            fontSize: '1.5rem',
            paddingTop: theme.spacing(1),
            paddingLeft: theme.spacing(1),
            fontWeight: 'bold'
        },
        state:{
            paddingTop: theme.spacing(2),
            paddingLeft: theme.spacing(2)
        },
        button:{
            marginTop: theme.spacing(1),
            marginLeft: theme.spacing(2)
        }
    });
    
    export default withStyles(styles)(ProjectUpdateAdmin);
    
    