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
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import {withStyles} from '@material-ui/core';
import {ElectionSystemAPI, GradingBO} from '../../api';



let open= true;

class GradingEditingDialog extends Component {

    constructor(props){
        super(props)
        this.state= {
            gradings: [],
            error: null,
            grade: '',
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
                error: null
            })).catch(e =>
                this.setState({
                    gradings:[],
                    error: e
                }))
        console.log('ausgeführt');
    }

    componentDidMount(){
        this.getAllGrades();
    }

    addGrade = () =>{
        let newGrade = new GradingBO(this.state.grade);
        ElectionSystemAPI.getAPI().addGrade(newGrade).then(grade => {
            this.setState(this.baseState);
            
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


    deleteGradeHandler = (grading) => {
        console.log(grading);
        ElectionSystemAPI.getAPI().deleteGrade(grading.getID()).then(grading => {
          console.log(grading);
        }).catch(e =>
          this.setState({ 
            deletingError: e
          })
        );

        this.setState({
          gradings: this.state.gradings.filter(gradeFromState => gradeFromState.getID() != grading.getID())
        })
    }

   /** handleClickOpen = () => {
    setOpen(true);
  };

  handleClose = () => {
    setOpen(false);
  };**/

 render(){
    const { gradings, error } = this.state;
    const { classes } = this.props;
    return(
        <Dialog open={open} maxWidth='xs' fullWidth>
            <DialogTitle fontcolor='primary' className={classes.dialogHeader}>EDIT GRADES</DialogTitle>
            <Grid container spacing={2}  justify="center" alignItems="center" className={classes.grid}>
                <Grid item xs={12}>
                    <Typography align="center" color="secondary">Add Grade</Typography>
                </Grid>
                <Grid item xs={3} align="center">
                    <TextField fullWidth 
                        variant="outlined"
                        id="grade" 
                        label="Grade"
                        size="small"
                        onChange={this.handleTextFieldChange}
                        value={this.state.grade} />
                </Grid>
                <Grid item>
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
                        <Button variant="outlined" color="secondary">Cancel</Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="primary">Okay</Button>
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
