import React, {Component} from 'react';
import {Dialog, 
    MenuItem, 
    Select, 
    InputLabel, 
    TextField, 
    FormLabel,
    RadioGroup, 
    FormControl, 
    FormControlLabel, 
    Radio, 
    Button,
    Grid,
    Typography} from'@material-ui/core';
import {withStyles} from '@material-ui/core';

let open= true;

class CreateProject extends Component {

 render(){
    const { classes } = this.props; 

    return(
        <Dialog open={open}>
            <Grid container spacing={2} justify="center" className={classes.grid} >
                <Grid item xs={12}>
                    <TextField fullWidth variant="outlined" label="Projektname:"/>
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined" className={classes.FormControl}>
                        <InputLabel>Modul</InputLabel>
                        <Select label="Modul">
                            <MenuItem value="">none</MenuItem>
                            <MenuItem>Informationstechnologie</MenuItem>
                            <MenuItem>Medien/Kultur</MenuItem>
                            <MenuItem>Management</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <TextField fullWidth variant="outlined" label="Kurzbeschreibung:"/>
                </Grid>
                <Grid item xs={6}>
                    <TextField fullWidth variant="outlined" label="EDV-Nummer:"/>
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined" className={classes.FormControl}>
                        <InputLabel>Projektart</InputLabel>
                        <Select label="Projektart">
                            <MenuItem>Fachspezifisches Projekt </MenuItem>
                            <MenuItem>Transdisziplinäres Projekt</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6} direction="row">
                    <Typography>Anzahl der Teilnehmer:</Typography>
                    <FormControl variant="outlined" className={classes.FormControl}>
                        <Select label="Teilnehmer">
                            <MenuItem value="">none</MenuItem>
                            <MenuItem>1</MenuItem>
                            <MenuItem>2</MenuItem>
                            <MenuItem>3</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined" className={classes.FormControl}>
                        <InputLabel>Sprache</InputLabel>
                        <Select label="Sprache">
                            <MenuItem value="">none</MenuItem>
                            <MenuItem>deutsch</MenuItem>
                            <MenuItem>englisch</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <TextField fullWidth variant="outlined" label="Weitere Professoren:"/>
                </Grid>
                <Grid item xs={6}>
                    <TextField fullWidth variant="outlined" label="Externer Koorperationspartner:"/>
                </Grid>
                <Grid item xs={6}>
                    <Typography>Blocktage vor der Vorlesungszeit:</Typography>
                    <FormControl fullWidth variant="outlined" className={classes.FormControl}>
                        <Select label="Präsenztermine">
                            <MenuItem value="">none</MenuItem>
                            <MenuItem>1</MenuItem>
                            <MenuItem>2</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <Typography>Blocktage vor der Vorlesungszeit:</Typography>
                    <FormControl fullWidth variant="outlined" className={classes.FormControl}>
                        <Select label="Blocktage">
                            <MenuItem value="">none</MenuItem>
                            <MenuItem>1</MenuItem>
                            <MenuItem>2</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <Typography>Blocktage während der Vorlesungszeit:</Typography>
                    <FormControl fullWidth variant="outlined" className={classes.FormControl}>
                        <Select label="Blocktage">
                            <MenuItem value="">none</MenuItem>
                            <MenuItem>1</MenuItem>
                            <MenuItem>2</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <Typography>Besonderer Raum:</Typography>
                    <FormControl>
                            <RadioGroup row={true}>
                            <FormControlLabel value="true" control={<Radio />} label="Ja" />
                            <FormControlLabel value="false" control={<Radio />} label="Nein" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid> 
                    <Button variant="outlined">Abbrechen</Button>
                </Grid>
                <Grid> 
                    <Button variant="outlined">Einreichen</Button>
                </Grid>
                
            </Grid>

        </Dialog>
    );
 }


}

const styles = theme => ({
    grid:{
        width: '100%',
        margin: '0px'
    }
});


export default withStyles(styles)(CreateProject);
