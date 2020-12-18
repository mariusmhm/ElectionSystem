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
import {withStyles} from '@material-ui/core';



let open= true;

class Notenbeschreibung extends Component {

    constructor(props){
        super(props)
        this.state= {
        grade:"",
        row:[{
        id:1,
        grade:"1,0"
        }
        ]
        }
    }

    handleSubmit =(event) =>{
        event.preventDefault()
        alert(` "The Module" ${this.state.moduleName} "with the module number" ${this.state.moduleNumber} "is added".`)

}

    handleInputGradeChange =(event)=>{
        event.preventDefault()
        this.setState({
            grade: event.target.value
        })
    }


 render(){
    return(
        <Dialog open={open}>
            <Typography
                variant="h4"
                align="center">
                    NOTENSCHLÜSSEL BEARBEITEN
            </Typography>
            <Typography
                variant="h5"
                align="center"
                color="secondary">
                    NOTEN
            </Typography>
            <br/>
            <br/>
            <Grid item xs={12} align="center">
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                 <TableCell> Note </TableCell>
                            </TableRow>
                        </TableHead>
                    <TableBody>
                         <TableRow>
                                   <TableCell> {this.state.grade}</TableCell>
                                   <TableCell>
                                         <IconButton
                                            align="right"
                                            aria-label="delete">
                                                <DeleteIcon />
                                         </IconButton>
                                   </TableCell>
                         </TableRow>
                    </TableBody>
                    </Table>
                </TableContainer>
            <Grid/>
            <br/>
            <Typography
                variant="h6"
                align="center"
                color="secondary">
                    NOTE HINZUFÜGEN
            </Typography>
            <Grid>
                <br/>
            </Grid>
            <FormControl onSubmit={this.handleSubmit}>
                <Grid container spacing={2} justify="center" align="center" >
                    <Grid item xs={3} align="center">
                        <TextField fullWidth
                            variant="outlined"
                            label="Note:"
                            onChange={this.handleInputGradeChange}
                            value={this.state.grade} />
                    </Grid>
                    <Grid item xs={12} align="right">
                        <Button
                            variant="outlined"
                            type="submit"
                            color="gray">
                                Hinzufügen
                        </Button>
                    </Grid>
                    <Grid item xs={12} >
                        <Button
                            variant="outlined"
                            color="gray">
                                Fertig
                        </Button>
                    </Grid>
                    <Grid>
                        <br/>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="outlined"
                            color="secondary">
                                Abbrechen
                        </Button>
                    </Grid>

            </Grid>
            </FormControl>
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




export default Notenbeschreibung;
