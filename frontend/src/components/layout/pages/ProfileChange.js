import { Typography, Grid, Container, TextField, Button, MenuItem, Select, FormControl, InputLabel} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React from 'react';
import { ElectionSystemAPI } from '../../../api';



class ProfileChange extends React.Component {
    

    constructor(props){
        super(props);

        this.state = {
            error: null,
            show: true,
            searchid: 0,
            searchtype: '',
            student: [],
            user: [],
            creationDate: '',
            name: '',
            firstname: '',
            mail: '',
            matrikelnr: 0,
            study: '',
            searchButtonClicked: false,
            updateButtonClicked: false,
            loaded: false
        }
        this.baseState = this.state;

    }

    handleNavChange = (e) => {
        if (e.target.value === "student"){
            this.setState({
                searchtype: e.target.value,
                show: true
            })
        }else if (e.target.value !== "student"){
            this.setState({
                searchtype: e.target.value,
                show: false
            })
        } 
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSearchClick = () => {
        if (this.state.show === false) {
            ElectionSystemAPI.getAPI().getUser(this.state.searchid)
            .then(userBO => {
                this.setState({
                    searchButtonClicked: true,
                    user: userBO,
                    creationDate: userBO.getDate(),
                    name: userBO.getName(),
                    firstname: userBO.getFirstname(),
                    mail: userBO.getMail(),
                    loaded: true
                })
            }).catch(e => {
                this.setState({
                    user: [],
                    error: e
                })
            })
        }else {
            ElectionSystemAPI.getAPI().getStudent(this.state.searchid)
            .then(studentBO => {
                this.setState({
                    searchButtonCliked: true,
                    student: studentBO,
                    creationDate: studentBO.getDate(),
                    name: studentBO.getName(),
                    firstname: studentBO.getFirstname(),
                    mail: studentBO.getMail(),
                    matrikelnr: studentBO.getMatrikelNr(),
                    study: studentBO.getStudy(),
                    loaded: true
                })
            }).catch(e => {
                this.setState({
                    student: [],
                    error: e
                })
            })
        }
    }


    updateCurUser = () => {
        if (this.state.loaded === true) {
            let curUserBO = this.state.user;
            curUserBO.setName(this.state.name);
            curUserBO.setFirstname(this.state.firstname);
            curUserBO.setMail(this.state.mail);
            curUserBO.setDate(this.state.creationDate);

            ElectionSystemAPI.getAPI().updateUser(curUserBO)
            .then(this.setState({
                updated: true
            })).catch(e => {
                this.setState({
                    error: e
                })
            })
        }
    }


    render(){
        return(
            <div>
                <Container maxWidth="md">
                    <Grid container spacing={2}>
                        <Grid item xs={12} />
                        <Grid item xs={2}>
                            <FormControl  variant="outlined" fullWidth>
                                <InputLabel htmlFor="searchtype">Searchtype</InputLabel>
                                <Select id="searchtype" value={this.state.searchtype} onChange={this.handleNavChange}>
                                    <MenuItem value="student">Student</MenuItem>
                                    <MenuItem value="professor">Professor</MenuItem>
                                    <MenuItem value="admin">Admin</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={8}>
                            <TextField fullWidth id="searchid" value={this.state.searchid} onChange={this.handleChange} variant="outlined" label="Type in the ID"/>
                        </Grid>
                        <Grid item xs={2}>
                            <Button id="load" variant="contained" color="secondary" onClick={this.handleSearchClick}><b>Load {this.state.searchtype}</b></Button>
                        </Grid>
                        {this.state.searchButtonClicked ?
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    Users Creation Date:
                                    <TextField variant="outlined" value={this.state.loaded ? this.state.creationDate : null} />
                                </Grid>
                                <Grid item xs={6}>
                                    Users Unique ID:
                                    <TextField variant="outlined" value={this.state.loaded ? this.state.searchid : null} />
                                </Grid>
                                <Grid item xs={6}>
                                    Users Full Name:
                                    <TextField variant="outlined" id="name" onChange={this.handleChange} value={this.state.loaded ? this.state.name : null} />
                                    <TextField variant="outlined" id="firstname" onChange={this.handleChange} value={this.state.loaded ? this.state.firstname : null} />
                                </Grid>
                                <Grid item xs={6}>
                                    Users Mail Adress:
                                    <TextField variant="outlined" id="mail" onChange={this.handleChange} value={this.state.loaded ? this.state.mail : null} />
                                </Grid>
                                {this.state.show ? 
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            Students Matrikel Number:
                                            <TextField variant="outlined" id="matrikelnr" onChange={this.handleChange} value={this.state.loaded ? this.state.matrikelnr : null} />
                                        </Grid>
                                        <Grid item xs={6}>
                                            Students Study:
                                            <TextField variant="outlined" id="study" onChange={this.handleChange} value={this.state.loaded ? this.state.study : null} />
                                        </Grid>
                                    </Grid>
                                : null
                                }
                            </Grid>
                        : null
                        }
                        <Container>
                            <Grid container>
                                <Grid item xs={6}>
                                    <Button onClick={this.updateCurUser()} id="update" color="primary"  variant="outlined" label="Update">Update</Button>
                                </Grid>
                            </Grid>
                        </Container>
                        
                    </Grid>
                </Container>
            </div>
        )
    }

}

export default ProfileChange;