import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import {Typography} from '@material-ui/core';
import DeleteButton from '../../../Buttons/DeleteButton';


class ArchiveProject extends Component {



  render() {


        return (

            <div>
                <Typography variant='h4'>ARCHIVED PROJECT</Typography>
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
                        <DeleteButton />
                    </Grid>
                </Grid>
		    </div>
		);
  }
}
export default ArchiveProject;
