import React from 'react';
import { ElectionSystemAPI, StudentBO } from '../../api';
import { TextField, Button, Grid, Typography } from '@material-ui/core';

class StudentDetailsEntry extends React.Component {
    constructor(props){
        super(props);

        this.state = ({
            student: [],
            id: this.props.id,
            gid: this.props.gid,
            date: this.props.date,
            firstname: this.props.firstname,
            name: this.props.name,
            mail: this.props.mail,
            role: this.props.role,
            matrikelnr: this.props.matrikelnr,
            study: this.props.study,
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
        }, this.updateStudent());
    }

    updateStudent = () => {
        if (this.state.clicked === true) {
            let studentBO = new StudentBO();
            studentBO.setID(this.state.id);
            studentBO.setGoogleID(this.state.gid);
            studentBO.setDate(this.state.date);
            studentBO.setFirstname(this.state.firstname);
            studentBO.setName(this.state.name);
            studentBO.setMail(this.state.mail);
            studentBO.setRoleID(this.state.role === "Student" ? 2 : null);
            studentBO.setMatrikelNr(this.state.matrikelnr);
            studentBO.setStudy(this.state.study);

            ElectionSystemAPI.getAPI().updateStudent(studentBO);
            window.alert("The Student were succesfully updated");
        }
    }

    
    render(){
        return(
            <div>
                <Grid container maxWidth="md">
                    <Grid item xs={1}>
                        <Typography align="center" id="matrikelnr" color="secondary" value={this.state.matrikelnr} onChange={this.handleChange}><b>{this.state.matrikelnr}</b></Typography>
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
                        <TextField textAlign="right" id="study" value={this.state.study} onChange={this.handleChange}/>
                    </Grid>
                    <Grid item xs={1}>  
                        <Button fullWidth color="secondary" onClick={this.handleClick}>Update</Button>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default StudentDetailsEntry;