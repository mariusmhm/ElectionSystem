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


/**
 * Controlls  lists of new, approved, rejected and archived projects.
 *
 * @see See [RejectedProjectsAdmin]
 *@see See [listEntryNewProjectsAdmin]
 *@see See [Approved projectsAdmin]
 *@see See [Archived ProjectsAdmin]
 *
 *
 */

class HomeScreenAdmin extends Component {
/** Constructor of the component**/
    constructor(props) {
        super(props);

        // Init the state
        this.state = {
            googleID: null,
            redirect: false,
            error: null,
            openDialog: false,
            duringSemester: false,
            loadingInProgress: false,
            us: this.props.history.location.state.cUser,
            projects:[],
            loadingInPrograssP: false,
        };
        this.handleReload = this.handleReload.bind(this)
    }

    /** Gives back the semester */
    getAllSemester = () => {
      ElectionSystemAPI.getAPI().getAllSemester()
      .then(semesterBO =>{
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

  handleReload(){

    this.getProjectForStateOne();
    
  }

  //Gives back the projects by state "approved"
  getProjectForStateOne = () =>{
      ElectionSystemAPI.getAPI().getProjectForState(2)
      .then(projectBO => { this.setState({
          projects: projectBO,
          loadingInProgress: false,
          error: null
      })}).catch(e =>
          this.setState({
            projects:[],
            loadingInProgressP: false,
            error: e
          })
      );
        this.setState({
                    loadingInProgress: true,
                    error: null
        });
  }


  componentDidMount(){
    this.getAllSemester();
    this.getProjectForStateOne();
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
                      projects={this.state.projects}
                      />
                      <RejectedProjectsAdmin
                      {...this.props}/>
                    <Divider/>
                      <ArchivedProjectsAdmin
                      {...this.props}/>

                      <AdminButtonBar {...this.props} handleReload={this.handleReload}/>
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
