import React from 'react';
import {ElectionSystemAPI, ParticipationBO} from '../../../api';
import { Grid, Typography, Avatar } from '@material-ui/core';


let participationid = 13;

class SemesterReport extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            participation: [],
            error: null,
            project: [],
            student: [],
            professor: [],
            projectid: 0,
            studentid: 0,
            gradeid: 0,
            profid: 0,
            projectname: '',
            projectdetails: '',
            studentname: '',
            studentfname: '',
            studentnr: 0,
            profname: '',
            proffname: '',
            companyname: '',
            grade: 0,
            loaded: false,
            sloaded: false,
            pploaded: false,
            profloaded: false
        }
    }
    

    getForeignKeys = () => {
        ElectionSystemAPI.getAPI().getParticipation(participationid)
        .then(participationBO => {
            this.setState({
                participation: participationBO,
                projectid: participationBO.getProjectID(),
                studentid: participationBO.getStudentID(),
                gradeid: participationBO.getGradingID(),
                pploaded: true
            })
            this.getProjectStats();
            this.getStudentStats();
        }).catch(e => this.setState({
            participation: [],
            error: e
        }))
    }

    getProjectStats = () => {
        if (this.state.pploaded == true) {
            ElectionSystemAPI.getAPI().getProject(this.state.projectid)
            .then(projectBO => {
                this.setState({
                    project: projectBO,
                    projectname: projectBO.getName(),
                    projectdetails: projectBO.getShortDescription(),
                    profid: projectBO.getProfessor(),
                    companyname: projectBO.getExternalPartner(),
                    loaded: true
                });
                this.getProfessorStats();
            }).catch(e => this.setState({
                project: [],
                error: e
            }), console.log(this.state.profid))
        }
    }

    getStudentStats = () => {
        if (this.state.pploaded == true){
            ElectionSystemAPI.getAPI().getStudent(this.state.studentid)
            .then(studentBO => {
                this.setState({
                    student: studentBO,
                    studentname: studentBO.getName(),
                    studentfname: studentBO.getFirstname(),
                    studentnr: studentBO.getMatrikelNr(),
                    sloaded: true
                })
            }).catch(e => this.setState({
                student: [],
                error: e
            }))
        }
    }

    getProfessorStats = () => {
        if (this.state.loaded == true) {
            ElectionSystemAPI.getAPI().getUser(this.state.profid)
            .then(userBO => {
                this.setState({
                    professor: userBO,
                    profname: userBO.getName(),
                    proffname: userBO.getFirstname(),
                    profloaded: true
                })
            }).catch(e => this.setState({
                professor: [],
                error: e
            }))
        }
    }

componentDidMount(){
    this.getForeignKeys();
    this.getProjectStats();
    this.getStudentStats();
    this.getProfessorStats();
}



    render() {
    
        return (
            <div>
                <Grid container justify={'center'}>
                    <Grid item xs={1}>
                        <Avatar variant="square" alt="logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/HdM_Logo.svg/2000px-HdM_Logo.svg.png" />
                    </Grid>
                    <Grid item xs={11}>
                        <Typography>
                            Professor: {this.state.profloaded ? this.state.profname : null}, {this.state.profloaded ? this.state.proffname : null}
                        </Typography>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default (SemesterReport);