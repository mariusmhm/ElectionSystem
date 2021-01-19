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
import logo from '../../hdmLogo.jpg'


class HeaderAdmin extends Component {
  constructor(props){
    super(props)
    this.state={
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
            <Button color="inherit" >
              Log out
            </Button>
            </Box> 
            <Box display={{xs:"block", sm:"block", md:"none"}}>
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
              <MenuItem onClick={this.handleClose}>New Projects</MenuItem>
              <MenuItem onClick={this.handleClose}>Current Semester</MenuItem>
              <MenuItem onClick={this.handleClose}>Archieved Projects</MenuItem>
              <MenuItem onClick={this.handleClose}>Logout</MenuItem>
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
