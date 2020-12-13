import React, { Component } from 'react';
import {Container} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import HeaderAdmin from '../../HeaderAdmin';
//import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import ApprovedProjects from './ApprovedProjects';
import KeyCompetence from './KeyCompetence';
import RejectedProjects from './RejectedProjects';
//import ArchivedProjects from './ArchivedProjects';


class HomeAfterBegin extends Component {


//evaluateNewProjektButton = (event) => {
//soon
//}

  render() {


        return (

            <div>

                 <CssBaseline />
                 <HeaderAdmin/>
                  <Container maxWidth="sm">
                      <ApprovedProjects/ >
                      <br/>
                      <KeyCompetence/ >
                      <br/>
                      <RejectedProjects/>
                      <Divider/>
				  </Container>
		    </div>
		);
	}
}
export default HomeAfterBegin;


