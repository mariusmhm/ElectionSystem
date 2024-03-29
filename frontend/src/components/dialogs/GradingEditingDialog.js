import React, {Component} from 'react';
import {Dialog,
    TextField,
    DialogTitle,
    Button,
    Grid,
    Typography,
    Table,
    TableCell,
    TableBody,
    TableContainer,
    TableRow
    } from'@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import {withStyles} from '@material-ui/core';
import {ElectionSystemAPI, GradingBO} from '../../api';



/**
 * Controlls Gradings .
 *
 *
 */

class GradingEditingDialog extends Component {

    constructor(props){
        super(props)

        let today = new Date(),
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        this.state= {
            gradings: [],
            error: null,
            grade: '',
            openg:null,
            updatingError: null,
            deletingError: null,
            creationDate: date,


        };
        this.baseState = this.state;
    }

    /*Gives back all grades that exist*/
    getAllGrades = () => {
        ElectionSystemAPI.getAPI().getAllGrades()
        .then(gradingBOs =>
            this.setState({
                gradings: gradingBOs,
                error: null
            })).catch(e =>
                this.setState({
                    gradings:[],
                    error: e
                }))
    }

    componentDidMount(){
        this.getAllGrades();
    }

    /*Adds a grade */
    addGrade = () =>{
        let newGrade = new GradingBO();
        newGrade.setDate(this.state.creationDate);
        newGrade.setGrade(this.state.grade);
        ElectionSystemAPI.getAPI().addGrade(newGrade).then(grade => {
            this.setState(this.baseState);
            this.getAllGrades();

        }).catch(e =>
            this.setState({
                updatingError: e
            }))
    }

    handleTextFieldChange = e =>{
        const value = e.target.value;
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    /*Deletes a grade*/
    deleteGradeHandler = (grading) => {
        ElectionSystemAPI.getAPI().deleteGrade(grading.getID())
        .catch(e =>
          this.setState({
            deletingError: e
          })
        );

        this.setState({
          gradings: this.state.gradings.filter(gradeFromState => gradeFromState.getID() != grading.getID())
        })
    }

 render(){
    const { classes } = this.props;
    return(
        <Dialog open={this.props.openg} onClose={this.props.closeGrading} maxWidth='xs' fullWidth>
            <DialogTitle fontcolor='primary' className={classes.dialogHeader}>EDIT GRADES</DialogTitle>
            <Grid container spacing={2}  justify="center" alignItems="center" className={classes.grid}>
                <Grid item xs={12}>
                    <Typography align="center" color="secondary">Add Grade</Typography>
                </Grid>
                <Grid item xs={4} align="center">
                    <TextField fullWidth
                        variant="outlined"
                        id="grade"
                        label="Grade"
                        size="small"
                        onChange={this.handleTextFieldChange}
                        value={this.state.grade} />
                </Grid>
                <Grid item xs={2}>
                    <Button variant="contained" color="primary"  onClick={this.addGrade}>Add</Button>
                </Grid>
            </Grid>
            <Grid container spacing={2} direction="column" justify="center" alignItems="center" className={classes.grid}>
                <Grid item>
                    <Typography color="secondary">Grades</Typography>
                </Grid>
                <Grid item>
                    <TableContainer>
                        <Table>
                            <TableBody>
                            {this.state.gradings.map(grading => (
                                <TableRow key={grading.getID()} grading={grading}>
                                   <TableCell> {grading.getGrade()}</TableCell>
                                   <TableCell>
                                        <Button aria-label="delete"  variant="outlined" onClick={() => this.deleteGradeHandler(grading)}>
                                            <DeleteIcon fontSize="small"/>
                                        </Button>
                                   </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid container direction="row" justify="center" alignItems="center" spacing={2} className={classes.button}>
                    <Grid item>
                        <Button variant="outlined" color="primary" onClick={this.props.closeGrading}>Cancel</Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="primary" onClick={this.props.closeGrading}>Done</Button>
                    </Grid>
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




export default withStyles(styles)(GradingEditingDialog);
