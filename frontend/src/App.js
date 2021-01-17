import React, { Component } from 'react';
//import Header from './components/layout/Header';
//import Grid from '@material-ui/core/Grid';
//import firebase from 'firebase/app';
//import 'firebase/auth';
//import LoadingProgress from './components/dialogs/LoadingProgress';
//import firebaseConfig from './firebaseConfig';
//import ContextErrorMessage from './components/dialogs/ContextErrorMessage';
//import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Container} from '@material-ui/core';
import theme from './theme';
import { ThemeProvider } from '@material-ui/core/styles';
//import { Button, Icon, Container, TextField, Typography, withStyles } from '@material-ui/core';
//import CreateProject from './components/dialogs/CreateProject';
//import ProjectContent from './components/layout/pages/ProjectContent';
//import Semester from './components/dialogs/Semester';
//import HomeScreen from './components/layout/HomeScreen';

//import EntryListAdmin from './components/layout/pages/EntryListAdmin';
//import GradingEditingDialog from './components/dialogs/GradingEditingDialog';
//import CreateProject from'./components/dialogs/CreateProject';
//import GradingEditingDialog from'./components/dialogs/GradingEditingDialog';
//import ModuleForm from'./components/dialogs/ModuleForm';
//import EntryListAdmin from './components/layout/pages/EntryListAdmin';
//import HomeScreenCompOne from './components/layout/pages/HomeScreenCompOne';
//import HomeAfterBegin from './components/layout/pages/AfterSemesterBegin/HomeAfterBegin';
//import EditProjecttype from'./components/dialogs/EditProjecttype';
//import CreateKeycompetence from'./components/dialogs/CreateKeycompetence';
//import EditProjecttype from'./components/dialogs/EditProjecttype';
import HomeScreenAdmin from './components/layout/HomeScreenAdmin';

class App extends Component {


  render() {


        return (

            <div>
                <HomeScreenAdmin/>
          </div>
      );
   }
}
export default App;