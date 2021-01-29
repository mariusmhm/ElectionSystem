import React, {Component} from 'react';
import { ElectionSystemAPI } from '../../../api';


class HomeScreenProf extends Component {
    constructor(props){
        super(props)
        this.state ={
            user = 1,

        }
    
    this.baseState = this.state;
    
    };

    getProjectForProfessor = () => {
        ElectionSystemAPI.getAPI().getProjectForProfessor(this.state.user)

        .then(ProjectBO =>
            this.setState({
                projects: ProjectBO,
                error: null
            }))
        .then(this.getAllParticipationsForProject)
        .catch(e =>
            this.setState({
                projects: [],
                error: e
            }))

    }

    getAllParticipationsForProject = () =>{
        this.state.projects.forEach(project => 
            ElectionSystemAPI.getAPI().getAllParticipationsForProject(project)
                .then(
                    this.setState(prev => ({
                        participations: [...prev.participations, project]
                    }))
                )
            )
    }

    componentDidMount(){
        this.getProjectForProfessor();
    }


    render () {
        const
    }


}

