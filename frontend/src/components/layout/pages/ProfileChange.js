import { Typography, Grid, Container, TextField, Button} from '@material-ui/core';
import React from 'react';
import { ElectionSystemAPI } from '../../../api';



class ProfileChange extends React.Component {
    

    constructor(props){
        super(props);

        this.state = {
            error: null,
            show: false,
            user: [],
            username: '',
            userfname: '',
            mail: '',
            study: '',
            matrikelnr: null,
            role: 0,
            userloaded: false
        }

    }


    getCurUserStats = () => {
        ElectionSystemAPI.getAPI().getUser(1)
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

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
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
    this.getCurUserStats();
}

    render(){
        return(
            <div>
                <Container maxWidth="xs">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            Navigation
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