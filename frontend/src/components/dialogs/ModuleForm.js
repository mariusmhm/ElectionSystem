import React, {Component} from 'react';
import {Dialog,
    DialogTitle, 
    TextField, 
    Button,
    Grid,
    Typography,
    Table,
    TableBody, 
    TableCell, 
    TableContainer, 
    TableRow} from'@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import {withStyles} from '@material-ui/core';
import {ElectionSystemAPI, ModuleBO} from '../../api';


class ModuleForm extends Component {

    constructor(props) {

      let today = new Date(),
      date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      
      super(props);

      this.state = {
        creationDate: date,
        modules: [],   
        name: '',
        mNumber: null,
        openm:null,
        deletingError: null

      };

    }

    getAllModules = () => {
        ElectionSystemAPI.getAPI().getAllModules()
        .then(moduleBOs =>{
            this.setState({
                modules: moduleBOs,
                error: null
            });
        }).catch(e =>
                this.setState({
                    modules:[],
                    error: e
                }))
    }

    addModule = () => {
        let newModule = new ModuleBO();
        newModule.setDate(this.state.creationDate);
        newModule.setEdvNumber(this.state.mNumber);
        newModule.setName(this.state.name);
        ElectionSystemAPI.getAPI().addModule(newModule).then(m => {
            this.setState(this.baseState);
            this.getAllModules();

        }).catch(e =>
            this.setState({
                updatingError: e
            }))
      }

    handleChange = e =>{
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleChangeNum = (e) =>{
        this.setState({
            [e.target.id]: parseInt(e.target.value, 10)
        })
    }

    componentDidMount(){
        this.getAllModules();
    }

    deleteHandler = (m) => {
        ElectionSystemAPI.getAPI().deleteModule(m.getID())
        .catch(e =>
          this.setState({
            deletingError: e
          })
        );

        this.setState({
          modules: this.state.modules.filter(moduleFromState => moduleFromState.getID() !== m.getID())
        })
    }



 render(){
    const { classes } = this.props;

    return(

        <Dialog open={this.props.openm} onClose={this.props.closeModule} maxWidth='xs' fullWidth>
            <DialogTitle fontcolor='primary'className={classes.dialogHeader} >EDIT MODULE</DialogTitle>
            <Grid container spacing={2}  direction="column" justify="center" alignItems="center" className={classes.grid} >
                <Grid item>
                    <Typography className={classes.redHeader}>Modules</Typography>
                </Grid>

                <Grid item>
                    <TableContainer>
                        <Table>
                            <TableBody>
                                {this.state.modules.map(m => (
                                    <TableRow key={m.getID()} m={m}>
                                        <TableCell>{m.getName()}</TableCell>
                                        <TableCell>{m.getEdvNumber()}</TableCell>
                                        <TableCell>
                                            <Button aria-label="delete"  variant="outlined" onClick={() => this.deleteHandler(m)}>
                                                <DeleteIcon fontSize="small"/>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
            <Grid container spacing={2}  direction="column" justify="center" alignItems="center" className={classes.grid} >
                <Grid item>
                    <Typography className={classes.redHeader}>Add Module</Typography>
                </Grid>
                <Grid item>
                    <TextField fullWidth variant="outlined" id="name" label="Name" onChange={this.handleChange} value={this.state.moduleName}/>
                </Grid>

                <Grid item>
                    <TextField fullWidth variant="outlined" id="mNumber" label="EDV Number" onChange={this.handleChangeNum} value={this.state.edvNumber}/>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" onClick={this.addModule}>Add</Button>
                </Grid>

                <Grid container row={true} justify="center" alignItems="center" spacing={2} className={classes.button}>
                    <Grid item>
                        <Button variant="outlined" color="primary" onClick={this.props.closeModule}>Cancel</Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="primary" onClick={this.props.closeModule}>Done</Button>
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
        padding: '20px'
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


export default withStyles(styles)(ModuleForm);
