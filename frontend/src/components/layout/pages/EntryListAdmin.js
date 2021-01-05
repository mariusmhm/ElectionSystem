import React, {Component} from 'react';
import {  Button, Grid, Typography, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Container} from'@material-ui/core';
//import CssBaseline from '@material-ui/core/CssBaseline';
import {withStyles} from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import {ElectionSystemAPI} from '../../../api';



class EntryListAdmin extends Component {



constructor(props){
    super(props)

    this.state= {
    students:[],
    participations:[],
    gradings: [],
    error: null,
    grade: '',
    name: '',
    study:'',
    martrikelNummer:'',
    updatingError: null,
    deletingError: null,
    };
    this.baseState = this.state;

}

getAllGrades = () => {
        ElectionSystemAPI.getAPI().getAllGrades()
        .then(gradingBOs =>
            this.setState({
                gradings: gradingBOs,
                loaded: true,
                error: null
            })).catch(e =>
                this.setState({
                    gradings:[],
                    error: e
                }))
        console.log('ausgeführt');
    }

getStudentByParticipations = () => {
        ElectionSystemAPI.getAPI().getStudentByParticipations(2)
        .then(studentBOs =>
            this.setState({
                students: studentBOs,
                loaded: true,
                error: null
            })).catch(e =>
                this.setState({
                    students:[],
                    error: e
                }))
        console.log('ausgeführt');

    }

    componentDidMount(){
        this.getAllGrades();
        this.getStudentByParticipations();
    }

updateGrade= () => {
//soon

}


 render(){
     const { classes } = this.props;
     const { gradings, error, students} = this.state;

    return(
            <Container maxWidth="md">
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
                        <Grid item>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>NAME</TableCell>
                                            <TableCell>MARTRICULATION NUMBER</TableCell>
                                            <TableCell>COURSE OF STUDY</TableCell>
                                            <TableCell>GRADE</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.state.students.map(student => (
                                            <TableRow key={student.getID()} student={student}>
                                                <TableCell > {student.getName()} </TableCell>
                                                <TableCell >{student.getMatrikelNr()} </TableCell>
                                                <TableCell > {student.getStudy()}</TableCell>
                                                <TableCell>
                                                    <FormControl>
                                                        <InputLabel >GRADE </InputLabel>
                                                            <Select labelId="grading">
                                                                {this.state.gradings.map((grading, index) => (
                                                                    <MenuItem key={index} value={index}>
                                                                        {grading.getGrade()}
                                                                    </MenuItem>
                                                                ))}
                                                            </Select>
                                                    </FormControl>
                                                </TableCell>
                                                <TableCell>
                                                <Button  variant="contained" color="secondary" >save</Button> </TableCell>
                                            </TableRow>
                                                 ))}
                                    </TableBody>
                                </Table>
                        </TableContainer>
                        </Grid>
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
                                    className={classes.button}
                                    onClick={this.updateGrade}>
                                        ADD STUDENT
                                </Button>
                        </Grid>
                    </Grid>
                </Container>

    );
 }
}

const styles = theme => ({
    grid:{
        width: '100%',
        margin: '0px',
        padding: theme.spacing(3)
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

export default withStyles(styles)(EntryListAdmin);
