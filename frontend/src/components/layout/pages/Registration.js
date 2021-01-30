import React, {Component} from 'react';
import {withStyles} from '@material-ui/core';
import { Redirect } from 'react-router'
import firebase from 'firebase/app';
import { Button, 
        Grid, 
        TextField, 
        Typography, 
        FormControl,
        FormControlLabel,
        RadioGroup,
        Radio } from '@material-ui/core';
import {ElectionSystemAPI, StudentBO, UserBO} from '../../../api';


    
class Registration extends Component {
    constructor(props) {
        super(props);

        let today = new Date(),
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    
        // Init the state
        this.state = { 
            creationDate: date,
            show:false,
            role: null,
            firstname:'',
            name:'',
            mail:'',
            googleID: null,
            matrikelnumber: null,
            study:'',
            registered: false,
            error: null,
            value: ''
        };
        
    }

    handleRadioChange = (e) => {

        if(e.target.value==="student"){
            this.setState({
                show: true,
                role: 2,
                value: e.target.value
              });
    
        }else if(e.target.value==="professor"){
            this.setState({
                show: false,
                role: 3,
                value: e.target.value
              });
        }else if(e.target.value==="admin"){
            this.setState({
                show: false,
                role: 1,
                value: e.target.value
            })
        }
    }

    addUser = () => {
        if(this.state.role===2){
            let newStudent = new StudentBO();
            newStudent.setDate(this.state.creationDate);
            newStudent.setName(this.state.name); 
            newStudent.setGoogleID(this.state.googleID);
            newStudent.setFirstname(this.state.firstname);
            newStudent.setMail(this.state.mail);
            newStudent.setRoleID(this.state.role);
            newStudent.setMatrikelNr(this.state.matrikelnumber);
            newStudent.setStudy(this.state.study);
            
            ElectionSystemAPI.getAPI().addStudent(newStudent).then(student => {
                this.setState({
                    registered: true
                });
            }).catch(e => 
                this.setState({
                    updatingError: e
                }))
        }else{
            let newUser = new UserBO();
            newUser.setDate(this.state.creationDate);
            newUser.setFirstname(this.state.firstname);
            newUser.setName(this.state.name); 
            newUser.setRoleID(this.state.role); 
            newUser.setMail(this.state.mail);
            newUser.setGoogleID(this.state.googleID);
            ElectionSystemAPI.getAPI().addUser(newUser).then(user => {
                this.setState({
                    registered: true
                })
            }).catch(e => 
                this.setState({
                    updatingError: e
                }))
        }
    };

    handleTextFieldChange = e =>{
        this.setState({
            [e.target.id]: e.target.value
        })
    }
        

    render(){
        const { classes } = this.props; 
        
        if (this.state.registered === true){
            this.props.history.push({
                pathname: '/',
                state:{
                    registered: this.state.registered
                }
            })
        }
        return (
            <Grid container spacing={2} direction="column" justify="center" alignItems="center" className={classes.grid} >
            
                <Grid item>
                    <Typography className={classes.headline}>REGISTRATION</Typography> 
                </Grid>
                <Grid item>
                    <TextField fullWidth variant="outlined" id="firstname" label="Firstname" onChange={this.handleTextFieldChange} value={this.state.firstname}/>
                </Grid>
                <Grid item>
                    <TextField fullWidth variant="outlined" id="name" label="Lastname" onChange={this.handleTextFieldChange} value={this.state.lastname}/>
                </Grid>
                 <Grid item>
                    <TextField fullWidth variant="outlined" id="mail" label="E-Mail" disabled onChange={this.handleTextFieldChange} value={this.state.mail}/>
                </Grid>
                <Grid item>
                    <FormControl>
                        <RadioGroup row={true} onChange={this.handleRadioChange} name="role" value={this.state.value}>
                            <FormControlLabel value="student"  control={<Radio color="primary"/>} label="Student" />
                            <FormControlLabel value="professor"  control={<Radio color="primary"/>} label="Professor" />
                            <FormControlLabel value="admin" control={<Radio color="primary"/>} label="Admin" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
            
                {
                    this.state.show?
                    <Grid container spacing={2} direction="column" justify="center" alignItems="center">
                    <Grid item >
                        <TextField fullWidth variant="outlined" id="matrikelnumber" label="Matrikelnumber" onChange={this.handleTextFieldChange} value={this.state.matrikelnumber}/>
                    </Grid>
                    <Grid item>
                        <TextField fullWidth variant="outlined" id="study" label="Course of studies" onChange={this.handleTextFieldChange} value={this.state.study}/>
                    </Grid>
                    </Grid>
                    :null

                }
                
                <Grid container direction="row" justify="center" alignItems="center" spacing={2} className={classes.button}> 
                    <Grid item>
                        <Button variant="outlined" color="primary" >Cancel</Button>
                    </Grid>
                    <Grid item>
                    <Button variant="contained" color="primary"  onClick={this.addUser}>Register</Button>
                    </Grid>
                </Grid>


            </Grid>
          

                
            
        )
    }    

}

const styles = theme => ({
    grid:{
        width: '100%',
        display: 'flex',
        marginTop: theme.spacing(6)    
    },
    headline:{
        color: theme.palette.darkGray,
        fontFamily: 'Arial',
        fontStyle: 'bold',
        fontSize: 25

    },
    button:{
        marginTop: theme.spacing(2)
    }
});

export default withStyles(styles)(Registration);
