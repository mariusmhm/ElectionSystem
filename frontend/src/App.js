import React, { Component } from 'react';
import Header from './components/layout/Header';
import Grid from '@material-ui/core/Grid';
import { Button, Icon, Container, TextField, Typography, withStyles } from '@material-ui/core';
import theme from './theme';
import CreateProject from './components/dialogs/CreateProject'
import ProjectContent from './components/layout/pages/ProjectContent'
import { ThemeProvider } from '@material-ui/core/styles';

//This is for testing approaches

class App extends Component {
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
                    <Header /> {/* INSERT HERE WHAT YOU WANT TO TEST */}
                </div>
            </ThemeProvider>
        )
  }
}

export default App;


