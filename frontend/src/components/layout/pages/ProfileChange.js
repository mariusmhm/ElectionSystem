import React from 'react';
import { ElectionSystemAPI } from '../../../api';
import { Container, Typography, Grid, Paper, withStyles } from '@material-ui/core';
import UserDetailsEntry from '../../assets/UserDetailsEntry';
import StudentDetailsEntry from '../../assets/StudentDetailsEntry';

class ProfileChange extends React.Component {

    constructor(props){
        super(props);

        // Init the state
        this.state = ({
            error: null,
            users: [],
            students: [],
            userLoaded: false,
            studentLoaded: false,
            filter: ''
        })
    }

    // get all users from api
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


    // get all students from api
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
                    <Grid container maxWidth="md" spacing={2} className={this.props.classes.grid}>
                        <Grid item xs={12}>
                            <h2>Professors and Admins</h2>
                            <h4><i>You have to click "OK" when the Pop-Up comes up to update!</i></h4>
                        </Grid>
                        <Grid item xs={1}>
                            <Typography fullWidth align="center" id="id" color="primary"><b>ID</b></Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography fullWidth align="left" id="firstname" color="primary"><b>Firstname</b></Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography fullWidth align="left" id="name" color="primary"><b>Name</b></Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography fullWidth align="left" id="mail" color="primary"><b>Mail Adress</b></Typography>
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
                    <Paper>
                    <Grid container maxWidth="md" spacing={2} className={this.props.classes.grid}>
                        <Grid item xs={12}>
                            <h2>Students</h2>
                            <h4><i>You have to click "OK" when the Pop-Up comes up to update!</i></h4>
                        </Grid>
                        <Grid item xs={1}>
                            <Typography fullWidth align="center" id="id" color="primary"><b>ID</b></Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography fullWidth align="left" id="firstname" color="primary"><b>Firstname</b></Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography fullWidth align="left" id="name" color="primary"><b>Name</b></Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography fullWidth align="left" id="mail" color="primary"><b>Mail Adress</b></Typography>
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

const styles = theme => ({
    grid:{
        width: '100%',
        marginTop: theme.spacing(10),
        margin: theme.spacing(3)
    }
})

export default withStyles(styles) (ProfileChange);
