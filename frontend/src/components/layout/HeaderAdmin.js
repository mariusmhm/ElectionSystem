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

class HeaderAdmin extends Component {
  constructor(props){
    super(props)
    this.state={
      auth: true,
      anchorEl: null,
      mobileAnchorEl: null,
    }
    
  }

  navigateProfile = () => {
    this.props.history.push({
      pathname: '/admin/profile',
      state: {
        cUser: this.props.history.location.state.cUser
      }
    })
  }

  navigateHome = () => {
    this.props.history.push({
      pathname: '/admin',
      state: {
        cUser: this.props.history.location.state.cUser
      }
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
            pathname:"/admin/about",
            state: {
              cUser: this.props.history.location.state.cUser
            }
        })
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
            <Button color="inherit" onClick={this.navigateProfile} >
              Profile
            </Button>
            <Button color="inherit" onClick={this.onClickAbout}>
              About
            </Button>
            <Button color="inherit" onClick={this.handleSignOutButtonClicked}>
              Logout
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
              anchorEl={this.state.mobileAnchorEl}
              keepMounted
              open={Boolean(this.state.mobileAnchorEl)}
              onClose={this.handleMobileClose}
            >
              <MenuItem onClick={() => {this.navigateHome(); this.handleMobileClose()}}>Home</MenuItem>
              <MenuItem onClick={() => {this.navigateProfile(); this.handleMobileClose()}}>Profile</MenuItem>
              <MenuItem onClick={() => {this.onClickAbout(); this.handleMobileClose()}}>About</MenuItem>
              <MenuItem onClick={() => {this.handleSignOutButtonClicked(); this.handleMobileClose()}}>Logout</MenuItem>
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

export default withStyles(styles)(HeaderAdmin);
