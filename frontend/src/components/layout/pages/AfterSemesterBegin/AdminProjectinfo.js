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
    TableHead,
    TableRow} from'@material-ui/core';
import {withStyles} from '@material-ui/core';

let open = true;

class ModuleForm extends Component {


    constructor(props) {
      super(props);

      this.state = {
        moduleName:'',
        edvNumber:'',
          rows:[
              {
                id: 1,
                name: 'module1',
                edv: 12345
              },
              {
                id: 2,
                name: 'module2',
                edv: 23456
              },
              {
                id: 3,
                name:'module3',
                edv:34567
              }

          ]

      };

    }

    addModule = () => {
        console.log('Add Module');
        console.log(this.state.moduleName);
        console.log(this.state.edvNumber);
      }

    handleTextFieldChange = e =>{
        const value = e.target.value;
        console.log(value);
        this.setState({
            [e.target.id]: e.target.value
        })
    }


 render(){
    const { classes } = this.props;

    return(

        <Dialog open={open} maxWidth='xs' fullWidth>
            <DialogTitle fontcolor='primary'className={classes.dialogHeader} >EDIT MODULE</DialogTitle>
            <Grid container spacing={2}  direction="column" justify="center" alignItems="center" className={classes.grid} >
                <Grid items>
                    <Typography className={classes.redHeader}>Modules</Typography>
                </Grid>

                <Grid item>
                    <TableContainer>
                        <Table>
                            <TableBody>
                                {this.state.rows.map(row => (
                                    <TableRow key={row.id}>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{row.edv}</TableCell>
                                        <TableCell><Button variant="outlined" color="primary">Delete</Button></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
            <Grid container spacing={2}  direction="column" justify="center" alignItems="center" className={classes.grid} >
                <Grid items>
                    <Typography className={classes.redHeader}>Add Module</Typography>
                </Grid>
                <Grid item>
                    <TextField fullWidth variant="outlined" id="moduleName" label="Name" onChange={this.handleTextFieldChange} value={this.state.moduleName}/>
                </Grid>

                <Grid item>
                    <TextField fullWidth variant="outlined" id="edvNumber" label="Module number" onChange={this.handleTextFieldChange} value={this.state.edvNumber}/>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" onClick={this.addModule}>Add</Button>
                </Grid>



                <Grid container row={true} justify="center" alignItems="center" spacing={2} className={classes.button}>
                    <Grid item>
                        <Button variant="outlined" color="primary">Cancel</Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="primary">OKAY</Button>
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