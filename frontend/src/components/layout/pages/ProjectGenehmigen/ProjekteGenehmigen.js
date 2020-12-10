import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import {Typography, Container} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import HeaderAdmin from '../../HeaderAdmin';
import ArchiveProject from './ArchiveProject';
import Button from '@material-ui/core/Button';
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
                 <HeaderAdmin/>
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
