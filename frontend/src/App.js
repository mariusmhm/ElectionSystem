import React, { Component } from 'react';
/**import Header from './components/layout/Header';**/
import Grid from '@material-ui/core/Grid';
/**import firebase from 'firebase/app';**/
/**import 'firebase/auth';**/
/**import SignIn from './components/pages/Signin';**/
/**import LoadingProgress from './components/dialogs/LoadingProgress';**/
/**import firebaseConfig from './firebaseconfig';**/
/**import ContextErrorMessage from './components/dialogs/ContextErrorMessage';**/
/**import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';**/

import { Button, Icon, Container, TextField, Typography, withStyles } from '@material-ui/core';
import theme from './theme';
import CreateProject from './components/dialogs/CreateProject'
//import ProjectContent from './components/layout/pages/ProjectContent'
import { ThemeProvider } from '@material-ui/core/styles';
import Semester from './components/dialogs/Semester'
import EntryListAdmin from'./components/layout/pages/EntryListAdmin';


class App extends Component {


handleSignInButtonClicked = () => {
this.props.onSignIn();
}
    constructor (props){
        super(props);
        this.state={
        group:"Gruppe 5"


        }
    }

    render() {
        return (
            <ThemeProvider theme={theme}>
                <div>
                    <EntryListAdmin /> {/* INSERT HERE WHAT YOU WANT TO TEST */}
                </div>
            </ThemeProvider>
        )
  }

}



/**PropTypes
SignIn.propTypes = {
	classes: PropTypes.object.isRequired,
	onSignIn: PropTypes.func.isRequired,}**/

export default App;


