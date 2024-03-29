import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Registration from './components/layout/pages/Registration';
import {ElectionSystemAPI} from './api';
import firebase from 'firebase/app';
import { LinearProgress } from '@material-ui/core';


class Main extends Component {

    //Constructor of the ElectionSystem app, which initializes firebase
    constructor(props) {
	super(props);
	//initializing a state
	this.state = {
		cUser: null,
		appError: null,
		authError: null,
        authLoading: true,
        exists: false,
        error: null,
        mail:'',
        googleID: null,
    };
    if (firebase.auth().currentUser != null) {
        //this.state.name = firebase.auth().currentUser.displayName;
        this.state.mail = firebase.auth().currentUser.email;
        this.state.googleID = firebase.auth().currentUser.uid;
          
    }

   }

   getUserbyGoogleId = () => {
    ElectionSystemAPI.getAPI().getUserForGoogleID(this.state.googleID).then(user => {
        console.log(user)
        if(user.getGoogleID() != null){
            this.setState({
                exists: true,
                cUser: user,
                uRole: user.getRoleID()
            }, function(){
		        this.mainComponent();
		        console.log(this.state.uRole)
		    
	    }
            )
        }else(this.getStudentbyGoogleId())
    }).catch(e =>
            this.setState({
                error: e,
            }))
    }

    getStudentbyGoogleId = () => {
    ElectionSystemAPI.getAPI().getStudentForGoogleID(this.state.googleID).then(student => {
        console.log(student)
        if(student.getGoogleID() != null){
            this.setState({
                exists: true,
                cUser: student,
                uRole: student.getRoleID()
            }, function(){
                this.mainComponent();
                console.log(this.state.uRole)
            }  )
        }else(this.setState({authLoading:false}))
    }).catch(e =>
            this.setState({
                error: e,
            }))
    }

    componentDidMount(){
        this.getUserbyGoogleId()
    }

    mainComponent(){
        console.log('main')
        console.log(this.state.uRole)
        if(this.state.uRole === 1){
            this.props.history.push({
                pathname: '/admin',
                state:{
                    cUser: this.state.cUser
                }
            })

        }else if(this.state.uRole === 2){
            this.props.history.push({
                pathname: '/student',
                state:{
                    cUser: this.state.cUser,
                    cUserID: this.state.cUser.getID()
                }
            })

        }else if(this.state.uRole === 3){
            this.props.history.push({
                pathname: '/professor',
                state:{
                    cUser: this.state.cUser,
                    cUserID: this.state.cUser.getID()
                }
            })
        }else {
            
        }
        
    }

    render(){
        
        return(
            <div>
                {this.state.authLoading ? <LinearProgress color="secondary" />:
                <Router basename={process.env.PUBLIC_URL}>
                    
                    <>
					<Redirect to='/registration'/>
					<Route path='/registration'>
                        <Registration {...this.props}/>
                    </Route>
                    </>
                    
                </Router>
                }
                
            </div>

        )
    }

}
export default Main;
