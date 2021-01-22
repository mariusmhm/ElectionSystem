import React from 'react';
import { ElectionSystemAPI } from '../../../api';
import { Container, TableCell, Table, TableHead, TableRow, TableBody } from '@material-ui/core';

let studentid = 1;

class SemesterReport extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            participations: [],
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
            pploaded: false,
            profloaded: false,
            loaded: false,
            gloaded: false,
            projectloaded: false,
            ptloaded: false
        }
    }


    getForeignKeys = () => {
        ElectionSystemAPI.getAPI().getParticipationsForStudent(studentid)
        .then(participationBO => {
            this.setState({
                participations: participationBO,
                loaded: true
            })
        }).catch(e => this.setState({
            participation: [],
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
            }, console.log(this.state.projectname)).catch(e => this.setState({
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
            }).catch(e => this.setState({
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
            }).catch(e => this.setState({
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
            }).catch(e => this.setState({
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
    this.getGrade();
}

    render() {
        return(
            <div>
                <Container maxWidth="sm">
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
                            {this.state.participations.map(participation => 
                            <TableRow>
                                {this.getProjectStats(participation.getProjectID())}
                                <TableCell>
                                    {this.state.projectloaded ? this.state.projectname : null}
                                </TableCell>
                                <TableCell>

                                </TableCell>
                                <TableCell>
                                    
                                </TableCell>
                                <TableCell>
                                    
                                </TableCell>
                                <TableCell>
                                    
                                </TableCell>
                            </TableRow>
                        )}
                        </TableBody>
                    </Table>
                </Container>
                

            </div>
        )
    }
}

export default SemesterReport;