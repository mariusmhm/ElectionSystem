import React, { Component } from 'react';
import { Avatar, Button, Paper, Tab, Tabs} from '@material-ui/core';


class Header extends Component {

  render() {
    return (

      <div className="Header">
        <Paper>
          <Tabs
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Avatar variant="square" alt="logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/HdM_Logo.svg/2000px-HdM_Logo.svg.png" />
            <Tab label="Neue Projekte" />
            <Tab label="Dieses Semester">
            <Tab label="Archivierte Projekte">
            </Tab>
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

export default Header;
