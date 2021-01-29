import React, { Component } from 'react';
import Header from './components/layout/Header';
//import Grid from '@material-ui/core/Grid';
import firebase from 'firebase/app';
import 'firebase/auth';
import Signin from './components/layout/pages/Signin';
import LoadingProgress from './components/dialogs/LoadingProgress';
import firebaseConfig from './firebaseConfig';
import ContextErrorMessage from './components/dialogs/ContextErrorMessage';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Container} from '@material-ui/core';
import Registration from './components/layout/pages/Registration'
import theme from './theme';
import { ThemeProvider } from '@material-ui/core/styles';

//import { Button, Icon, Container, TextField, Typography, withStyles } from '@material-ui/core';
import CreateProject from './components/dialogs/CreateProject'
import ProjectContent from './components/layout/pages/ProjectContent'
import Semester from './components/dialogs/Semester'
import HomeScreenStudent from './components/layout/HomeScreenStudent'


class App extends Component {

    //Constructor of the ElectionSystem app, which initializes firebase
    constructor(props) {
	super(props);
	//initializing a state
	this.state = {
		currentUser: null,
		appError: null,
		authError: null,
		authLoading: false
	};
   }

   //Create an error boundry for this app so we can recieve all errors from below the component tree.
   //Update state so the next render will show the fallback UI.
   static getDerivedStateFromError(error) {
	return { appError: error };
   }

   render() {
    const { currentUser, appError, authError, authLoading } = this.state;

        return (

            <div>
                <HomeScreenStudent/>
                    
		    </div>
		);
	}
}
export default App;