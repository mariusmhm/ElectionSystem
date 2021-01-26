import { Typography, Grid, Container, TextField, Button, Tabs, Tab, MenuItem, Select, FormControl, InputLabel} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import React from 'react';
import { ElectionSystemAPI } from '../../../api';



class ProfileChange extends React.Component {
    

    constructor(props){
        super(props);

        this.state = {
            error: null,
            show: true,
            searchtype: '',
            value: 'students',
            students: [],
            users: [],
            username: '',
            userfname: '',
            mail: '',
            study: '',
            matrikelnr: null,
            role: 0,
            userloaded: false,
            searchButtonClicked: false,
            updateButtonClicked: false,
            usersloaded: false,
            studentsloaded: false
        }

    }

    getAllUser = () => {
        ElectionSystemAPI.getAPI().getAllUsers()
        .then(userBOs => {
            this.setState({
                users: userBOs,
                usersloaded: true
            })
        }).catch(e => {
            this.setState({
                users: [],
                error: e
            })
        })
    }

    getAllStudent = () => {
        ElectionSystemAPI.getAPI().getAllStudents()
        .then(studentBOs => {
            this.setState({
                students: studentBOs,
                studentsloaded: true
            })
        }).catch(e => {
            this.setState({
                students: [],
                error: e
            })
        })
    }

    getUserStats = (userid) => {
        ElectionSystemAPI.getAPI().getUser(userid)
        .then(userBO => {
            this.setState({
                user: userBO,
                username: userBO.getName(),
                userfname: userBO.getFirstname(),
                mail: userBO.getMail(),
                role: userBO.getRole(),
                userloaded: true
            })
        }).catch(e => {
            this.setState({
                user: [],
                error: e
            })
        })
    }

    handleNavChange = (e) => {
            this.setState({
                value: e.target.value,
                show: true
            }, console.log(this.state.value))
    }

    handleSearchChange = (e) => {
        this.setState({
            searchtype: e.target.value
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSearchClick = () => {
        this.setState({
            searchButtonClicked: true
        });
    }

    updateCurUser = () => {
        if (this.state.userloaded === true) {
            let curUserBO = this.state.user;
            curUserBO.setName(this.state.username);
            curUserBO.setFirstname(this.state.userfname);
            curUserBO.setMail(this.state.mail);


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

componentDidMount(){
    this.getAllUser();
    this.getAllStudent();
}

    render(){
        return(
            <div>
                <Container maxWidth="md">
                    <Grid container spacing={2}>
                        <Grid item xs={12} alignItems="center">
                            <Tabs value={this.state.value} onChange={this.handleNavChange}>
                                <Tab value="students" label="Students" />
                                <Tab value="profadmin" label="Professor / Admins" />
                            </Tabs>
                        </Grid>
                        <Grid item xs={2}>
                            {console.log(this.state.studentsloaded ? this.state.students : null)}
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel>Searchtype</InputLabel>
                                <Select value={this.state.searchtype} onChange={this.handleSearchChange}>
                                    <MenuItem value="getName()">Name</MenuItem>
                                    <MenuItem value="matrikelnr">Matrikelnr</MenuItem>
                                    <MenuItem value="mail">Mail-Adress</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={8}>
                            <Autocomplete
                            id="search"
                            options={this.state.show ? this.state.students : this.state.users}
                            getOptionLabel={(option) => option.this.state.searchtype}
                            renderInput={(params) => <TextField {...params} label="Find the right Person" variant="outlined"/>}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <Button fullWidth variant="contained" color="secondary" size="large" onClick={this.handleSearchClick}>Submit</Button>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField variant="outlined" id="username" onChange={this.handleChange} value={this.state.userloaded ? this.state.username : null} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField variant="outlined" id="userfname" onChange={this.handleChange} value={this.state.userloaded ? this.state.userfname : null} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField variant="outlined" id="mail" onChange={this.handleChange} value={this.state.userloaded ? this.state.mail : null} />
                        </Grid>
                        <Grid item xs={6}>
                            <Button onClick={this.updateCurUser()} variant="outlined" label="Update" />
                        </Grid>
                        <Grid item xs={6}>
                            
                        </Grid>
                        <Grid item xs={6}>
                            
                        </Grid>
                    </Grid>
                </Container>
            </div>
        )
    }

}

export default ProfileChange;