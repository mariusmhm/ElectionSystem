import React from 'react';
import { ElectionSystemAPI } from '../../../api';
import { Container, TableCell, Table, TableHead, TableRow, TableBody, Grid, Typography } from '@material-ui/core';

let studentid = 2;

class SemesterReport extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            participations: [],
            participation: [],
            project: [],
            prof: [],
            student: [],
            grading: [],
            projecttype: [],
            error: null,
            studentname: '',
            studentfname: '',
            studentnr: 0,
            gradeid: 0,
            ppid: 0,
            grade: 0,
            projectid: 0,
            projectname: '',
            profid: 0,
            profname: '',
            proffname: '',
            ptid: 0,
            ptname: '',
            ects: 0,
            sloaded: false,
            profloaded: false,
            loaded: false,
            gloaded: false,
            projectloaded: false,
            ptloaded: false,
            projects: []
        }
    }


    getParticipationProject = () => {
    }

    getParticipations = () => {
        if (this.state.loaded === false) {
            ElectionSystemAPI.getAPI().getParticipationsForStudent(studentid)
            .then(participationBO => {
                this.setState({
                    participations: participationBO,
                    loaded: true
                });
                this.getProjectStats();
            }).catch(e => this.setState({
                participation: [],
                error: e
            }))
        }
    }

    getProjects = () => {
        ElectionSystemAPI.getAPI().getAllProjects()
        .then(projectBO => {
            this.setState({
                projects: projectBO,
                projectloaded: true
            })
        }).catch(e => this.setState({
            projects: [],
            error: e
        }))
    }

    getProjectStats = (projectid) =>  {
        if (this.state.loaded === true) {
            ElectionSystemAPI.getAPI().getProject(projectid)
            .then(projectBO => {
                this.setState({
                    project: projectBO,
                    projectname: projectBO.getName(),
                    profid: projectBO.getProfessor(),
                    ptid: projectBO.getProjecttype(),
                    projectloaded: true
                });
                this.getProfessorStats();
                this.getProjecttypeStats();
            }, console.log("Project")).catch(e => this.setState({
                project: [],
                error: e
            }))
        }
    }

    getStudentStats = () => {
        ElectionSystemAPI.getAPI().getStudent(studentid)
            .then(studentBO => {
                this.setState({
                    student: studentBO,
                    studentname: studentBO.getName(),
                    studentfname: studentBO.getFirstname(),
                    studentnr: studentBO.getMatrikelNr(),
                    sloaded: true
                })
            }, console.log("Student")).catch(e => this.setState({
                student: [],
                error: e
            }))
        
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
            }, console.log("Professor")).catch(e => this.setState({
                professor: [],
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
                    ptloaded: true
                })
            }, console.log("Projecttype")).catch(e => this.setState({
                projecttype: [],
                error: e
            }))
        }
    }

    getGrade = () => {
        if (this.state.pploaded === true) {
            ElectionSystemAPI.getAPI().getGrade(this.state.ppid)
            .then(gradingBO => {
                this.setState({
                    grading: gradingBO,
                    grade: gradingBO.getGrade(),
                    gloaded: true
                })
            }, console.log("Grade")).catch(e => this.setState({
                grading: [],
                error: e
            }))
        }
    }

componentDidMount(){
    this.getParticipations();
    this.getStudentStats();
    /* this.getProfessorStats();
    this.getProjecttypeStats();
    this.getGrade(); */
}

    render() {
        return(
            <div>
                <Container maxWidth="md">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography align="center">
                                <h3>Semester Report for </h3>
                                <b>{this.state.sloaded ? this.state.studentfname : null} 
                                {this.state.sloaded ? this.studentname : null} </b>
                                ({this.state.sloaded ? this.state.studentnr : null})
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Projectname</TableCell>
                                        <TableCell>Professor</TableCell>
                                        <TableCell>Projecttype</TableCell>
                                        <TableCell>ECTS</TableCell>
                                        <TableCell>Grade</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.participations.map(participationBO => 
                                        
                                        <TableCell>
                                            {this.state.loaded ? this.getProjectStats(participationBO.getProjectID()) : null}
                                            {this.state.projectloaded ? this.state.projectname : null}
                                        </TableCell>
                                        )}
                                </TableBody>
                            </Table>
                        </Grid>
                    </Grid>
                </Container>
                

            </div>
        )
    }
}

export default SemesterReport;