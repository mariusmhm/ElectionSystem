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
    
        // Init the state
        this.state = { 
            show:false,
            role:'',
            firstname:'',
            name:'',
            mail:'',
            googleID: null,
            matrikelnumber: null,
            study:'',
            redirect: false,
            error: null
        };
        
        if (firebase.auth().currentUser != null) {
            //this.state.name = firebase.auth().currentUser.displayName;
            this.state.mail = firebase.auth().currentUser.email;
            this.state.googleID = firebase.auth().currentUser.uid;
            console.log(this.state.mail);
            console.log(this.state.googleID);
              
        }

        

    }


    getUserbyGoogleId = () => {
        ElectionSystemAPI.getAPI().getUserForGoogleID(this.state.googleID).then(user => {
            if(user.getGoogleID() != null){
                this.setState({
                    redirect: true,
                })
            }
        }).catch(e =>
                this.setState({
                    error: e,
                }))
    }

    getStudentbyGoogleId = () => {
        ElectionSystemAPI.getAPI().getStudentForGoogleID(this.state.googleID).then(student => {
            if(student.getGoogleID() != null){
                this.setState({
                    redirect: true,
                })
            }
        }).catch(e =>
                this.setState({
                    error: e,
                }))
    }

    componentDidMount(){
        this.getStudentbyGoogleId();
        this.getUserbyGoogleId()
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
    }

    addUser = () => {
        if(this.state.role==='student'){
            let newStudent = new StudentBO();
            newStudent.name = this.state.name; 
            newStudent.google_user_id = this.state.googleID;
            newStudent.firstname = this.state.firstname;
            newStudent.mail = this.state.mail;
            newStudent.role = this.state.role;
            newStudent.matrikel_nr = this.state.matrikelnumber;
            newStudent.study = this.state.study;
            
            ElectionSystemAPI.getAPI().addStudent(newStudent).then(student => {
                this.setState({
                    redirect: true
                });
            }).catch(e => 
                this.setState({
                    updatingError: e
                }))
        }else if(this.state.role==='user'){
            console.log('addUser');
            let newUser = new UserBO();
            newUser.firstname = this.state.firstname;
            newUser.name = this.state.name; 
            newUser.role = this.state.role; 
            newUser.mail = this.state.mail;
            newUser.google_user_id = this.state.googleID;
            ElectionSystemAPI.getAPI().addUser(newUser).then(user => {
                this.setState({
                    redirect: true
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
        
        if (this.state.redirect === true){
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
                    <TextField fullWidth variant="outlined" id="name" label="Lastname" onChange={this.handleTextFieldChange} value={this.state.lastname}/>
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
