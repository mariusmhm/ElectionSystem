import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import {Typography} from '@material-ui/core';
import DeleteButton from '../../../Buttons/DeleteButton';
import CssBaseline from '@material-ui/core/CssBaseline';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
//import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Container from '@material-ui/core/Container';
import HeaderAdmin from '../../HeaderAdmin';


class EditProjectart extends Component {

  render() {

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
                                            <TableCell><Button variant="outlined">Subject-specific Projects</Button></TableCell>
                                            <TableCell><Button variant="outlined">ECTS</Button></TableCell>
                                            <TableCell><Button variant="outlined">SWS</Button></TableCell>
                                            <TableCell> <IconButton aria-label="delete"><DeleteIcon /> </IconButton></TableCell>
                                       </TableRow>
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
