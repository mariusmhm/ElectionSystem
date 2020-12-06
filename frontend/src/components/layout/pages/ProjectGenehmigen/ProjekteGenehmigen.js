import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import {Typography, Container} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from '../../Header';
import ArchiveProject from './ArchiveProject';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';



class ProjekteGenehmigen extends Component {


evaluateNewProjektButton = (event) => {
//soon
}

  render() {


        return (

            <div>

                 <CssBaseline />
                 <Header/>
                  <Container maxWidth="sm">
                  <Typography variant='h4'>NEUE PROJEKTE</Typography>
                     <Grid container direction="row" justify="space-around" alignItems="center">

                             <br/>
                             <br/>
                             <br/>
                             <br/>
                             <Grid item xs={12} sm={3}>
                                 <Typography variant="body1">
                                 Projekt xy
                                 </Typography>
                             </Grid>

                             <Grid item xs={12} sm={3}>
                                 <Typography variant="body1">
                                 Projekttype xy
                                 </Typography>
                             </Grid>

                             <Grid item xs={12} sm={3}>
                                  <Typography variant="body1">
                                  Prof xy
                                  </Typography>
                             </Grid>

                             <Grid item xs={12} sm={3}>
                             <Button size="medium" variant="outlined" onClick={this.evaluateNewProjektButton}>
                                  BEWERTEN
                             </Button>
                             </Grid>

                      </Grid>
                      <Divider/>
                      <br/>
                      <br/>
                             <Typography variant='h4'>DIESES SEMESTER</Typography>
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
