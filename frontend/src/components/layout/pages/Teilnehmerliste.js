import React, {Component} from 'react';
import { TextField, Button, Grid, Typography, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Container} from'@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import {withStyles} from '@material-ui/core';
import Header from'./Header';




class Teilnehmerliste extends Component {

constructor(props){
    super(props)

    this.state= {
    rows:[
    {
    id:1,
    student:"Adrian Awad",
    note:"1,3",
    matrikelNr:"12345",
    studiengang:"WI7",
    semester:"4",
    projectName:"xy"},
    {
    id:2,
    student:"Jana Beer",
    note:"1,7",
    matrikelNr:"12345",
    studiengang:"WI7",
    semester:"7",
    projectName:"xy"},
    {
    id:3,
    student:"Saranda Gojani",
    note:"1,0",
    matrikelNr:"12345",
    studiengang:"WI7",
    semester:"4",
    projectName:"xy"},

    ]
    }
}

 render(){
     const { classes } = this.props;

    return(
        <div>
              <Header />
            <Container maxWidth="md">
                <CssBaseline />
                    <Grid container
                        direction="column"
                        justify="space-around"
                        className={classes.grid}>
                            <Typography variant="h4" > Projekt </Typography>
                            <Typography variant="h6" color="secondary" className={classes.redHeader}> Teilnehmerliste </Typography>
                    </Grid>
                    <Grid container
                        direction="row"
                        justify="space-around"
                        alignItems="center"
                        className={classes.grid}>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Martrikelnummer</TableCell>
                                            <TableCell>Studiengang</TableCell>
                                            <TableCell>Semester</TableCell>
                                            <TableCell>Projekt</TableCell>
                                            <TableCell>Note</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.state.rows.map(row=> (
                                            <TableRow key={row.id}>
                                                <TableCell> {row.student}</TableCell>
                                                <TableCell> {row.matrikelNr}</TableCell>
                                                <TableCell> {row.studiengang}</TableCell>
                                                <TableCell> {row.semester}</TableCell>
                                                <TableCell> {row.projectName}</TableCell>
                                                <TableCell> {row.note}</TableCell>
                                                <TextField fullWidth variant="outlined" label="Note:"/>
                                                <TableCell> <Button  variant="contained" color="secondary" >speichern</Button> </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                        </TableContainer>
                        <Grid item container
                            direction="column"
                            xs={12}
                            md={12}
                            spacing={2}
                            align="center"
                            className={classes.grid}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    className={classes.button}>
                                        Teilnehmer hinzufügen
                                </Button>
                        </Grid>
                    </Grid>
                </Container>
        </div>
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


export default withStyles(styles) (Teilnehmerliste) ;
