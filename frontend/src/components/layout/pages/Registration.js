import React, {Component} from 'react';
import {withStyles} from '@material-ui/core';
<<<<<<< HEAD
=======
import { Redirect } from 'react-router'
>>>>>>> d9d9f00f6b1cb5a5f80e5d479cbcac9a3ea3e960
import firebase from 'firebase/app';
import { Button, 
        Grid, 
        TextField, 
        Typography, 
        FormControl,
        FormControlLabel,
        RadioGroup,
        Radio } from '@material-ui/core';
<<<<<<< HEAD
import {ElectionSystemAPI, StudentBO, UserBO} from '../../api';
=======
import {ElectionSystemAPI, StudentBO, UserBO} from '../../../api';
>>>>>>> d9d9f00f6b1cb5a5f80e5d479cbcac9a3ea3e960


    
class Registration extends Component {
    constructor(props) {
        super(props);
    
        // Init the state
        this.state = { 
            show:false,
            role:'',
            firstname:'',
            name:'',
            mail:'',
            googleID: null,
            matrikelnumber: null,
<<<<<<< HEAD
            study:''
        };
        
        if (firebase.auth().currentUser != null) {
            this.state.name = firebase.auth().currentUser.displayName;
=======
            study:'',
            redirect: false,
            cuser: {},
            cstudent: {},
        };
        
        if (firebase.auth().currentUser != null) {
            //this.state.name = firebase.auth().currentUser.displayName;
>>>>>>> d9d9f00f6b1cb5a5f80e5d479cbcac9a3ea3e960
            this.state.mail = firebase.auth().currentUser.email;
            this.state.googleID = firebase.auth().currentUser.uid;
            console.log(this.state.mail);
            console.log(this.state.googleID);
<<<<<<< HEAD
            console.log(this.state.name);
              
        }
=======
              
        }


    }

    getUserbyMail = () => {
        ElectionSystemAPI.getAPI().getUserForMail(this.state.mail)
        .then(user =>
            this.setState({
                cuser: user
            })).catch(e =>
                this.setState({
                    cuser:{},
                }))
    }

    getStudentbyMail = () => {
        ElectionSystemAPI.getAPI().getStudentForMail(this.state.mail)
        .then(student =>
            this.setState({
                cstudent:student
            })).catch(e =>
                this.setState({
                    cstudent:{},
                }))
    }
>>>>>>> d9d9f00f6b1cb5a5f80e5d479cbcac9a3ea3e960

    componentDidMount(){
        this.getStudentbyMail();
        this.getUserbyMail()
    }

    handleRadioChange = e => {
        const  value = e.target.value;
        console.log(value);
        this.setState({
            role: value,
          });

        if(value==='student'){
            this.setState({
                show: true
              });
    
        }else{
            this.setState({
                show: false
              });
        }
    };

    addUser = () => {
        if(this.state.role==='student'){
<<<<<<< HEAD
            console.log('addStudent');
            let newStudent = new StudentBO(
                this.state.firstname, 
                this.state.name, 
                this.state.role, 
                this.state.mail,
                this.state.googleID,
                this.state.matrikelnumber,
                this.state.study
            );
            ElectionSystemAPI.getAPI().addStudent(newStudent).catch(e => console.log(e));
        }else{
            console.log('addaddUser');
            let newUser = new UserBO(
                this.state.firstname, 
                this.state.name, 
                this.state.role, 
                this.state.mail,
                this.state.googleID,
            );
            ElectionSystemAPI.getAPI().addUser(newUser).catch(e => console.log(e));
=======
            let newStudent = new StudentBO();
            newStudent.name = this.state.name; 
            newStudent.google_user_id = this.state.googleID;
            newStudent.firstname = this.state.firstname;
            newStudent.mail = this.state.mail;
            newStudent.role = this.state.role;
            newStudent.matrikel_nr = this.state.matrikelnumber;
            newStudent.study = this.state.study;
            
            ElectionSystemAPI.getAPI().addStudent(newStudent).catch(student => {
                //this.setState(this.baseState);
                this.setState({
                    redirect: true
                })
            }).catch(e => 
                this.setState({
                    updatingError: e
                }))
        }else{
            console.log('addUser');
            let newUser = new UserBO();
            newUser.firstname = this.state.firstname;
            newUser.name = this.state.name; 
            newUser.role = this.state.role; 
            newUser.mail = this.state.mail;
            newUser.google_user_id = this.state.googleID;
            ElectionSystemAPI.getAPI().addUser(newUser).catch(user => {
               //this.setState(this.baseState);
                this.setState({
                    redirect: true
                })
            }).catch(e => 
                this.setState({
                    updatingError: e
                }))
>>>>>>> d9d9f00f6b1cb5a5f80e5d479cbcac9a3ea3e960
        }
    };

    handleTextFieldChange = e =>{
<<<<<<< HEAD
        const value = e.target.value;
        console.log(value);
=======
>>>>>>> d9d9f00f6b1cb5a5f80e5d479cbcac9a3ea3e960
        this.setState({
            [e.target.id]: e.target.value
        })
    }
        

    render(){
        const { classes } = this.props; 
        if(this.state.cuser != null){
            this.setState({
                redirect: true
            })
        }else if(this.state.cstudent != null){
            this.setState({
                redirect: true
            })
        }
        
        if (this.state.redirect){
            return <Redirect to='/project-content'/>;
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
<<<<<<< HEAD
                    <TextField fullWidth variant="outlined" id="lastname" label="Lastname" onChange={this.handleTextFieldChange} value={this.state.lastname}/>
=======
                    <TextField fullWidth variant="outlined" id="name" label="Lastname" onChange={this.handleTextFieldChange} value={this.state.lastname}/>
>>>>>>> d9d9f00f6b1cb5a5f80e5d479cbcac9a3ea3e960
                </Grid>
                 <Grid item>
                    <TextField fullWidth variant="outlined" id="mail" label="E-Mail" disabled onChange={this.handleTextFieldChange} value={this.state.mail}/>
                </Grid>
                <Grid item>
                    <FormControl>
                        <RadioGroup row={true} onChange={this.handleRadioChange} value={this.state.value}>
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
<<<<<<< HEAD
                    <Button variant="contained" color="primary">Register</Button>
=======
                    <Button variant="contained" color="primary"  onClick={this.addUser}>Register</Button>
>>>>>>> d9d9f00f6b1cb5a5f80e5d479cbcac9a3ea3e960
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
