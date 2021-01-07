import React, { Component } from 'react';
import {Container} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import ArchivedProjectsAdmin from './pages/ArchivedProjectsAdmin';
import Divider from '@material-ui/core/Divider';
import {withStyles} from '@material-ui/core';
import ListEntryThisSemesterAdmin from './pages/ListEntryThisSemesterAdmin';
import ListEntryNewProjectsAdmin from './pages/ListEntryNewProjectsAdmin';




class HomeScreenAdmin extends Component {


evaluateNewProjektButton = (event) => {
//soon
}

  render() {


        return (

            <div>

                 <CssBaseline />

                  <Container maxWidth="MD">
                      <ListEntryNewProjectsAdmin/ >
                      <Divider/>
                      <br/>
                      <br/>
                      <ListEntryThisSemesterAdmin/ >
                      <Divider/>
                      <div>
                      <ArchivedProjectsAdmin/>
                      <Divider/>
                      </div>
				  </Container>
		    </div>
		);
	}
}
export default HomeScreenAdmin;
