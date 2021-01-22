import React, { Component } from 'react';
import {Container} from '@material-ui/core';
import ArchivedProjectsAdmin from './ArchivedProjectsAdmin';
import Divider from '@material-ui/core/Divider';
import {withStyles} from '@material-ui/core';
import ApprovedProjectsAdmin from './ApprovedProjectsAdmin';
import ListEntryNewProjectsAdmin from './ListEntryNewProjectsAdmin';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import { Redirect } from 'react-router';
import RejectedProjectsAdmin from './RejectedProjectsAdmin';
import GradingEditingDialog from '../../dialogs/GradingEditingDialog'
import EditProjecttype from '../../dialogs/EditProjecttype'
import Semester from '../../dialogs/Semester'
import ModuleForm from '../../dialogs/ModuleForm'



class HomeScreenAdmin extends Component {
    constructor(props) {
        super(props);

        // Init the state
        this.state = {
            open: false,
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


  render() {
    const {classes}= this.props;


        return (

              <Container maxWidth="MD" align ="center">
              < Semester
                    HomeScreenAdmin ={HomeScreenAdmin}
                    open={this.state.open}
                    openDialog={this.openDialog}
                    closeDialog={this.closeDialog}
              />
              < GradingEditingDialog
                    HomeScreenAdmin ={HomeScreenAdmin}
                    open={this.state.open}
                    openDialog={this.openDialog}
                    closeDialog={this.closeDialog}
              />
              < ModuleForm
                    HomeScreenAdmin ={HomeScreenAdmin}
                    open={this.state.open}
                    openDialog={this.openDialog}
                    closeDialog={this.closeDialog}
              />
              < EditProjecttype
                    HomeScreenAdmin ={HomeScreenAdmin}
                    open={this.state.open}
                    openDialog={this.openDialog}
                    closeDialog={this.closeDialog}
              />

                      <ListEntryNewProjectsAdmin/ >
                  <Divider/>
                      <ApprovedProjectsAdmin/ >
                      <RejectedProjectsAdmin/>
                  <Divider/>
                      <ArchivedProjectsAdmin/>

                  <Divider/>
                       <Grid container row={true} justify="center" alignItems="center" align ="center" spacing={2} className={classes.button}>
                            <Grid item >
                            <Fab color="secondary" variant="extended" aria-lable="edit" onClick={this.openDialog.bind(this)}>
                                <EditIcon />  projecttypes
                                </Fab>
                            </Grid>
                            <Grid item>
                            <Fab color="secondary" variant="extended" aria-lable="edit" onClick={this.openDialog.bind(this)}>
                                <EditIcon />  modules
                                </Fab>
                            </Grid>
                            <Grid item>
                            <Fab color="secondary" variant="extended" aria-lable="edit" onClick={this.openDialog.bind(this)}>
                                <EditIcon />  grading
                                </Fab>
                            </Grid>
                            <Grid item>
                            <Fab color="secondary" variant="extended" aria-lable="edit">
                                <EditIcon />  key competences
                                </Fab>
                            </Grid>
                            <Grid item>
                            <Fab color="secondary" variant="extended" aria-lable="edit" onClick={() => this.openDialog()}>
                                <EditIcon />  semester period
                                </Fab>
                            </Grid>
                       </Grid>


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
    }
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



export default withStyles(styles) (HomeScreenAdmin);
