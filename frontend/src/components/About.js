import React, {Component} from 'react'
import { withStyles, Paper, Typography, Link } from '@material-ui/core';


/**
 * Shows the about page with the impressum, authors and other information.
 *

 */
class About extends Component{

  render(){

  const { classes} = this.props;

  return (
    <Paper variant="outlined" square >
      <div>
        <Typography variant='h6'>
          HDM ElectionSystem by group 8
        </Typography>
        <br />
        <Typography>
            Software Praktikum WS 20/21
            bei
            Professor Peter Thies & Christopher Kunz
        </Typography>
        <Typography>
           React Frontend and Python Backend written by Adrian Awad, Amna-Mia Mujezinovic, Jana Beer, Kevin Bahnmüller, Marius Münstermann, Marie Wenzel and Saranda Gojani.
           <link href='https://github.com/muenstermannmarius/ElectionSystem'> GitHub Repository </link>
        </Typography>
        <br />
        <Typography variant='body2'>
          © Hochschule der Medien 2020, all rights reserved.
        </Typography>
      </div>
    </Paper>
  )
}

}

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1)
  },
  content: {
    margin: theme.spacing(1),
  }
});

export default withStyles(styles)(About);
