import React, { Component } from 'react';
import { Avatar, Button, Paper, Tab, Tabs, Icon, Grid, Container, TextField, Typography, withStyles } from '@material-ui/core';


class App extends Component {

  render() {
    return (

      <div className="App">
        <Paper>
          <Tabs
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Avatar variant="square" alt="logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/HdM_Logo.svg/2000px-HdM_Logo.svg.png" />
            <Tab label="My Election" />
            <Tab label="Project Overview">
            </Tab>
            <Button 
                variant="contained"
                color="default"
                href="https://github.com/muenstermannmarius/ElectionSystem"
                label="logout"
              >
                log out
            </Button>
        
          </Tabs>
        </Paper>
      </div>
    );
  }
}

export default App;
