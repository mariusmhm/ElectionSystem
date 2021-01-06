import React, {Component} from 'react';
import {Button, Icon, Grid, TextField, Typography, withStyles} from'@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';


class ProjectContent extends Component {

   constructor(props) {
      super(props);

      
   }


 render(){
    const { classes } = this.props; 

    return (
        <div className={classes.pageContent}>
            
            <Grid container spacing={2} justify="center" className={classes.grid}>
            <Grid container justify="flex-start" alignItems="flex-start" md={1}>
                <Grid item>
                <IconButton className={classes.arrowButton}>
                    <ArrowBackIosIcon color="secondary"/> 
                </IconButton>
                </Grid>
            </Grid>

            <Grid container direction="column" spacing={2} xs={12} md={5}>
                <Grid item>
                    <Typography>PROJECTNAME</Typography>
                </Grid>
                <Grid item>
                    <Typography>Modul:</Typography>
                </Grid>
                <Grid item>
                    <Typography>EDV Number:</Typography>
                </Grid>
                <Grid item>
                    <Typography>Project type:</Typography>
                </Grid>
                <Grid item>
                    <Typography>ETCS:</Typography>
                </Grid>
                <Grid item>
                    <Typography>SWS:</Typography>
                </Grid>
                <Grid item>
                    <Typography>Language:</Typography>
                </Grid>
                <Grid item>
                    <Typography>Additional Professors:</Typography>
                </Grid>
                <Grid item>
                    <Typography>External co-operation partner:</Typography>
                </Grid>
                <Grid item>
                    <Typography>Weekly lecture:</Typography>
                </Grid>
                <Grid item>
                    <Typography>Particular room necessary:</Typography>
                </Grid>
                <Grid item>
                    <Typography>Blockdays prior to semester:</Typography>
                </Grid>
                <Grid item>
                    <Typography>Blockdays during semester:</Typography>
                </Grid>
                <Grid item>
                    <Typography>Blockdays during exam week:</Typography>
                </Grid>
            </Grid>
            <Grid container direction="column" spacing={2} xs={12} md={6}>
                <Grid item>
                    <Typography>Short description:</Typography>
                </Grid>
                <Grid item>
                    <Typography>State:</Typography>
                </Grid>
                <Grid item>
                    <Typography>Reason:</Typography>
                </Grid>
            </Grid>
            
            </Grid>
        </div>



    )
        
    
 }
}

const styles = theme => ({
    grid:{
        width: '100%',
        marginTop: theme.spacing(2),
        margin: theme.spacing(3),
        paddingLeft: theme.spacing(2)
        
    },
    pageContent:{
        margin: theme.spacing(1)
    },
    arrowButton:{
        padding: theme.spacing(0)
    }
});

export default withStyles(styles)(ProjectContent);

