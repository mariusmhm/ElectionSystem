import React from 'react';
import {ElectionSystemAPI} from '../../../api';
import { Button, Grid, Typography, Container } from '@material-ui/core';


let participationid = 3;

class ProjectReport extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            participation: [],
            error: null,
            project: [],
            student: [],
            professor: [],
            addprof: [],
            projecttype: [],
            ptid: 0,
            projectid: 0,
            studentid: 0,
            gradeid: 0,
            profid: 0,
            addprofid: 0,
            projectname: '',
            projectdetails: '',
            projectlang: '',
            studentname: '',
            studentfname: '',
            studentnr: 0,
            profname: '',
            proffname: '',
            addprofname: '',
            addproffname: '',
            companyname: '',
            grade: 0,
            ects: 0,
            sws: 0,
            ptname: '',
            loaded: false,
            sloaded: false,
            pploaded: false,
            profloaded: false,
            aprofloaded: false,
            ptloaded: false
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
            this.getGrade();
        }).catch(e => this.setState({
            participation: [],
            error: e
        }))
    }

    getProjectStats = () => {
        if (this.state.pploaded === true) {
            ElectionSystemAPI.getAPI().getProject(this.state.projectid)
            .then(projectBO => {
                this.setState({
                    project: projectBO,
                    projectname: projectBO.getName(),
                    projectdetails: projectBO.getShortDescription(),
                    projectlang: projectBO.getLanguage(),
                    profid: projectBO.getProfessor(),
                    addprofid: projectBO.getAddProfessor(),
                    companyname: projectBO.getExternalPartner(),
                    ptid: projectBO.getProjecttype(),
                    loaded: true
                });
                this.getProfessorStats();
                this.getAddProfStats();
                this.getProjecttypeStats();
            }).catch(e => this.setState({
                project: [],
                error: e
            }), console.log(this.state.profid))
        }
    }

    getStudentStats = () => {
        if (this.state.pploaded === true){
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
        if (this.state.loaded === true) {
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

    getAddProfStats = () => {
        if (this.state.loaded === true) {
            ElectionSystemAPI.getAPI().getUser(this.state.addprofid)
            .then(userBO => {
                this.setState({
                    addprof: userBO,
                    addprofname: userBO.getName(),
                    addproffname: userBO.getFirstname(),
                    aprofloaded: true
                })
            }).catch(e => this.setState({
                addprof: [],
                error: e
            }))
        }
    }

    getProjecttypeStats = () => {
        if (this.state.loaded === true) {
            ElectionSystemAPI.getAPI().getProjecttype(this.state.ptid)
            .then(ptBO => {
                this.setState({
                    projecttype: ptBO,
                    ptname: ptBO.getName(),
                    ects: ptBO.getEcts(),
                    sws: ptBO.getSws(),
                    ptloaded: true
                })
            }).catch(e => this.setState({
                projecttype: [],
                error: e
            }))
        }
    }

    getGrade = () => {
        if (this.state.pploaded === true) {
            ElectionSystemAPI.getAPI().getGrade(this.state.gradeid)
            .then(gradingBO => {
                this.setState({
                    grading: gradingBO,
                    grade: gradingBO.getGrade(),
                    gloaded: true
                })
            }).catch(e => this.setState({
                grading: [],
                error: e
            }))
        }
    }

componentDidMount(){
    this.getForeignKeys();
    this.getProjectStats();
    this.getStudentStats();
    this.getProfessorStats();
    this.getProjecttypeStats();
    this.getGrade();
    this.getAddProfStats();
}

    render() {
    
        return (
            <div>
                <Container maxWidth="sm">
                    <Grid container spacing={2}>
                        <Grid item xs={12} align="center">
                            <Typography>
                                <h2>Project: {this.state.loaded ? this.state.projectname : null}</h2>
                                <b>Semester Report for</b> 
                                <br></br><b>{this.state.sloaded ? this.state.studentfname : null} {this.state.sloaded ? this.state.studentname : null}</b>
                                <br></br>Studentnr.: {this.state.sloaded ? this.state.studentnr : null}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>
                                <br></br><b>Short Project Description: </b> <br></br>
                                {this.state.loaded ? this.state.projectdetails : null}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>
                                <br></br><b>Projecttype:</b> {this.state.ptloaded ? this.state.ptname : null}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>
                                <br></br><b>Professor:</b> {this.state.profloaded ? this.state.profname : null}, {this.state.profloaded ? this.state.proffname : null}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>
                                <b>ECTS:</b> {this.state.ptloaded ? this.state.ects : null}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>
                                <b>Add. Professor:</b> {this.state.aprofloaded ? this.state.addprofname : null}, {this.state.aprofloaded ? this.state.addproffname : null}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>
                                <b>SWS:</b> {this.state.ptloaded ? this.state.sws : null}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>
                                <b>External Partner:</b> {this.state.loaded ? this.state.companyname : null}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>
                                <b>Language:</b> {this.state.loaded ? this.state.projectlang : null}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography>
                                <b>Grade:</b> {this.state.gloaded ? this.state.grade : null}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} align="center">
                            <Button variant="contained" color="primary" onClick={window.print}>Print</Button>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        )
    }
}

export default ProjectReport;
