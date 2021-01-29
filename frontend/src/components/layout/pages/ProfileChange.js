import React from 'react';
import { ElectionSystemAPI } from '../../../api';
import { Container, Typography, Grid, Paper } from '@material-ui/core';
import UserDetailsEntry from '../../assets/UserDetailsEntry';
import StudentDetailsEntry from '../../assets/StudentDetailsEntry';

class ProfileChange extends React.Component {

    constructor(props){
        super(props);

        this.state = ({
            error: null,
            users: [],
            students: [],
            userLoaded: false,
            studentLoaded: false,
            filter: ''
        })
    }

    getAllUsers = () => {
        ElectionSystemAPI.getAPI().getAllUsers()
        .then(userBOs => {
            this.setState({
                users: userBOs,
                userLoaded: true
            })
        }).catch(e => {
            this.setState({
                users: [],
                error: e
            })
        })
    }

    getAllStudents = () => {
        ElectionSystemAPI.getAPI().getAllStudents()
        .then(studentBOs => {
            this.setState({
                students: studentBOs,
                studentLoaded: true
            })
        }).catch(e => {
            this.setState({
                students: [],
                error: e
            })
        })
    }

    componentDidMount() {
        this.getAllUsers();
        this.getAllStudents();
    }

    render() {
        return(
            <div>
                <Container maxWidth="md">
                    <Paper>
                    <Grid container maxWidth="md">
                        <Grid item xs={12} />
                        <Grid item xs={1}>
                            <Typography fullWidth align="right" id="id" color="primary"><b>ID</b></Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography fullWidth align="center" id="firstname" color="primary"><b>Firstname</b></Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography fullWidth align="center" id="name" color="primary"><b>Name</b></Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography fullWidth align="center" id="mail" color="primary"><b>Mail Adress</b></Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography fullWidth align="left" id="role" color="primary"><b>Role</b></Typography>
                        </Grid>
                        <Grid item xs={1} />
                    </Grid>
                    {this.state.users.map(userBO => (
                        <ul>
                            <Paper>
                            <UserDetailsEntry 
                                id={userBO.getID()}
                                gid={userBO.getGoogleID()}
                                date={userBO.getDate()}
                                firstname={userBO.getFirstname()}
                                name={userBO.getName()}
                                mail={userBO.getMail()}
                                role={userBO.getRoleID() === 1 ? "Admin" : "Professor"} 
                            />
                            </Paper>
                        </ul>
                    ))}
                    </Paper>
                    <Grid item xs={12} />
                    <Grid item xs={12} />
                    <Paper>
                    <Grid container maxWidth="md">
                        <Grid item xs={1}>
                            <Typography fullWidth align="right" id="matrikelnr" color="primary"><b>Matrikelnr</b></Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography fullWidth align="center" id="firstname" color="primary"><b>Firstname</b></Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography fullWidth align="center" id="name" color="primary"><b>Name</b></Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography fullWidth align="center" id="mail" color="primary"><b>Mail Adress</b></Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography fullWidth align="left" id="study" color="primary"><b>Study</b></Typography>
                        </Grid>
                        <Grid item xs={1} />
                    </Grid>
                    {this.state.students.map(studentBO => (
                        <ul>
                            <Paper>
                            <StudentDetailsEntry 
                                id={studentBO.getID()}
                                gid={studentBO.getGoogleID()}
                                date={studentBO.getDate()}
                                firstname={studentBO.getFirstname()}
                                name={studentBO.getName()}
                                mail={studentBO.getMail()}
                                role={studentBO.getRoleID() === 2 ? "Student" : null}
                                matrikelnr={studentBO.getMatrikelNr()}
                                study={studentBO.getStudy()} 
                            />
                            </Paper>
                        </ul>
                    ))}
                    </Paper>
                </Container>
            </div>
        )
    }
}
export default ProfileChange;
