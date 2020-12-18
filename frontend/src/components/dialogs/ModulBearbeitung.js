import React, {Component} from 'react';
import {Dialog,
    TextField,
    FormControl,
    Button,
    Grid,
    Typography,
    Table,
    TableHead,
    TableCell,
    TableBody,
    TableContainer,
    TableRow
    } from'@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';



let open= true;

class ModulBearbeitung extends Component {

    constructor(props){
        super(props)
        this.state= {
        moduleName:"",
        moduleNumber:""
        }
    }




    handleSubmit =(event) =>{
        event.preventDefault()
        alert(` "The Module" ${this.state.moduleName} "with the module number" ${this.state.moduleNumber} "is added".`)

}

    handleInputModuleNameChange =(event)=>{
        event.preventDefault()
        this.setState({
            moduleName: event.target.value
        })
    }

    handleInputModuleNumberChange =(event)=>{
        event.preventDefault()
        this.setState({
            moduleNumber: event.target.value
        })
    }



 render(){
    return(
        <Dialog open={open}>
            <Typography
                variant="h4"
                align="center">
                    Module bearbeiten
            </Typography>
            <Typography
                variant="h5"
                align="center"
                color="secondary">
                    Module
            </Typography>
            <br/>
            <br/>
            <TableContainer>
                 <Table>
                      <TableHead>
                           <TableRow>
                                 <TableCell> Module Name </TableCell>
                                 <TableCell> Module Number </TableCell>
                           </TableRow>
                      </TableHead>
                      <TableBody>
                           <TableRow>
                                   <TableCell> {this.state.moduleName}</TableCell>
                                   <TableCell> {this.state.moduleNumber}</TableCell>
                                   <TableCell>
                                         <IconButton aria-label="delete">
                                            <DeleteIcon />
                                         </IconButton>
                                   </TableCell>
                           </TableRow>
                      </TableBody>
                 </Table>
            </TableContainer>
            <br/>
            <Typography
                variant="h6"
                align="center"
                color="secondary">
                    Module hinzufügen
            </Typography>
            <FormControl onSubmit={this.handleSubmit}>
                <Grid container spacing={2} justify="center" align="center" >
                    <Grid item xs={8}>
                        <TextField fullWidth
                        variant="outlined"
                        label="Modulname:"
                        onChange={this.handleInputModuleNameChange}
                        value={this.state.moduleName} />
                    </Grid>
                    <Grid item xs={8}>
                        <TextField fullWidth
                        variant ="outlined"
                        label="Modulnummer"
                        value={this.state.moduleNumber}
                        onChange={this.handleInputModuleNumberChange}/>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <Button
                        variant="outlined"
                        type="submit"
                        color="secondary">
                            Hinzufügen
                        </Button>
                    </Grid>
                    <Grid item >
                        <Button
                        variant="outlined"
                        color="secondary">
                            Abbrechen
                        </Button>
                    </Grid>
                    <Grid>
                        <br/>
                    </Grid>
                    <Grid item>
                        <Button
                        type="submit"
                        variant="outlined">
                            Fertig
                        </Button>
                    </Grid>
                    <Grid>
                        <br/>
                    </Grid>
            </Grid>
            </FormControl>

        </Dialog>
    );
 }


}
export default ModulBearbeitung;
