import React, { Component } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from "@material-ui/core";
import {ExpandMoreIcon} from '@material-ui/icons/ExpandMore';

import { ElectionSystemAPI, ProjectBO, ParticipationBO, ProjecttypeBO } from '../../api';



class TableEntry extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tableData: [],
            projects: [],
            projecttypes: [],
            error: null,
            priority: '',
            updatingError: null,
            deletingError: null,
            loaded: null,
            id: null,



            


        };
        this.baseState = this.state;
        
        
    }

        /** Gives back the project */
        getProjectForProjecttype = () => {
            ElectionSystemAPI.getAPI().getProjectForProjecttype(this.props.id)
                .then(projectBO =>
                    this.setState({
                        projects: projectBO,
                        loaded: true,
                        error: null
                    })).catch(e =>
                        this.setState({
                            projects: [],
                            error: e
                        }))
            console.log('Project ausgeführt');
        }
    
        /** Gives back the projecttype */
        getAllProjecttypes = () => {
            ElectionSystemAPI.getAPI().getAllProjecttypes()
                .then(ProjecttypeBO =>
                    this.setState({
                        projecttypes: ProjecttypeBO,
                        loaded: true,
                        error: null
                    })).catch(e =>
                        this.setState({
                            projecttypes: [],
                            error: e
                        }))
            console.log('Projecttype ausgeführt');
        }
    
        componentDidMount() {
            this.getProjectForProjecttype();
            this.getAllProjecttypes();
        }
        

        render (){
            
            return(
                <Grid item xs={12} spacing={3}>
                {this.state.projects.map(project=>(
                    <Grid>
                        <Accordion>
                            <AccordionSummary >
                            {project.getName()}
                            
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Beschreibung: {project.getID()}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                            
                    </Grid>
                    
                ))}
                </Grid>
            )
        }



}
export default (TableEntry);