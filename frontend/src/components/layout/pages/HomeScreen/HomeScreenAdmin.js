import React, { Component } from 'react';
import {Container} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import {withStyles} from '@material-ui/core';
import ListEntryThisSemesterAdmin from './HomeScreen/ListEntryThisSemesterAdmin';
import ListEntryNewProjectsAdmin from './HomeScreen/ListEntryNewProjectsAdmin';
import ArchivedProjectsAdmin from './HomeScreen/ArchivedProjectsAdmin';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Button';




class HomeScreenAdmin extends Component {


evaluateNewProjektButton = (event) => {
//soon
}

  render() {
    const {classes}= this.props;


        return (



                  <Container maxWidth="MD">
                      <ListEntryNewProjectsAdmin/ >
                      <Divider/>
                      <br/>
                      <br/>
                      <ListEntryThisSemesterAdmin/ >
                      <Divider/>

                      <ArchivedProjectsAdmin/>
                      <Divider/>
                       <Grid item container
                            direction="column"
                            xs={12}
                            md={12}
                            spacing={2}
                            align="center"
                            className={classes.grid}>
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
export default withStyles(styles) (HomeScreenAdmin);
