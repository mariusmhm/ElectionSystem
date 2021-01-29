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
import GradingEditingDialog from '../../dialogs/GradingEditingDialog';
import EditProjecttype from '../../dialogs/EditProjecttype';
import Semester from '../../dialogs/Semester';
import ModuleForm from '../../dialogs/ModuleForm';
import AddIcon from '@material-ui/icons/Add';
import CreateProject from '../../dialogs/CreateProject';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import AdminButtonBar from './AdminButtonBar';


class HomeScreenAdmin extends Component {
    constructor(props) {
        super(props);

        // Init the state
        this.state = {
            googleID: null,
            redirect: false,
            error: null,
            openDialog: false
        };
    }





  render() {
    const {classes}= this.props;


        return (

              <Container maxWidth="MD" align ="center">
                      <ListEntryNewProjectsAdmin/ >
                  <Divider/>
                      <ApprovedProjectsAdmin/ >
                      <RejectedProjectsAdmin/>
                  <Divider/>
                      <ArchivedProjectsAdmin/>
                  <Divider/>

                  <AdminButtonBar/>

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



export default withStyles(styles) (HomeScreenAdmin);
