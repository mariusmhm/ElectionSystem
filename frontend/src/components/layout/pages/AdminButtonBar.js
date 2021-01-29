import React, { Component } from 'react';
import {Container} from '@material-ui/core';
import {withStyles} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import RejectedProjectsAdmin from './RejectedProjectsAdmin';
import GradingEditingDialog from '../../dialogs/GradingEditingDialog';
import EditProjecttype from '../../dialogs/EditProjecttype';
import Semester from '../../dialogs/Semester';
import ModuleForm from '../../dialogs/ModuleForm';
import AddIcon from '@material-ui/icons/Add';
import CreateProject from '../../dialogs/CreateProject';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';


class AdminButtonBar extends Component {
    constructor(props) {
        super(props);

        // Init the state
        this.state = {
            open: false,
            openg: false,
            openm:false,
            openp:false,
            openpr:false,
            googleID: null,
            redirect: false,
            error: null,
            openDialog: false
        };
    }


    closeDialog = () => {
        this.setState({
            open: false})
    }

    openDialog() {
        this.setState({ open: true });
    }

    closeGrading= ()  =>{
        this.setState({
            openg:false })
    }

    openGrading() {
        this.setState({ openg: true });
    }

    closeModule =()  =>{
        this.setState({
            openm:false })
    }

    openModule() {
        this.setState({ openm: true });
    }

    closeProjecttype =()  =>{
        this.setState({
            openp:false })
    }

    openProjecttype() {
        this.setState({ openp: true });
    }

    openProject(){
        this.setState({
            openpr: true });

    }

    closeProject = () => {
        this.setState({openpr:false})

    }


  render() {
    const {classes}= this.props;


        return (

              <Container maxWidth="MD" align ="center">


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

              < CreateProject
                    AdminButtonBar ={AdminButtonBar}
                    openpr={this.state.openpr}
                    openProject={this.openProject}
                    closeProject={this.closeProject}
              />
                    <AppBar  position="fixed" color="white" className={classes.appBar}>
                        <Toolbar>

                            <Fab className={classes.fabButton} color="secondary" variant="extended" aria-lable="edit" onClick={() => this.openProjecttype()}>
                                <EditIcon />  projecttypes
                                </Fab>


                            <Fab  className={classes.fabButton} color="secondary" variant="extended" aria-lable="edit" onClick={() => this.openModule()}>
                                <EditIcon />  modules
                                </Fab>


                            <Fab  className={classes.fabButton}color="secondary" variant="extended" aria-lable="edit" onClick={() => this.openGrading()}>
                                <EditIcon />  grading
                                </Fab>


                            <Fab  className={classes.fabButton} color="secondary" variant="extended" aria-lable="edit">
                                <EditIcon />  key competences
                                </Fab>


                            <Fab  className={classes.fabButton} color="secondary" variant="extended" aria-lable="edit" onClick={() => this.openDialog()}>
                                <EditIcon />  semester period
                                </Fab>


                            <Fab  className={classes.fabButton} color="secondary" variant="extended" aria-lable="add" onClick={() => this.openProject()}>
                                <AddIcon /> new project
                                </Fab>


                        </Toolbar>
                    </AppBar>



				  </Container>
		);
	}
}

const styles = theme => ({
    grid:{
        width: '100%',
        margin: '0px',
        padding: theme.spacing(3)
    },
    button:{
        marginTop: theme.spacing(3)
    },

     appBar: {
      top: 'auto',
      bottom: 0,
      align:'center'
    },
    grow: {
      flexGrow: 1,
      },
    fabButton: {

      margin: '0 auto',
      zIndex: 1,
      top: -30,
      left: 0,
      right: 0,

    },
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    extendedIcon: {
      marginRight: theme.spacing(2),

    },
  }),
);



export default withStyles(styles) (AdminButtonBar);
