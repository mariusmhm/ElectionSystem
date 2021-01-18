import React, { Component } from 'react';
import { Avatar,
  Button,
  withStyles,
  AppBar,
  Toolbar,
  Typography,
  useMediaQuery,
  IconButton,
  Menu,
  MenuItem} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import logo from '../../hdmLogo.jpg'

 

class Header extends Component {
  constructor(props){
    super(props)
    this.state={
      mobile: false,
      auth: true,
      anchorEl: null,
    }
    
}

handleChange = (event) => {
  this.setState({
    anchorEl: event.target.checked,
  })
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
            { this.state.mobile ?
            <div>
            <Button color="inherit" >
              My Election
            </Button>
            <Button color="inherit" >
              Projects Overview
            </Button>
            <Button color="inherit" >
              log out
            </Button>
            </div>
            : <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={this.handleMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={this.state.anchorEl}
              keepMounted
              open={Boolean(this.state.anchorEl)}
              onClose={this.handleClose}
            >
              <MenuItem onClick={this.handleClose}>My Election</MenuItem>
              <MenuItem onClick={this.handleClose}>Projects Overview</MenuItem>
            </Menu>
          </div> }
            
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

export default withStyles(styles)(Header);
