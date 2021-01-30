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
import AccountCircle from '@material-ui/icons/AccountCircle';
import logo from '../../hdmLogo.jpg'


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
    //this.props.history.push({
    //  pathname: '/admin/profile',
    //})
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
            <Button color="inherit" >
              New Projects
            </Button>
            <Button color="inherit" >
              Current Semester
            </Button>
            <Button color="inherit" >
              Archieved Projects
            </Button>
            <Button color="inherit" onClick={this.navigateProfile()} >
              Profile
            </Button>
            <Button color="inherit" >
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
              <MenuItem onClick={this.handleMobileClose}>New Projects</MenuItem>
              <MenuItem onClick={this.handleMobileClose}>Current Semester</MenuItem>
              <MenuItem onClick={this.handleMobileClose}>Archieved Projects</MenuItem>
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

export default withStyles(styles)(HeaderAdmin);
