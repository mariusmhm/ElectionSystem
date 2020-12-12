import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import {Typography, Container} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import HeaderAdmin from '../../HeaderAdmin';
import ArchiveProject from './ArchiveProject';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import ApprovedProjects from './ApprovedProjects';
import KeyCompetence from './KeyCompetence';
import RejectedProjects from './RejectedProjects';


class HomeAfterBegin extends Component {


evaluateNewProjektButton = (event) => {
//soon
}

  render() {


        return (

            <div>

                 <CssBaseline />
                 <HeaderAdmin/>
                  <Container maxWidth="sm">
                      <ApprovedProjects/ >
                      <Divider/>
                      <br/>
                      <br/>
                      <KeyCompetence/ >
                      <Divider/>
                      <div>
                      <RejectedProjects/>
                      </div>
                      <div>
                      <ArchivedProjects/>
                      </div>
				  </Container>
		    </div>
		);
	}
}
export default HomeAfterBegin;