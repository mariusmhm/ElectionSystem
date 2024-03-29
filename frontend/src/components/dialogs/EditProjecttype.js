import React, {Component} from 'react';
import {Dialog,
    DialogTitle,
    FormControl,
    Button,
    Grid,
    TextField,
    Table,
    TableHead,
    TableCell,
    TableBody,
    TableContainer,
    TableRow,
    Typography
    } from'@material-ui/core';
import {withStyles} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import ElectionSystemAPI from '../../api/ElectionSystemAPI';
import ProjecttypeBO from '../../api/ProjecttypeBO';


/**Creates a new Projecttype as an projecttypeBO**/
class EditProjecttype extends Component {

  constructor(props){
    // Init an today date
    let today = new Date(),
    date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    super(props)

    // Init an empty state
    this.state= {
        creationDate: date,
        projecttypename:'',
        openp:null,
        ect:null,
        sws:null,
        projecttypes: [],
        projecttype: {},
        deletingError: null,
        error: null,

    };// save this state for canceling
        this.baseState = this.state;
  }
    /*get all projecttypes */
    getAllProjecttypes = () => {
            ElectionSystemAPI.getAPI().getAllProjecttypes()
            .then(projecttypesBOs =>
                this.setState({ // Set new state when ProjecttypeBOs have been fetched
                    projecttypes: projecttypesBOs,
                    error: null
                })).catch(e =>
                    this.setState({ //Reset state with error from catch
                        projecttypes:[],
                        error: e
                    }))
        }
 /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
   componentDidMount(){
        this.getAllProjecttypes();
   }

  /** Deletes this projecttype */
   deleteProjecttypeHandler = (projecttype) => {
        ElectionSystemAPI.getAPI().deleteProjecttype(projecttype.getID())
        .catch(e =>
          this.setState({ // Reset state with error from catch
            deletingError: e
          })
        );

        this.setState({
          projecttypes: this.state.projecttypes.filter(projecttypeFromState => projecttypeFromState.getID() !== projecttype.getID())
          // Set new state when projecttypeBOs have been fetched
        })
    }

/** Adds the Keycompetence */
    addProjecttype = () => {
        let newProjecttype = new ProjecttypeBO();
        newProjecttype.setName(this.state.projecttypename);
        newProjecttype.setDate(this.state.creationDate);
        newProjecttype.setSws(this.state.sws);
        newProjecttype.setEcts(this.state.ect);
        ElectionSystemAPI.getAPI().addProjecttype(newProjecttype).then(projecttypeBO => {
           // Backend call sucessfull
         // reinit the dialogs state for a new empty keycompetence
            this.setState(this.baseState);
            this.getAllProjecttypes();

        }).catch(e => //Reset state with error from catch
            this.setState({
                error: e
            }))

    }

  /** Handles value changes of the forms textfields as numbers and validates them */
   handleNumChange = (e) =>{
       this.setState({
            [e.target.id]: parseInt(e.target.value, 10)
        });

    }
 /** Handles value changes of the forms textfields and validates them */
  handleChange = (e) =>{
        this.setState({
            [e.target.id]: e.target.value
        });
    }





 render(){
    const { classes } = this.props;

  return (

      <Dialog open={this.props.openp} onClose={this.props.closeProjecttype} fullWidth maxWidth='sm'>
            <DialogTitle fontcolor='primary' className={classes.dialogHeader}>EDIT PROJECTTYPE</DialogTitle>
            <Grid container spacing={2}  direction="column" justify="center" alignItems="center" className={classes.grid}>
            <Grid item>
                <Typography className={classes.redHeader}>Project Types</Typography>
            </Grid>
            <Grid item>
            <TableContainer className={classes.tb}>
                 <Table>
                      <TableHead>
                           <TableRow>
                                 <TableCell> Project Type Name</TableCell>
                                 <TableCell> ECTS </TableCell>
                                 <TableCell> SWS </TableCell>
                                 <TableCell> Delete </TableCell>
                           </TableRow>
                      </TableHead>
                        <TableBody>
                            {this.state.projecttypes.map(projecttype=> (
                                  <TableRow key={projecttype.getID()} projecttype={projecttype}>
                                          <TableCell >{projecttype.getName()} </TableCell>
                                          <TableCell >{projecttype.getEcts()} </TableCell>
                                          <TableCell >{projecttype.getSws()}</TableCell>
                                          <TableCell>
                                                <Button aria-label="delete"  variant="outlined" onClick={() => this.deleteProjecttypeHandler(projecttype)}>
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
            <FormControl fullWidth onSubmit={this.handleSubmit}  className={classes.FormControl}>
                <Grid container spacing={2} justify="center" align="center" >
                    <Grid item xs={12}>
                        <Typography className={classes.redHeader}>Add Project Type</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth variant="outlined" id="projecttypename"
                         label="Name:" onChange={this.handleChange} value={this.state.projecttypename}/>
                    </Grid>
                   <Grid item container direction="row" xs={12} spacing={2} justify="center" align="center">
                    <Grid item xs={3}>
                        <TextField fullWidth  variant ="outlined" id= "ect" label="ECTS" value={this.state.ect} onChange={this.handleNumChange}/>
                    </Grid>
                    <Grid item xs={3}>
                        <TextField fullWidth variant ="outlined" label="SWS" id="sws" value={this.state.sws} onChange={this.handleNumChange}/>
                    </Grid>
                    </Grid>
                    <Grid item>
                    <Button type="submit" variant="contained" color="primary" onClick={this.addProjecttype} >
                            Add
                    </Button>
                    </Grid>
                    <Grid item xs={12} align="center">
                    </Grid>
                    <Grid item >
                        <Button variant="outlined" color="primary" onClick={this.props.closeProjecttype}>
                            Close
                        </Button>
                    </Grid>
                    <Grid>
                        <br/>
                    </Grid>
                    <Grid item>
                        <Button type="submit" variant="contained" color="primary" onClick={this.props.closeProjecttype} >
                            Done
                        </Button>
                    </Grid>
            </Grid>
          </FormControl>

        </Dialog>
  );
}
}
const styles = theme => ({
    grid:{
        width: '100%',
        padding: theme.spacing(2)
    },
    dialogHeader:{
        textAlign: "center"
    },
    tb:{
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(4)
    },
    redHeader:{
        color: theme.palette.red,
        fontFamily: 'Arial',
        fontStyle: 'bold',
        fontSize: 15
    }
});


export default withStyles(styles)(EditProjecttype);
