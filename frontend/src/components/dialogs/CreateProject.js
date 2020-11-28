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
                <Grid item xs={12}>
                    <TextField fullWidth variant="outlined" label="Kurzbeschreibung:"/>
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined" className={classes.FormControl}>
                        <InputLabel>Modul</InputLabel>
                        <Select label="Modul">
                            <MenuItem value="1">Informationstechnologie</MenuItem>
                            <MenuItem value="2">Medien/Kultur</MenuItem>
                            <MenuItem value="3">Management</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <TextField fullWidth variant="outlined" label="EDV-Nummer:"/>
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined" className={classes.FormControl}>
                        <InputLabel>Projektart</InputLabel>
                        <Select label="Projektart">
                            <MenuItem value="1">Fachspezifisches Projekt </MenuItem>
                            <MenuItem value="2">Transdisziplinäres Projekt</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                 <Grid item xs={6}>
                    <TextField fullWidth variant="outlined" label="ECTS:"/>
                </Grid>
                <Grid item xs={6}>
                    <TextField fullWidth variant="outlined" label="SWS:"/>
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined" className={classes.FormControl}>
                        <InputLabel>Teilnehmeranzahl</InputLabel>
                        <Select label="Teilnehmeranzahl">
                            <MenuItem value="1">10</MenuItem>
                            <MenuItem value="2">20</MenuItem>
                            <MenuItem value="3">30</MenuItem>
                            <MenuItem value="4">40</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined" className={classes.FormControl}>
                        <InputLabel>Sprache</InputLabel>
                        <Select label="Sprache">
                            <MenuItem value="1">Deutsch</MenuItem>
                            <MenuItem value="2">Englisch</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined" className={classes.FormControl}>
                        <InputLabel>Semester</InputLabel>
                        <Select label="Semester">
                            <MenuItem value="1">WS</MenuItem>
                            <MenuItem value="2">SS</MenuItem>
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
                    <Typography>Wöchentliche Präsenztermine:</Typography>
                    <FormControl fullWidth variant="outlined" className={classes.FormControl}>
                        <Select label="Präsenztermine">
                            <MenuItem value="1">Keine</MenuItem>
                            <MenuItem value="1">1</MenuItem>
                            <MenuItem value="2">2</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <Typography>Blocktage vor der Vorlesungszeit:</Typography>
                    <FormControl fullWidth variant="outlined" className={classes.FormControl}>
                        <Select label="Blocktage">
                            <MenuItem value="1">Keine</MenuItem>
                            <MenuItem value="2">1</MenuItem>
                            <MenuItem value="3">2</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <Typography>Blocktage während der Vorlesungszeit:</Typography>
                    <FormControl fullWidth variant="outlined" className={classes.FormControl}>
                        <Select label="Blocktage">
                            <MenuItem value="1">Keine</MenuItem>
                            <MenuItem value="2">1</MenuItem>
                            <MenuItem value="3">2</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                Bei interdisziplinären oder transdisziplinären Projekten:
                    <Typography>Blocktage innerhalb der Prüfungsphase:</Typography>
                    <FormControl fullWidth variant="outlined" className={classes.FormControl}>
                        <Select label="Blocktage">
                            <MenuItem value="1">Keine</MenuItem>
                            <MenuItem value="2">1</MenuItem>
                            <MenuItem value="3">2</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <Typography>Besonderer Raum notwendig:</Typography>
                    <FormControl>
                            <RadioGroup row={true}>
                            <FormControlLabel value="true" control={<Radio />} label="Ja" />
                            <FormControlLabel value="false" control={<Radio />} label="Nein" />
                        </RadioGroup>
                    </FormControl>
                    <TextField fullWidth variant="outlined" label="Raumwünsche"/>
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