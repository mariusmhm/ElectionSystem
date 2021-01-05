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

let open = true;

class EditProjecttype extends Component {

    constructor(props){
        super(props)
        this.state= {
        projecttypeName:'',
        modules:[],
        ect:'',
        sws:'',
        updatingError: null,
        deletingError: null,
        error: null,

        };
        this.baseState = this.state;
    }

    getAllModules = () => {
        ElectionSystemAPI.getAPI().getAllModules()
        .then(moduleBOs =>
            this.setState({
                modules: moduleBOs,
                error: null
            })).catch(e =>
                this.setState({
                    modules:[],
                    error: e
                }))
    }



     componentDidMount(){
        this.getAllModules();
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

     /*handleInputModuleChange=(event)=>{
        event.preventDefault()
        this.setState({
            module: event.target.value
        })
    } weiss nicht ob man das braucht*/


    selectHandleChangeModule = (e) =>{
        this.modules = this.state.modules[e.target.value].getName();
        this.setState({
            modules: this.state.modules[e.target.value]
        },
        function(){
            console.log(this.modules);
            console.log(this.state.moSelected);

        });
        /*this.showETCS = true;*/
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

    clearFormButtonClicked = () => {
    // Reset the Form
        this.setState({
          projecttypeName: [...this.state.projecttypeName],
          projecttypeName: '',
          ect: [...this.state.ect],
          ect: '',
          sws: [...this.state.sws],
          sws: '',
          modules: [...this.state.modules],
          modules: '',
    });
  }

   addProjecttype = () =>{
        let newProjecttype = new ProjecttypeBO(this.state.projecttype);
        ElectionSystemAPI.getAPI().addProjecttype(newProjecttype).then(projecttype => {
            this.setState(this.baseState);

        }).catch(e =>
            this.setState({
                updatingError: e
            }))
    }



 render(){
    const { projecttype, error } = this.state;
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
                           <TableRow>
                                    <TableCell> {this.state.projecttypeName}</TableCell>
                                   <TableCell> {this.state.module}</TableCell>
                                   <TableCell> {this.state.sws}</TableCell>
                                    <TableCell> {this.state.ect}</TableCell>
                                   <TableCell><IconButton aria-label="delete" onClick={() => this.deleteprojecttypeHandler(projecttype)}><DeleteIcon />
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
                        onChange={this.handleInputECTSChange} on={this.textFieldValueChange}/>
                    </Grid>
                    <Grid item xs={3}>
                        <TextField fullWidth variant="outlined" label="SWS" value={this.state.sws}
                        onChange={this.handleInputSWSChange}/>
                    </Grid>
                    </Grid>
                    <Grid item xs={6} justify='center'>
                        <FormControl fullWidth variant="outlined" onSubmit={this.handleSubmit}>
                            <InputLabel>Module</InputLabel>
                            <Select label="Module" onChange={this.selectHandleChangeModule}>
                                    {this.state.modules.map((modules, index) => (
                                        <MenuItem key={index} value={index}>{modules.getName()}</MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} align="center">
                        <Button
                        variant="outlined"
                        type="submit"
                        color="secondary" onClick={this.clearFormButtonClicked}>
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
                        variant="outlined" onClick={this.addProjecttype} >
                            Submit
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
