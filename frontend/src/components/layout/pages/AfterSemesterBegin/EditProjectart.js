import React, { Component } from 'react';
//import DeleteButton from '../../../Buttons/DeleteButton';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
//import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import HeaderAdmin from '../../HeaderAdmin';
import { TextField, Grid, Typography, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Container} from'@material-ui/core';



class EditProjectart extends Component {


render(){
        return (

            <div>
             <Container maxWidth="sm">

                <CssBaseline />
                <HeaderAdmin/>
                <br/>
                <br/>
                <Typography color="secondary" variant='h4'>EDIT PROJECTART</Typography>
                <Grid container direction="row" justify="space-around" alignItems="center">
                    <br/>
                    <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Projectarts</TableCell>
                                    </TableRow>
                                </TableHead>
                                   <TableBody>
                                       <TableRow>
                                            <TableCell><Button variant="outlined">Subjectspecific Projects</Button></TableCell>
                                            <TableCell><Button variant="outlined">ECTS</Button></TableCell>
                                            <TableCell><Button variant="outlined">SWS</Button></TableCell>
                                            <TableCell> <IconButton aria-label="delete"><DeleteIcon /> </IconButton></TableCell>
                                       </TableRow>
                                       <TableRow>
                                       <TableCell><Button variant="outlined">Interdisciplinair Projects</Button></TableCell>
                                            <TableCell><Button variant="outlined">ECTS</Button></TableCell>
                                            <TableCell><Button variant="outlined">SWS</Button></TableCell>
                                            <TableCell> <IconButton aria-label="delete"><DeleteIcon /> </IconButton></TableCell>
                                       </TableRow>
                                       <TableRow>
                                       <TableCell><Button variant="outlined">Transdisciplinair Projects</Button></TableCell>
                                            <TableCell><Button variant="outlined">ECTS</Button></TableCell>
                                            <TableCell><Button variant="outlined">SWS</Button></TableCell>
                                            <TableCell> <IconButton aria-label="delete"><DeleteIcon /> </IconButton></TableCell>
                                       </TableRow>
                                       <TableRow>
                                       <TableCell><Button variant="outlined">Ways of Working</Button></TableCell>
                                            <TableCell><Button variant="outlined">ECTS</Button></TableCell>
                                            <TableCell><Button variant="outlined">SWS</Button></TableCell>
                                            <TableCell> <IconButton aria-label="delete"><DeleteIcon /> </IconButton></TableCell>
                                       </TableRow>
                                        <TableRow>
                                       <TableCell><Button variant="outlined">Tools of Working</Button></TableCell>
                                            <TableCell><Button variant="outlined">ECTS</Button></TableCell>
                                            <TableCell><Button variant="outlined">SWS</Button></TableCell>
                                            <TableCell> <IconButton aria-label="delete"><DeleteIcon /> </IconButton></TableCell>
                                       </TableRow>
                                </TableBody>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Add Projectart</TableCell>
                                    </TableRow>
                                </TableHead>
                                    <TableBody>
                                            <TextField fullWidth variant="outlined" label="Name:"/>
                                            <TableRow>
                                                <TableCell>
                                                    <TextField fullWidth variant="outlined" label="ECTS"/><TextField fullWidth variant="outlined" label="SWS"/>
                                                </TableCell>
                                             </TableRow>
                                             <TextField fullWidth variant="outlined" label="Module"/>
                                    </TableBody>
                            </Table>
                    </TableContainer>
                </Grid>
             </Container>
		    </div>
		);
  }
}
export default EditProjectart;
