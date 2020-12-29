//import { makeStyles} from '@material-ui/core/styles';
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
    TableRow,
    MenuItem,
    InputLabel,
    Select
    } from'@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

let open = true;

class EditProjecttype extends Component {

    constructor(props){
        super(props)
        this.state= {
        projecttypeName:'',
        module:'',
        ects:'',
        sws:'',

        }
    }


    handleSubmit =(event) =>{
        event.preventDefault()
        alert(` "The Projecttype" ${this.state.projectypeName} "with the module" ${this.state.module} "is added".`)

}

    handleInputProjecttypeNameChange =(event)=>{
        event.preventDefault()
        this.setState({
            projecttypeName: event.target.value
        })
    }

    handleInputECTSChange=(event)=>{
        event.preventDefault()
        this.setState({
            ect: event.target.value
        })
    }

    handleInputSWSChange=(event)=>{
        event.preventDefault()
        this.setState({
            sws: event.target.value
        })
    }

     handleInputModuleChange=(event)=>{
        event.preventDefault()
        this.setState({
            module: event.target.value
        })
    }







 render(){

  return (

      <Dialog open={open} fullWidth maxWidth='md'>>
            <Typography
                variant="h4"
                align="center">
                    Edit Project type
            </Typography>
            <Typography
                variant="h5"
                align="center"
                color="secondary">
                    Project type
            </Typography>
            <br/>
            <br/>
            <TableContainer>
                 <Table>
                      <TableHead>
                           <TableRow>
                                 <TableCell> Project Type Name</TableCell>
                                 <TableCell> Module </TableCell>
                                 <TableCell> SWS </TableCell>
                                 <TableCell> ECTS </TableCell>
                                 <TableCell> Delete </TableCell>
                           </TableRow>
                      </TableHead>
                      <TableBody>
                           <TableRow>
                                    <TableCell> {this.state.projecttypeName}</TableCell>
                                   <TableCell> {this.state.module}</TableCell>
                                   <TableCell> {this.state.sws}</TableCell>
                                    <TableCell> {this.state.ect}</TableCell>
                                   <TableCell><IconButton aria-label="delete"><DeleteIcon />
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
                color="secondary">Add Projecttype
             </Typography>
             <br/>
            <FormControl fullWidth onSubmit={this.handleSubmit}>
                <Grid container spacing={2} justify="center" align="center" >
                    <Grid item xs={6}>
                        <TextField fullWidth
                        variant="outlined"
                        label="Projecttype name:"
                        onChange={this.handleInputProjecttypeNameChange}
                        value={this.state.projecttypeName} />
                    </Grid>
                   <Grid item container direction="row" xs={12} spacing={2} justify="center" align="center">
                    <Grid item xs={3}>
                        <TextField fullWidth
                        variant ="outlined"
                        label="ECTS"
                        value={this.state.ect}
                        onChange={this.handleInputECTSChange}/>
                    </Grid>
                    <Grid item xs={3}>
                        <TextField fullWidth variant="outlined" label="SWS" value={this.state.sws}
                        onChange={this.handleInputSWSChange}/>
                    </Grid>
                    </Grid>
                    <Grid item xs={6} justify='center'>
                        <FormControl fullWidth variant="outlined" onSubmit={this.handleSubmit}>
                            <InputLabel>Module</InputLabel>
                            <Select label="Module" value={this.state.module} onChange={this.handleInputModuleChange}>
                                <MenuItem value="1">MODULE 1</MenuItem>
                                <MenuItem value="2">MODULE 2</MenuItem>
                                <MenuItem value="3">MODULE 3</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <Button
                        variant="outlined"
                        type="submit"
                        color="secondary">
                            Add
                        </Button>
                    </Grid>
                    <Grid item >
                        <Button
                        variant="outlined"
                        color="secondary">
                            Cancel
                        </Button>
                    </Grid>
                    <Grid>
                        <br/>
                    </Grid>
                    <Grid item>
                        <Button
                        type="submit"
                        variant="outlined">
                            Submit
                        </Button>
                    </Grid>
            </Grid>
          </FormControl>

        </Dialog>
  );
}
}
export default EditProjecttype;
