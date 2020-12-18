import React, { Component } from 'react';
import {Container} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import ArchiveProject from './ArchiveProject';
import Divider from '@material-ui/core/Divider';
import ListEntryNeueProjekte from './ListEntryNeueProjekte'
import ListEntryDiesesSemester from './ListEntryDiesesSemester'




class ProjekteGenehmigen extends Component {


evaluateNewProjektButton = (event) => {
//soon
}

  render() {


        return (

            <div>

                 <CssBaseline />

                  <Container maxWidth="sm">
                      <ListEntryNeueProjekte/ >
                      <Divider/>
                      <br/>
                      <br/>
                      <ListEntryDiesesSemester/ >
                      <Divider/>
                      <div>
                      <ArchiveProject/>
                      </div>
				  </Container>
		    </div>
		);
	}
}
export default ProjekteGenehmigen;
