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
import {withStyles} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ElectionSystemAPI from '../../api/ElectionSystemAPI';
import ProjecttypeBO from '../../api/ProjecttypeBO';
import ModuleBO from '../../api/ModuleBO';

let open = true;

class EditProjecttype extends Component {

  constructor(props){
    super(props)
    this.state= {
        creationDate:'',
        projecttypename:'',
        modules:[],
        moSelected:null,
        ect:'',
        sws:'',
        projecttypes: [],
        projecttype: {},
        deletingError: null,
        error: null,

    };
        this.baseState = this.state;
  }

 getAllModules = () => {
   ElectionSystemAPI.getAPI().getAllModules().then(moduleBO =>
      this.setState({
           modules: moduleBO,
           loaded: true,
           error: null
           })).catch(e =>
           this.setState({
                modules:[],
                error: e
           }))
      console.log('ausgeführt');
   }

   componentDidMount(){
        this.getAllModules();
   }


    deleteProjecttypeHandler = (projecttype) => {
        console.log(projecttype);
        ElectionSystemAPI.getAPI().deleteProjecttype(projecttype.getID()).then(projecttype => {
          console.log(projecttype);
        }).catch(e =>
          this.setState({
            deletingError: e
          })
        );

        this.setState({
          projecttype: this.state.proejcttype.filter(projecttypeFromState => projecttypeFromState.getID() !== projecttype.getID())
        })
    }

    addProjecttype = () => {
        let newProjecttype = new ProjecttypeBO();
        newProjecttype.setDate(this.state.creationDate);
        newProjecttype.setName(this.state.projecttypname);
        newProjecttype.setEcts(this.state.ect);
        newProjecttype.setSws(this.state.sws);
        newProjecttype.setModule(this.state.moSelected);
        console.log(JSON.stringify(newProjecttype));
        console.log(this.state.creationDate)
        console.log('module:' + this.state.moSelected);
        ElectionSystemAPI.getAPI().addProjecttype(newProjecttype).then(projectBO => {
            this.setState(this.baseState);

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
    const {projecttype} = this.state;
    const { classes } = this.props;

  return (

      <Dialog open={open} fullWidth maxWidth='md'>
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
                             {this.state.projecttypes.map(ptyp => (
                                 <TableRow key={ptyp.getID()} ptyp={ptyp}>
                                      <TableCell> {ptyp.getName()}</TableCell>
                                      /*insert Module*/
                                      <TableCell> {ptyp.getEcts()}</TableCell>
                                      <TableCell> {ptyp.getSws()}</TableCell>
                                      <TableCell> <IconButton aria-label="delete"><DeleteIcon onClick={this.deleteProjecttypeHandler(ptyp)}/> </IconButton></TableCell>
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
                    <Grid item xs={6} justify='center'>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel>Module</InputLabel>
                            <Select label="moSelected" onChange={this.handleSelectChange}>
                                    {this.state.modules.map((module) => (
                                         <MenuItem key={module.getID()} value={module.getID()}>{module.getName()}</MenuItem>))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} align="center">
                    </Grid>
                    <Grid item >
                        <Button variant="outlined" color="secondary" onClick={this.handleClose}>
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
export default EditProjecttype;
