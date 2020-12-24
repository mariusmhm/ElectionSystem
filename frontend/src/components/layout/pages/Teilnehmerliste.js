import React, {Component} from 'react';
import { TextField, Button, Grid, Typography, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Container} from'@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import {withStyles} from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';


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
            <Container maxWidth="md">
                <CssBaseline />
                    <Grid container
                        direction="column"
                        justify="space-around"
                        className={classes.grid}>
                            <Typography variant="h4" > Project </Typography>
                            <Typography variant="h6" color="secondary" className={classes.redHeader}> entry list </Typography>
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
                                            <TableCell>NAME</TableCell>
                                            <TableCell>MARTRICULATION NUMBER</TableCell>
                                            <TableCell>COURSE OF STUDY</TableCell>
                                            <TableCell>SEMESTER</TableCell>
                                            <TableCell>PROJECT</TableCell>
                                            <TableCell>GRADE</TableCell>
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
                                                <TableCell>
                                                    <FormControl>
                                                        <InputLabel >GRADE</InputLabel>
                                                            <Select
                                                                labelId="demo-simple-select-label"
                                                                id="demo-simple-select"
                                                                value={row.grade}
                                                                >
                                                                    <MenuItem value={1,0}>1,0</MenuItem>
                                                                    <MenuItem value={1,3}>1,3</MenuItem>
                                                                    <MenuItem value={1,7}>1,7</MenuItem>
                                                                    <MenuItem value={2,0}>2,0</MenuItem>
                                                                    <MenuItem value={2,3}>2,3</MenuItem>
                                                                    <MenuItem value={2,7}>2,7</MenuItem>
                                                                    <MenuItem value={3,0}>3,0</MenuItem>
                                                                    <MenuItem value={3,3}>3,3</MenuItem>
                                                                    <MenuItem value={3,7}>3,7</MenuItem>
                                                                    <MenuItem value={4,0}>4,0</MenuItem>
                                                            </Select>
                                                    </FormControl>
                                                </TableCell>
                                                <TableCell> <Button  variant="contained" color="secondary" >save</Button> </TableCell>
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
                                        ADD STUDENT
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
