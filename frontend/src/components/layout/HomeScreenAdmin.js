import React, { Component } from 'react';
import {Container} from '@material-ui/core';
import ArchivedProjectsAdmin from './pages/ArchivedProjectsAdmin';
import Divider from '@material-ui/core/Divider';
import {withStyles} from '@material-ui/core';
import ApprovedProjectsAdmin from './pages/ApprovedProjectsAdmin';
import ListEntryNewProjectsAdmin from './pages/ListEntryNewProjectsAdmin';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import { Redirect } from 'react-router';
import RejectedProjectsAdmin from './pages/RejectedProjectsAdmin';
import GradingEditingDialog from '../dialogs/GradingEditingDialog';
import ApprovedKeyCompetence from './pages/ApprovedKeyCompetence';


class HomeScreenAdmin extends Component {
    constructor(props) {
        super(props);

        // Init the state
        this.state = {
            show:false,
            googleID: null,
            redirect: false,
            error: null
        };
    }


    openDialog() {
        this.setState({ open: true });
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
                       <Grid container row={true} justify="center" alignItems="center" align ="center" spacing={2} className={classes.button}>
                            <Grid item >
                            <Fab color="primary" variant="extended" aria-lable="edit">
                                <EditIcon /> Edit projecttypes
                                </Fab>
                            </Grid>
                            <Grid item>
                            <Fab color="primary" variant="extended" aria-lable="edit">
                                <EditIcon /> Edit modules
                                </Fab>
                            </Grid>
                            <Grid item>
                            <Fab color="primary" variant="extended" aria-lable="edit" onClick={this.openDialog.bind(this)}>
                                <EditIcon /> Edit grading
                                </Fab>
                            </Grid>
                            <Grid item>
                            <Fab color="primary" variant="extended" aria-lable="edit">
                                <EditIcon /> Edit key competences
                                </Fab>
                            </Grid>
                            <Grid item>
                            <Fab color="primary" variant="extended" aria-lable="edit">
                                <EditIcon /> Edit semester period
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
