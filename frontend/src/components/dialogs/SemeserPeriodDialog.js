import React, {Component} from 'react';
import {Dialog,
    TextField,
    FormControl,
    Button,
    Grid,
    Typography,
    FormControlLabel,
    FormLabel,
    RadioGroup,
    Radio,
    DialogTitle
    } from'@material-ui/core';
import {withStyles} from '@material-ui/core';
import {ElectionSystemAPI, SemesterBO} from '../../api';




let open= true;

class SemeserPeriodDialog extends Component {


 render(){
 const { classes } = this.props;
    return(
        <Dialog open={open} fullWidth maxWidth='xs'>
        <DialogTitle
            fontcolor='primary'
            className={classes.dialogHeader}>
                EDIT THE SEMESTER PERIOD
        </DialogTitle>
            <Grid item container direction="column" xs={12} md={12} spacing={2} align="center" className={classes.grid}>
                <FormControl align="center">
                    <RadioGroup row={true}>
                         <FormControlLabel
                            value="winter semester"
                            control={<Radio />}
                            label="winter semester"
                            align="left"/>
                         <FormControlLabel
                            value="summer semester"
                            control={<Radio />}
                            label="summer semester"
                            align="right" />
                    </RadioGroup>
                </FormControl>
            <Grid item container direction="column" xs={12} md={12} spacing={2} align="center" className={classes.grid}>
            <Grid item container direction="column" xs={12} md={12} spacing={2} align="center" className={classes.grid}>
            <Typography
                    variant="h6"
                    color="secondary"
                    align="center"
                    className={classes.redHeader}>
                        DUE DATE FOR NEW PROJCTS
            </Typography>
                <Grid item align="center">
                    <TextField required
                        id="filled-required"
                        label="from:"
                        defaultValue="XX/XX/XXXX"
                        variant="outlined"

                    />
                </Grid>
                <Grid item >
                    <TextField required
                        id="filled-required"
                        label="to:"
                        defaultValue="XX/XX/XXXX"
                        variant="outlined" />
                </Grid>
            </Grid>
             <Grid item container direction="column" xs={12} md={12} spacing={2} align="center" className={classes.grid}>
            <Typography
                variant="h6"
                align="center"
                color="secondary"
                className={classes.redHeader}>
                    DUE DATE FOR GIVING GRADES
            </Typography>
                <Grid item xs={12} md={12}>
                    <TextField required
                        id="filled-required"
                        label="from:"
                        defaultValue="XX/XX/XXXX"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={12} md={12}>
                    <TextField required
                        id="filled-required"
                        label="to:"
                        defaultValue="XX/XX/XXXX"
                        variant="outlined"
                    />
                </Grid>
            </Grid>
            </Grid>
            <Grid item container direction="row" xs={12} md={12} spacing={2} align="center" className={classes.grid}>
            <FormControl onSubmit={this.handleSubmit}>
                    <Grid item xs={6}>
                        <Button
                        variant="outlined"
                        color="secondary"
                        align="center"
                        className={classes.button}>
                            CANCLE
                        </Button>
                    </Grid>
                    <Grid>
                        <br/>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                        type="submit"
                        variant="outlined"
                        align="center"
                        className={classes.button}>
                            DONE
                        </Button>
                    </Grid>

            </FormControl>
            </Grid>
            </Grid>

        </Dialog>
    );
 }

}
const styles = theme => ({
    grid:{
        width: '100%',
        margin: '0px',
        padding: theme.spacing(3)
    },
    dialogHeader:{
        textAlign: "center"
    },
    button:{
        marginTop: theme.spacing(3)
    },
    redHeader:{
        color: theme.palette.red,
        fontFamily: 'Arial',
        fontStyle: 'bold',
        fontSize: 15
    }
});
export default withStyles(styles)(SemeserPeriodDialog);
