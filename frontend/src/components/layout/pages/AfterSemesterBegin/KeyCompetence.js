import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
//import Participator from '../../../Buttons/Participator';
//import PropTypes from 'prop-types';
//import DeleteIcon from '@material-ui/icons/Delete';
//import Icon from '@material-ui/core/Icon';
//import IconButton from '@material-ui/core/IconButton';

/**
 * Renders a Project object within a ListEntry and provides a decline, delete, approve button. Links projects
 * to a list of projects. This is done by routing the link to /ProjekteGenehmigen and passing the ProjectBO and
 *  as props to the ProjekteGenehmigen component.
 *
 */

class ApprovedProjects extends Component {
constructor(props){
    super(props)

    this.state= {
    rows:[
    {
    id:1,
    project_name:"User Experience",
    project_type:"inter",
    professor:"Kunz"},

     {
    id:2,
    project_name:"Programmieren",
    project_type:"xyz",
    professor:"Thies"},

     {
    id:3,
    project_name:"ADS",
    project_type:"mno",
    professor:"Thies"},

    ]
    }
}


  render() {
        const {classes}= this.props;
        return (
            <div>
                <Container maxWidth="sm">
                    <CssBaseline />
                    <br/>
                    <br/>
                    <Typography variant='h6' color="gray">Key Competence</Typography>
                    <br/>
                    <Grid item>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Project</TableCell>
                                        <TableCell>Projectart</TableCell>
                                        <TableCell>Professor</TableCell>
                                        <TableCell>Participator</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.rows.map(row=> (
                                        <TableRow key={row.id}>
                                            <TableCell> {row.project_name}</TableCell>
                                            <TableCell> {row.project_type}</TableCell>
                                            <TableCell> {row.professor}</TableCell>
                                            <TableCell> <Button variant="outlined">Participator</Button></TableCell>
                                        </TableRow>
                                    ))}
                               </TableBody>
                            </Table>
                        </TableContainer>
                     </Grid>
				</Container>
		    </div>
		);
	}
}
export default ApprovedProjects;