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
import {withStyles} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import ElectionSystemAPI from '../../api/ElectionSystemAPI';
import ProjecttypeBO from '../../api/ProjecttypeBO';



class EditProjecttype extends Component {

  constructor(props){
    super(props)
    this.state= {
        creationDate:'',
        projecttypename:'',
        ect:'',
        sws:'',
        open:null,
        projecttypes: [],
        projecttype: {},
        deletingError: null,
        error: null,

    };
        this.baseState = this.state;
  }

    getAllProjecttypes = () => {
            ElectionSystemAPI.getAPI().getAllProjecttypes()
            .then(projecttypesBOs =>
                this.setState({
                    projecttypes: projecttypesBOs,
                    error: null
                })).catch(e =>
                    this.setState({
                        projecttypes:[],
                        error: e
                    }))
        }

   componentDidMount(){
        this.getAllProjecttypes();
   }

   deleteProjecttypeHandler = (projecttype) => {
        console.log(projecttype);
        ElectionSystemAPI.getAPI().deleteProjecttype(projecttype.getID()).then(projecttype=> {
          console.log(projecttype);
        }).catch(e =>
          this.setState({
            deletingError: e
          })
        );

        this.setState({
          projecttype: this.state.projecttypes.filter(projecttypeFromState => projecttypeFromState.getID() !== projecttype.getID())
        })
    }

    addProjecttype = () => {
        let newProjecttype = new ProjecttypeBO();
        newProjecttype.setName(this.state.projecttypname);
        newProjecttype.setDate(this.state.creationDate);
        newProjecttype.setSws(this.state.sws);
        newProjecttype.setEcts(this.state.ect);
        console.log(JSON.stringify(newProjecttype));
        console.log(this.state.creationDate);
        ElectionSystemAPI.getAPI().addProjecttype(newProjecttype).then(projecttypeBO => {
            this.setState(this.baseState).then(newProjecttype => {this.props.closeDialog()});

        }).catch(e =>
            this.setState({
                error: e
            }))

    }


    handleChange = (e) =>{
        console.log(e.target.value);
        console.log(e.target.id);
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleSelectChange = (e) =>{
        console.log(e.target.value);
        console.log(e.target.name);
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleClose = () => {
        this.setState({
          open: false
        });
    }



 render(){
    const {projecttypes, projecttype} = this.state;


  return (

      <Dialog open={this.props.open} onClose={this.props.closeDialog} fullWidth maxWidth='md'>
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
                                           <TableCell><Button aria-label="delete"  variant="outlined" onClick={() => this.deleteProjecttypeHandler(projecttype)}>
                                            <DeleteIcon fontSize="small"/></Button></TableCell>
                                  </TableRow>
                                  ))}
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
                        <TextField fullWidth variant="outlined" id="projecttypename"
                         label="Name:" onChange={this.handleChange} value={this.state.projecttypename}/>
                    </Grid>
                   <Grid item container direction="row" xs={12} spacing={2} justify="center" align="center">
                    <Grid item xs={3}>
                        <TextField fullWidth variant ="outlined" id= "ect" label="ECTS" value={this.state.ect} onChange={this.handleChange}/>
                    </Grid>
                    <Grid item xs={3}>
                        <TextField fullWidth variant="outlined" label="SWS" id="sws" value={this.state.sws} onChange={this.handleChange}/>
                    </Grid>
                    </Grid>
                    <Grid item xs={12} align="center">
                    </Grid>
                    <Grid item >
                        <Button variant="outlined" color="secondary" onClick={this.props.closeDialog}>
                            Close
                        </Button>
                    </Grid>
                    <Grid>
                        <br/>
                    </Grid>
                    <Grid item>
                        <Button type="submit" variant="outlined" onClick={this.addProjecttype} >
                            Add
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
        margin: '0px',
        padding: '20px'
    },
    dialogHeader:{
        textAlign: "center"
    }
});


export default withStyles(styles)(EditProjecttype);
