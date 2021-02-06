import React, { Component } from 'react';
import { Avatar,
  Button,
  withStyles,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem, 
  Box} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import logo from '../../hdmLogo.jpg';
import firebase from 'firebase/app';


class HeaderProf extends Component {
  constructor(props){
    super(props)
    this.state={
      auth: true,
      anchorEl: null,
      mobileAnchorEl: null,
    }
    
  }


  handleMenu = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
    })
  }

  handleClose = () => {
    this.setState({
      anchorEl: null
    })
  }

  handleMobileMenu = (event) => {
    this.setState({
      mobileAnchorEl: event.currentTarget,
    })
  }

  handleMobileClose = () => {
    this.setState({
      mobileAnchorEl: null
    })
  }

  handleSignOutButtonClicked = () => {
    firebase.auth().signOut();
  }

  onClickAbout = () => {
      this.props.history.push({
            pathname:'/professor/about',
            state: {
              cUserID: this.props.history.location.state.cUserID
            }
        })
  }

  navigateHome = () => {
    this.props.history.push({
      pathname:'/professor',
      state: {
        cUserID: this.props.history.location.state.cUserID
      }
    }, window.location.reload())
  }


  render() {
    const { classes } = this.props;
    
    return (

      <div >
        <AppBar position="fixed">
          <Toolbar>
            <Avatar variant="square" src={logo} className={classes.logo}/>
            <Typography className={classes.header}>
            ELECTION SYSTEM
            </Typography>
            <Box display={{xs:"none", sm:"none", md:"block"}}>
            <Button color="inherit" onClick={this.navigateHome}>
              Home
            </Button>
            <Button color="inherit" onClick={this.onClickAbout}>
              About
            </Button>
            <Button color="inherit" onClick={this.handleSignOutButtonClicked}>
              Log out
            </Button>
            </Box> 
            <Box display={{xs:"block", sm:"block", md:"none"}}>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={this.handleMobileMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={this.state.anchorEl}
              keepMounted
              open={Boolean(this.state.anchorEl)}
              onClose={this.handleMobileClose}
            >
              <MenuItem onClick={this.handleMobileClose}>My Projects</MenuItem>
              <MenuItem onClick={this.handleMobileClose}>Projects Overview</MenuItem>
              <MenuItem onClick={this.handleMobileClose}>Logout</MenuItem>
            </Menu>
            </Box>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const styles = theme => ({
  root:{
      flexGrow: 1,
  },
  logo:{
    marginRight: theme.spacing(2)
  },
  header:{
    flexGrow: 1,
  }
});

export default withStyles(styles)(HeaderProf);
