import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import {Dialog,
    DialogTitle,
    MenuItem,
    Select,
    InputLabel,
    TextField,
    RadioGroup,
    FormControl,
    FormControlLabel,
    Radio,
    Button,
    Typography} from'@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

let open = true;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function CenteredGrid() {
  const classes = useStyles();

  return (
  //Gridlayout for projecttypes
          <Dialog open={open} fullWidth maxWidth='md'>
            <DialogTitle fontcolor='primary'className={classes.dialogHeader}><h1>EDIT PROJECTTYPE</h1></DialogTitle>
                <div className={classes.root}>
                    <Grid container spacing={3} justify='center'>
                        <h2>Projecttypes</h2>
                    </Grid>
                    <Grid container spacing={3} justify='center'>

                        <Grid item xs={3}>
                        <Paper className={classes.paper}>Subject-specific project</Paper>
                        </Grid>
                        <Grid item xs={2}>
                        <Paper className={classes.paper}>ECTS</Paper>
                        </Grid>
                        <Grid item xs={2}>
                        <Paper className={classes.paper}>SWS</Paper>
                        </Grid>
                        <Grid item xs={2}>
                        <Paper className={classes.paper}>Löschen</Paper>
                        </Grid>
                    </Grid>

        <Grid container spacing={3} justify='center'>
        <Grid item xs={3}>
          <Paper className={classes.paper}>Interdisciplinary projects</Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paper}>ECTS</Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paper}>SWS</Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paper}>Löschen</Paper>
        </Grid>
      </Grid>

        <Grid container spacing={3} justify='center'>
        <Grid item xs={3}>
          <Paper className={classes.paper}>Transdisciplinary projects</Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paper}>ECTS</Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paper}>SWS</Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paper}>Löschen</Paper>
        </Grid>
      </Grid>

        <Grid container spacing={3} justify='center'>
        <Grid item xs={3}>
          <Paper className={classes.paper}>Ways of Working</Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paper}>ECTS</Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paper}>SWS</Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paper}>Löschen</Paper>
        </Grid>
      </Grid>

        <Grid container spacing={3} justify='center'>
        <Grid item xs={3}>
          <Paper className={classes.paper}>Tools of Working</Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paper}>ECTS</Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paper}>SWS</Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paper}>Löschen</Paper>
        </Grid>
      </Grid>

        <Grid container spacing={3} justify='center'>
        <Grid item xs={3}>
          <Paper className={classes.paper}>Working in a Media World</Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paper}>ECTS</Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paper}>SWS</Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paper}>Löschen</Paper>
        </Grid>
      </Grid>


      <Grid container spacing={3} justify='center'>
                        <h2>Add projecttype</h2>
                    </Grid>
                    <Grid container spacing={3} justify='center'>
                        <Grid item xs={6}>
                        <TextField fullWidth variant="outlined" label="Name:"/>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3} justify='center'>
                        <Grid item xs={3}>
                        <TextField fullWidth variant="outlined" label="ECTS"/>
                        </Grid>

                        <Grid item xs={3}>
                        <TextField fullWidth variant="outlined" label="SWS"/>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3} justify='center'>
                        <Grid item xs={6} justify='center'>
                        <FormControl fullWidth variant="outlined" className={classes.FormControl}>
                            <InputLabel>Module</InputLabel>
                            <Select label="Module" /* value={module} */>
                                <MenuItem value="1">MODULE 1</MenuItem>
                                <MenuItem value="2">MODULE 2</MenuItem>
                                <MenuItem value="3">MODULE 3</MenuItem>
                            </Select>
                        </FormControl>
                        </Grid>
                     </Grid>
                    <Grid container spacing={3} justify='center'>
                        <Grid item>
                            <Button variant="contained" color="primary">Add</Button>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3} justify='center'>
                        <Grid item>
                            <Button variant="outlined">Cancel</Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="primary">Submit</Button>
                        </Grid>
                    </Grid>


    </div>

</Dialog>
  );
}

