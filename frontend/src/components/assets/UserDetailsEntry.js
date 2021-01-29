import React from 'react';
import { ElectionSystemAPI, UserBO } from '../../api';
import { TextField, Button, Grid, Typography } from '@material-ui/core';

class UserDetailsEntry extends React.Component {
    constructor(props){
        super(props);

        this.state = ({
            user: [],
            id: this.props.id,
            gid: this.props.gid,
            date: this.props.date,
            firstname: this.props.firstname,
            name: this.props.name,
            mail: this.props.mail,
            role: this.props.role,
            clicked: false
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleClick = () => {
        this.setState({
            clicked: true
        });
        this.updateUser();
    }

    updateUser = () => {
        if (this.state.clicked === true) {
            let userBO = new UserBO();
            userBO.setID(this.state.id);
            userBO.setGoogleID(this.state.gid);
            userBO.setDate(this.state.date);
            userBO.setFirstname(this.state.firstname);
            userBO.setName(this.state.name);
            userBO.setMail(this.state.mail);
            userBO.setRoleID(this.state.role === "Professor" ? 3 : 1);

            ElectionSystemAPI.getAPI().updateUser(userBO);
            window.alert("The User were succesfully updated");
        }
    }

    
    render(){
        return(
            <div>
                <Grid container maxWidth="md">
                    <Grid item xs={1}>
                        <Typography align="center" id="id" color="secondary" value={this.state.id} onChange={this.handleChange}><b>{this.state.id}</b></Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <TextField id="firstname" value={this.state.firstname} onChange={this.handleChange}/>
                    </Grid>
                    <Grid item xs={2}>
                        <TextField id="name" value={this.state.name} onChange={this.handleChange}/>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField fullWidth id="mail" value={this.state.mail} onChange={this.handleChange}/>
                    </Grid>
                    <Grid item xs={2}>
                        <TextField textAlign="right" id="role" value={this.state.role} onChange={this.handleChange}/>
                    </Grid>
                    <Grid item xs={1}>  
                        <Button fullWidth color="secondary" onClick={this.handleClick}>Update</Button>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default UserDetailsEntry;