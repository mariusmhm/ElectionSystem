import React, { Component } from 'react';
import { Avatar, Button, Paper, Tab, Tabs} from '@material-ui/core';
import firebase from 'firebase/app';



class Header extends Component {


  /**
	 * Handles the click event of the sign in button and uses the firebase.auth() component to sign in.
	 *
	 * @see See Google [firebase.auth](https://firebase.google.com/docs/reference/js/firebase.auth.Auth)
	 * @see See Google [firebase.auth().signOut](https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signout)
	 */
handleSignOutButtonClicked = () => {
    firebase.auth().signOut();
  }

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
            <Tab label="Archivierte Projekte" />
            </Tab>
            <Button 
                variant="contained"
                color="default"
                label="logout"
                onClick={this.handleSignOutButtonClicked}
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
