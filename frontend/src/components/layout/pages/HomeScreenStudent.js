import React, { Component } from 'react';
import {Container} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import LinearProgress from '@material-ui/core/LinearProgress';
import {withStyles} from '@material-ui/core';
import HomeScreenCompOne from './HomeScreenCompOne';
import HomeScreenCompTwo from './HomeScreenCompTwo';
import { ElectionSystemAPI } from '../../../api';





class HomeScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            election: null,
            electionLoaded: false
        }
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
                    <HomeScreenCompOne {...this.props}/>  
                    <HomeScreenCompTwo {...this.props}/>
                      
                      
                      
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
