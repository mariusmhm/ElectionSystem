import React, { Component } from 'react';
import {Container, MenuItem, Menu, IconButton, Box} from '@material-ui/core';
import {withStyles} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import RejectedProjectsAdmin from './RejectedProjectsAdmin';
import GradingEditingDialog from '../../dialogs/GradingEditingDialog';
import CreateKeycompetence from '../../dialogs/CreateKeycompetence';
import EditProjecttype from '../../dialogs/EditProjecttype';
import Semester from '../../dialogs/Semester';
import ModuleForm from '../../dialogs/ModuleForm';
import AddIcon from '@material-ui/icons/Add';
import CreateProject from '../../dialogs/CreateProject';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MoreVertIcon from '@material-ui/icons/MoreVert';


class AdminButtonBar extends Component {
    constructor(props) {
        super(props);

        // Init the state
        this.state = {
            open: false,
            openg: false,
            openm:false,
            openp:false,
            openk:false,
            openpr:false,
            googleID: null,
            redirect: false,
            error: null,
            openDialog: false
        };
    }

    // close the dialog
    closeDialog = () => {
        this.setState({
            open: false})
    }
    // opens the dialog
    openDialog() {
        this.setState({ open: true });
    }
    // close the grading
    closeGrading= ()  =>{
        this.setState({
            openg:false })
    }
    // opens the grading
    openGrading() {
        this.setState({ openg: true });
    }
    // close the module
    closeModule =()  =>{
        this.setState({
            openm:false })
    }
    // opens the module
    openModule() {
        this.setState({ openm: true });
    }
    // close the projettype
    closeProjecttype =()  =>{
        this.setState({
            openp:false })
    }
    // opens the projecttype
    openProjecttype() {
        this.setState({ openp: true });
    }
    // opens project
    openProject(){
        this.setState({
            openpr: true });

    }
    // close project
    closeProject = () => {
        this.setState({openpr:false})

    }
    // open Key competence dialog
    openKeyCom(){
        this.setState({
            openk: true });

    }
    // close Key competence dialog
    closeKeyCom = () => {
        this.setState({openk:false})

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

    // renders the component
  render() {
    const {classes}= this.props;


        return (

              <Container maxWidth="md" align ="center">
              < GradingEditingDialog
                    AdminButtonBar ={AdminButtonBar}
                    openg={this.state.openg}
                    openGrading={this.openGrading}
                    closeGrading={this.closeGrading}
              />
              < ModuleForm
                    AdminButtonBar ={AdminButtonBar}
                    openm={this.state.openm}
                    openModule={this.openModule}
                    closeModule={this.closeModule}
              />
              < EditProjecttype
                    AdminButtonBar ={AdminButtonBar}
                    openp={this.state.openp}
                    openProjecttype={this.openProjecttype}
                    closeProjecttype={this.closeProjecttype}
              />
              <CreateKeycompetence
                    AdminButtonBar ={AdminButtonBar}
                    openk={this.state.openk}
                    openKeyCom={this.openKeyCom}
                    closeKeyCom={this.closeKeyCom}
              />
              < CreateProject
                    AdminButtonBar ={AdminButtonBar}
                    openpr={this.state.openpr}
                    openProject={this.openProject}
                    closeProject={this.closeProject}
              />
                    <AppBar  position="fixed" color="white" className={classes.appBar}>
                        <Toolbar>
                            <Box display={{xs:"none", sm:"none", md:"block"}} className={classes.buttonBox}>
                            <Fab className={classes.fabButton} color="secondary" variant="extended" aria-lable="edit" onClick={() => this.openProjecttype()}>
                                <EditIcon />  projecttypes
                            </Fab>
                            <Fab  className={classes.fabButton} color="secondary" variant="extended" aria-lable="edit" onClick={() => this.openModule()}>
                                <EditIcon />  modules
                            </Fab>
                            <Fab  className={classes.fabButton}color="secondary" variant="extended" aria-lable="edit" onClick={() => this.openGrading()}>
                                <EditIcon />  grading
                            </Fab>
                            <Fab  className={classes.fabButton} color="secondary" variant="extended" aria-lable="edit" onClick={() => this.openKeyCom()}>
                                <EditIcon />  key competences
                            </Fab>
                            <Fab  className={classes.fabButton} color="secondary" variant="extended" aria-lable="edit" onClick={() => this.openDialog()}>
                                <EditIcon />  semester period
                                
                            </Fab>
                            <Fab  className={classes.fabButton} color="secondary" variant="extended" aria-lable="add" onClick={() => this.openProject()}>
                                <AddIcon /> new project
                            </Fab>
                            </Box>
                            <Box display={{xs:"block", sm:"block", md:"none"}}> 
                                <Button
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={this.handleMobileMenu}
                                    color="secondary"
                                >
                                    <MoreVertIcon />
                                </Button>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={this.state.mobileAnchorEl}
                                    keepMounted
                                    open={Boolean(this.state.mobileAnchorEl)}
                                    onClose={this.handleMobileClose}
                                >
                                    <MenuItem onClick={() => this.openProjecttype()}>Edit project types</MenuItem>
                                    <MenuItem onClick={() => this.openModule()}>Edit modules</MenuItem>
                                    <MenuItem onClick={() => this.openGrading()}>Edit Grades</MenuItem>
                                    <MenuItem onClick={() => this.openKeyCom()}>Add key competence</MenuItem>
                                    <MenuItem onClick={() => this.openDialog()}>Edit semester</MenuItem>
                                    <MenuItem onClick={() => this.openProject()}>Add project</MenuItem>
                                </Menu>
                            </Box>
                        </Toolbar>
                    </AppBar>



				  </Container>
		);
	}
}
// component specific styles
const styles = theme => ({
    appBar: {
      align:'center',
    },
    fabButton: {
      margin: theme.spacing(2),
      top: 0
    },
    buttonBox:{
        align:'center',
        marginLeft: theme.spacing(15)
    }
});


export default withStyles(styles) (AdminButtonBar);
