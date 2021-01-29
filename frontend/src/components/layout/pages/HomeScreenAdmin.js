import React, { Component } from 'react';
import {Container} from '@material-ui/core';
import ArchivedProjectsAdmin from './ArchivedProjectsAdmin';
import Divider from '@material-ui/core/Divider';
import {withStyles} from '@material-ui/core';
import ApprovedProjectsAdmin from './ApprovedProjectsAdmin';
import ListEntryNewProjectsAdmin from './ListEntryNewProjectsAdmin';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import { Redirect } from 'react-router';
import RejectedProjectsAdmin from './RejectedProjectsAdmin';
import AdminButtonBar from './AdminButtonBar';
import { ElectionSystemAPI } from '../../../api';


class HomeScreenAdmin extends Component {
    constructor(props) {
        super(props);

        // Init the state
        this.state = {
            googleID: null,
            redirect: false,
            error: null,
            openDialog: false,
            duringSemester: false,
        };
    }

    /** Gives back the semester */
    getAllSemester = () => {
      ElectionSystemAPI.getAPI().getAllSemester()
      .then(semesterBO =>{
          console.log(semesterBO.getGrading())
          if(semesterBO.getGrading() === false && semesterBO.getSubmitProjects() === false && semesterBO.getElection() === false ){
              this.setState({
                  duringSemester: true
              });
          }
      }).catch(e =>
              this.setState({
                  error: e
              }))
  }

  componentDidMount(){
    this.getAllSemester();
  }





  render() {
    const {classes}= this.props;


        return (

              <Container maxWidth="MD" align ="center" className={classes.grid}>
                      {this.state.duringSemester ? null
                      :
                      <div>
                      <ListEntryNewProjectsAdmin
                      duringSemester={this.state.duringSemester}
                      />
                      <Divider/>
                      </div>
                      }
                      <ApprovedProjectsAdmin
                      duringSemester={this.state.duringSemester}
                      />
                      <RejectedProjectsAdmin/>
                  <Divider/>
                      <ArchivedProjectsAdmin/>

                  <AdminButtonBar/>

				  </Container>
		);
	}
}

const styles = theme => ({
    grid:{
        width: '100%',
        marginTop: theme.spacing(10),
        marginBottom: theme.spacing(12)
    },
    button:{
        marginTop: theme.spacing(3)
    },

     appBar: {
      top: 'auto',
      bottom: 0,
      align:'center'
    },
    grow: {
      flexGrow: 1,
      },
    fabButton: {

      margin: '0 auto',
      zIndex: 1,
      top: -30,
      left: 0,
      right: 0,

    },
});



export default withStyles(styles) (HomeScreenAdmin);
