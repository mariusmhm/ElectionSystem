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
import LoadingProgress from '../../dialogs/LoadingProgress';

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
            loadingInProgress: false
        };
    }

    /** Gives back the semester */
    getAllSemester = () => {
      ElectionSystemAPI.getAPI().getAllSemester()
      .then(semesterBO =>{
          console.log(semesterBO.getGrading())
          if(semesterBO.getGrading() === false && semesterBO.getSubmitProjects() === false && semesterBO.getElection() === false ){
              this.setState({
                  loadingInProgress: false,
                  duringSemester: true
              });
          }
      }).catch(e =>
              this.setState({
                  loadingInProgress: false,
                  error: e

              }));
      this.setState({
        loadingInProgress: true,
        error: null
    });
  }

  componentDidMount(){
    this.getAllSemester();
  }





  render() {
    const {classes}= this.props;
    const {loadingInProgress, error} = this.state;

        return (
            <div className={classes.headGrid}>
              <Container maxWidth="md" align ="center" >
                      {this.state.duringSemester ? null
                      :
                      <div>
                      <ListEntryNewProjectsAdmin
                      {...this.props}
                      duringSemester={this.state.duringSemester}
                      />
                      <Divider/>
                      </div>
                      }
                      <ApprovedProjectsAdmin
                      {...this.props}
                      duringSemester={this.state.duringSemester}
                      />
                      <RejectedProjectsAdmin
                      {...this.props}/>
                    <Divider/>
                      <ArchivedProjectsAdmin
                      {...this.props}/>

                  <AdminButtonBar {...this.props}/>
              </Container>
          </div>
      );
   }
}

const styles = theme => ({
    headGrid:{
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
