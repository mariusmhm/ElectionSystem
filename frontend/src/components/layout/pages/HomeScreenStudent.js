import React, { Component } from 'react';
import {Container} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import LinearProgress from '@material-ui/core/LinearProgress';
import {withStyles} from '@material-ui/core';
import StudentSelectedProjects from './StudentSelectedProjects';
import StudentAfterElection from './StudentAfterElection';
import { ElectionSystemAPI } from '../../../api';


class HomeScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            election: null,
            electionLoaded: false
        }

        this.reload = this.reload.bind(this);
    }

    getAllSemester = () => {

        ElectionSystemAPI.getAPI().getAllSemester()
        .then(semesterBO => {
            this.setState({
                election: semesterBO.getElection(),
                electionLoaded: true
            })
        })
        .catch(e =>
            this.setState({
                error: e,
            })
            )
    }

    reload(){
        console.log('Clicked');
        this.getAllSemester();
    }

    componentDidMount(){
        
        this.getAllSemester();
      }

  render() {

    
    const {election, electionLoaded } = this.state;
    const {classes}= this.props;

        return (

            <div className={classes.headGrid}>
                
                {electionLoaded ? 
                <>
                 <CssBaseline />

                  <Container maxWidth="md">
                      {election ? <StudentSelectedProjects reload ={this.reload} {...this.props}/> : <StudentAfterElection reload ={this.reload}  {...this.props}/>}

				  </Container>
                </>

                : <LinearProgress color="secondary" />
                
                }
		    </div>
		);
	}
}

const styles = theme => ({
    headGrid:{
        marginTop: theme.spacing(10),
        marginBottom: theme.spacing(12)
    }})
export default withStyles(styles) (HomeScreen);
