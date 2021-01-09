import React, {Component} from 'react';
import {Dialog,
    DialogTitle,
    MenuItem,
    Select,
    InputLabel,
    TextField,
    FormControl,
    Button,
    Grid,
    Typography} from'@material-ui/core';
import {withStyles} from '@material-ui/core';
import ElectionSystemAPI from '../../api/ElectionSystemAPI';
import ProjecttypeBO from '../../api/ProjecttypeBO';
import ModuleBO from '../../api/ModuleBO';
import ProjectBO from '../../api/ProjectBO';

let open = true;

class KeyCompetence extends Component {
 constructor(props) {
      super(props);

      /*const pt='';
      const showETCS = false;*/

      this.state = {
        modules: [],
        edvNumber: '',
        projecttypes: [],
        numSpots: '',
        additionalProfessor: [],
        shortDescription: '',
        language: '',
        ptSelected: {},
        moSelected:{},
        laSelected:{},
        addingInProgress: false,
        addingError: null,
        error: null
      }
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
        this.getAllProjecttypes();
        this.getAllModules();
    }



    addKeyCompetence = () => {
        let newProject = new ProjectBO(this.state.projects);
        ElectionSystemAPI.getAPI().addProject(newProject).then(module => {
            this.setState(this.baseState);

        }).catch(e =>
            this.setState({
                updatingError: e
            }))
    }


     selectHandleChangeProjecttype = (e) =>{
        this.pt = this.state.projecttypes[e.target.value].getName();
        this.setState({
            ptSelected: this.state.projecttypes[e.target.value]
        },
        function(){
            console.log(this.pt);
            console.log(this.state.ptSelected);

        });
        this.showETCS = true;
    }

     selectHandleChangeModule = (e) =>{
        this.modules = this.state.modules[e.target.value].getName();
        this.setState({
            moSelected: this.state.modules[e.target.value]
        },
        function(){
            console.log(this.modules);
            console.log(this.state.moSelected);

        });
        /*this.showETCS = true;*/
    }


     selectHandleChangelanguage = (e) =>{
        this.language = this.state.language[e.target.value];
        this.setState({
            laSelected: this.state.language[e.target.value]
        },
        function(){
            console.log(this.language);
            console.log(this.state.laSelected);

        });

    }




  handleClose = () => {
        this.setState({
          open: false
        });
  }


  addProject = () => {
    let newProject = new ProjectBO(
    this.state.projecttypes, this.state.numSpots, this.state.shortDescription, this.state.language , this.state.additionalProfessor);
    ElectionSystemAPI.getAPI().addProject(newProject).then(project => {
      // Backend call sucessfull
      // reinit the dialogs state for a new empty customer
      this.setState(this.baseState);
      this.props.onClose(project); // call the parent with the customer object from backend
    }).catch(e =>
      this.setState({
        addingInProgress: false,    // disable loading indicator
        addingError: e              // show error message
      })
    );
    // set loading to true
    this.setState({
      addingInProgress: true,       // show loading indicator
      addingError: null             // disable error message
    });
  }






 render(){
    const { classes } = this.props;
    const { modules, edvNumber, projecttypes, numSpots, additionalProfessor, shortDescription, language,
            moSelected, ptSelected, laSelected} = this.state;
    return(

        <Dialog open={open} fullWidth maxWidth='md'>
            <DialogTitle fontcolor='primary'className={classes.dialogHeader}>CREATE KEY COMPETENCE</DialogTitle>
            <Grid container spacing={2} justify="center" driection="row" className={classes.grid} >

                <Grid item container direction="column" xs={12} md={6} spacing={2}>
                    <Grid item>
                        <FormControl fullWidth variant="outlined" className={classes.FormControl}>
                            <InputLabel>Module</InputLabel>
                            <Select label="Module" onChange={this.selectHandleChangeModule}>
                                    {this.state.modules.map((modules, index) => (
                                        <MenuItem key={index} value={index}>{modules.getName()}</MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <TextField fullWidth variant="outlined" label="EDV-number:" onChange= {this.textFieldValueChange}
                        value={edvNumber} />
                    </Grid>
                    <Grid item>
                           <FormControl fullWidth variant="outlined" className={classes.FormControl}>
                                <InputLabel>Project type</InputLabel>
                                <Select label="Projecttype" onChange={this.selectHandleChangeProjecttype}>
                                    {this.state.projecttypes.map((ptype, index) => (
                                        <MenuItem key={index} value={index}>{ptype.getName()}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                    </Grid>
                    <Grid item container justify="space-between">
                        <Grid item>
                            <Typography>ETCS:{this.showETCS ? this.state.ptSelected.getEcts() : null}</Typography>
                        </Grid>
                        <Grid item>
                        <Typography>SWS: {this.showETCS ? this.state.ptSelected.getSws() : null}</Typography>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <FormControl fullWidth variant="outlined" className={classes.FormControl}>
                        <InputLabel>Number of spots</InputLabel>
                            <Select label="Particpiant" value={numSpots} >
                                <MenuItem>none</MenuItem>
                                <MenuItem>1</MenuItem>
                                <MenuItem>2</MenuItem>
                                <MenuItem>3</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl fullWidth variant="outlined" className={classes.FormControl}>
                        <InputLabel>Additional professors</InputLabel>
                            <Select label="Professoren" value={additionalProfessor} /* funktion*/ >
                                <MenuItem>Susanne Stingel</MenuItem>
                                <MenuItem>Mike Friedrichsen</MenuItem>
                                <MenuItem>Martin Engstler</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl fullWidth variant="outlined" className={classes.FormControl}>
                            <InputLabel>Language</InputLabel>
                            <Select label="Sprache" onChange={this.selectHandleChangelanguage} value={this.state.language} >
                                <MenuItem>none</MenuItem>
                                <MenuItem>german</MenuItem>
                                <MenuItem>english</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <TextField fullWidth variant="outlined" onChange={this.textFieldValueChange} multiline rows={10} label="Short description:" value={shortDescription} />
                    </Grid>
                    <Grid item xs={12} align="center">
                <Grid item>
                    <Button variant="outlined" onClick={this.handleClose}>Cancel</Button>
                </Grid>
                </Grid>
                <Grid item xs={12} align="center">
                <Grid item>
                    <Button variant="contained" color="primary" onClick={this.addKeyCompetence}>Submit</Button>
                </Grid>
                </Grid>
                </Grid>



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
    }
});


export default withStyles(styles)(KeyCompetence);