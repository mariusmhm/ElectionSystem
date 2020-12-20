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
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core';

/**
 * Renders a Project object within a ListEntry and provides a decline, delete, approve button. Links projects
 * to a list of projects. This is done by routing the link to /ProjekteGenehmigen and passing the ProjectBO and
 *  as props to the ProjekteGenehmigen component.
 *
 */

class ListEntryNeueProjekte extends Component {
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
                <Container maxWidth="md">
                    <CssBaseline />
                    <Typography variant='h4' color="secondary" className={classes.redHeader}>NEUE PROJEKTE</Typography>
                     <Grid item container
                            direction="column"
                            xs={12}
                            md={12}
                            spacing={2}
                            align="center"
                            className={classes.grid}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>PROJECT</TableCell>
                                        <TableCell>PROJECT TYPE</TableCell>
                                        <TableCell>PROFESSOR</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.rows.map(row=> (
                                        <TableRow key={row.id}>
                                            <TableCell> {row.project_name}</TableCell>
                                            <TableCell> {row.project_type}</TableCell>
                                            <TableCell> {row.professor}</TableCell>
                                            <TableCell> <Button color="gray" variant="outlined" className={classes.button}> Bewerten</Button> </TableCell>
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
/** PropTypes */
ListEntryNeueProjekte.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,

  /**
   * Event Handler function which is called after a sucessfull delete of this account.
   *
   * Signature: onAccountDeleted(AccountBO account);
   */

}

const styles = theme => ({
    grid:{
        width: '100%',
        margin: '0px',
        padding: theme.spacing(3)
    },
    button:{
        marginTop: theme.spacing(3)
    },
    redHeader:{
        color: theme.palette.red,
        fontFamily: 'Arial',
        fontStyle: 'bold',
        fontSize: 30
    }
});

export default withStyles(styles) (ListEntryNeueProjekte);
