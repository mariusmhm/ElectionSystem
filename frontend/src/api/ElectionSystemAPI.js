import GradingBO from './GradingBO';
import ModuleBO from './ModuleBO';
import ParticipationBO from './ParticipationBO';
import ProjectBO from './ProjectBO';
import ProjecttypeBO from './ProjecttypeBO';
import SemesterBO from './SemesterBO';
import StudentBO from './StudentBO';
import UserBO from './UserBO';
import State from './State';

/**
 * Abstracts the REST interface of the Python backend with convenient access methods.
 * The class is implemented as a singleton.
 */

export default class ElectionSystemAPI {

     // Singelton instance
    static #api = null;

    // Local Python backend
    #electionSystemServerBaseURL ='http://localhost:5000/electionsystem';

    //Project related
    #getAllProjectsURL = () => `${this.#electionSystemServerBaseURL}/project`;
    #getProjectURL = (id) => `${this.#electionSystemServerBaseURL}/project/${id}`;
    #getProjectForProjectNameURL = (name) => `${this.#electionSystemServerBaseURL}/project-by-name/${name}`;
    #getProjectForProfessorURL = (id) => `${this.#electionSystemServerBaseURL}/project-by-prof/${id}`;
    #getProjectForProjecttypeURL = (id) => `${this.#electionSystemServerBaseURL}/project-by-projecttype/${id}`;
    #addProjectURL = () => `${this.#electionSystemServerBaseURL}/project`;
    #updateProjectURL = (id) => `${this.#electionSystemServerBaseURL}/project/${id}`;
    #deleteProjectURL = (id) => `${this.#electionSystemServerBaseURL}/project/${id}`;
    #getProjectForStateURL = (state) => `${this.#electionSystemServerBaseURL}/project-by-state/${state}`;
    #getProjectForModuleURL = (id) => `${this.#electionSystemServerBaseURL}/project-by-module/${id}`;

    //State related
    #getAllStatesURL = () => `${this.#electionSystemServerBaseURL}/state`;
    #getStateURL = (id) => `${this.#electionSystemServerBaseURL}/state/${id}`;

    //Projecttype related
    #getAllProjecttypesURL = () => `${this.#electionSystemServerBaseURL}/projecttype`;
    #getProjecttypeURL = (id) => `${this.#electionSystemServerBaseURL}/projecttype/${id}`;
    #getProjecttypeForProjectURL = (id) => `${this.#electionSystemServerBaseURL}/projects/${id}/projecttype`;
    #addProjecttypeURL = () => `${this.#electionSystemServerBaseURL}/projecttype`;
    #updateProjecttypeURL = (id) => `${this.#electionSystemServerBaseURL}/projecttype/${id}`;
    #deleteProjecttypeURL = (id) => `${this.#electionSystemServerBaseURL}/projecttype/${id}`;

    //Module related
    #getAllModulesURL = () => `${this.#electionSystemServerBaseURL}/module`;
    #getModuleURL = (id) => `${this.#electionSystemServerBaseURL}/module/${id}`;
    #getModuleForProjectURL = (id) => `${this.#electionSystemServerBaseURL}/projects/${id}/module`;
    #addModuleURL = () => `${this.#electionSystemServerBaseURL}/module`;
    #updateModuleURL = (id) => `${this.#electionSystemServerBaseURL}/module/${id}`;
    #deleteModuleURL = (id) => `${this.#electionSystemServerBaseURL}/module/${id}`;

    //Grading related
    #getAllGradesURL = () => `${this.#electionSystemServerBaseURL}/grading`
    #getGradeURL = (id) => `${this.#electionSystemServerBaseURL}/grading/${id}`
    #addGradeURL = () => `${this.#electionSystemServerBaseURL}/grading`;
    #updateGradeURL = (id) => `${this.#electionSystemServerBaseURL}/grade/${id}`;
    #deleteGradeURL = (id) => `${this.#electionSystemServerBaseURL}/grading/${id}`;

    //Participation related
    #getAllParticipationsForProjectURL = (id) => `${this.#electionSystemServerBaseURL}/participation-by-project/${id}`;
    #getParticipationURL = (id) => `${this.#electionSystemServerBaseURL}/participation/${id}`;
    #getParticipationsForStudentURL =(id) => `${this.#electionSystemServerBaseURL}/participation-by-student/${id}`;
    #addParticipationURL = () => `${this.#electionSystemServerBaseURL}/participation`;
    #updateParticipationURL = (id) => `${this.#electionSystemServerBaseURL}/participation/${id}`;
    #deleteParticipationURL = (id) => `${this.#electionSystemServerBaseURL}/participation/${id}`;
    #getParticipationForStudentAndProjectURL =(student_id, project_id) => `${this.#electionSystemServerBaseURL}/get-participation-by-student-project?student_id=`+ student_id +`project_id=`+ project_id;

    //Semester related
    #getAllSemesterURL = () => `${this.#electionSystemServerBaseURL}/semester`
    #addSemesterURL = () => `${this.#electionSystemServerBaseURL}/semester`;
    #updateSemesterURL = (id) => `${this.#electionSystemServerBaseURL}/semester/${id}`;

    //Student related
    #getAllStudentsURL = () => `${this.#electionSystemServerBaseURL}/student`;
    #getStudentURL = (id) => `${this.#electionSystemServerBaseURL}/student/${id}`;
    #getStudentForGoogleIDURL = (googleId) => `${this.#electionSystemServerBaseURL}/student-by-google-id/${googleId}`;
    #getStudentForMailURL = (mail) => `${this.#electionSystemServerBaseURL}/student-by-mail/${mail}`;
    #addStudentURL =() =>  `${this.#electionSystemServerBaseURL}/student`;
    #updateStudentURL = (id) => `${this.#electionSystemServerBaseURL}/student/${id}`;
    #getStudentsByParticipationsURL =(id)=>`${this.#electionSystemServerBaseURL}/students-by-participations/${id}`;

    //User related
    #getAllUsersURL = () => `${this.#electionSystemServerBaseURL}/user`;
    #addUserURL = () =>  `${this.#electionSystemServerBaseURL}/user`;
    #getUserForGoogleIDURL = (googleID) =>  `${this.#electionSystemServerBaseURL}/user-by-google-id/${googleID}`;
    #getUserForMailURL = (mail) => `${this.#electionSystemServerBaseURL}/user-by-mail/${mail}`;
    #getUserForRoleURL = (role) => `${this.#electionSystemServerBaseURL}/user-by-role/${role}`;
    #getUserURL = (id) => `${this.#electionSystemServerBaseURL}/user/${id}`;
    #updateUserURL = (id) => `${this.#electionSystemServerBaseURL}/user/${id}`;
    #deleteUserURL = (id) => `${this.#electionSystemServerBaseURL}/user/${id}`;

 /**
   * Get the Singelton instance
   *
   * @public
   */
    static getAPI() {
        if (this.#api == null) {
          this.#api = new ElectionSystemAPI();
        }
        return this.#api;
      }

  /**
   *  Returns a Promise which resolves to a json object.
   *  The Promise returned from fetch() won’t reject on HTTP error status even if the response is an HTTP 404 or 500.
   *  fetchAdvanced throws an Error also an server status errors
   */
    #fetchAdvanced = (url, init) => fetch(url, init)
    .then(res => {
      // The Promise returned from fetch() won’t reject on HTTP error status even if the response is an HTTP 404 or 500.
      if (!res.ok) {
        throw Error(`${res.status} ${res.statusText}`);
      }
      return res.json();
    }
    )

    //----------Project related-------------------------

   /**
   * Returns a Promise, which resolves to an Array of ProjectBOs
   *
   * @public
   */
    getAllProjects(){
        return this.#fetchAdvanced(this.#getAllProjectsURL()).then((responseJSON) => {
            let projectBOs = ProjectBO.fromJSON(responseJSON);
            return new Promise(function (resolve){
                resolve(projectBOs)
            })
        })
    }


  /**
   * Returns a Promise, which resolves to a ProjectBO
   * @param {pname} projectname of the project to be retrieved
   * @public
   */
    getProjectForProjectName(pname){
      return this.#fetchAdvanced(this.#getProjectForProjectNameURL(pname)).then((responseJSON) => {
        let projectBOs = ProjectBO.fromJSON(responseJSON)[0];
        return new Promise(function (resolve) {
          resolve(projectBOs);
      })
    })
    }

 /**
   * Returns a Promise, which resolves to a ProjectBO
   * @param {profid} professor id of the project to be retrieved
   * @public
   */
    getProjectForProfessor(profid){
      return this.#fetchAdvanced(this.#getProjectForProfessorURL(profid)).then((responseJSON) => {
        let projectBOs = ProjectBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(projectBOs);
      })
    })
    }
 /**
   * Returns a Promise, which resolves to a ProjectBO
   * @param {projecttypeid} projecttype id of the project to be retrieved
   * @public
   */
    getProjectForProjecttype(projecttypeid){
      return this.#fetchAdvanced(this.#getProjectForProjecttypeURL(projecttypeid)).then((responseJSON) => {
        let projectBOs = ProjecttypeBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(projectBOs);
      })
    })
    }

 /**
   * Returns a Promise, which resolves to a ProjectBO
   *
   * @param {state} state of the project to be retrieved
   * @public
   */
    getProjectForState(state){
    return this.#fetchAdvanced(this.#getProjectForStateURL(state)).then((responseJSON) => {
        let projectBOs = ProjectBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(projectBOs);
      })
    })
    }
  /**
   * Returns a Promise, which resolves to a ProjectBO
   *
   * @param {module} module of the project to be retrieved
   * @public
   */
    getProjectForModule(module){
    return this.#fetchAdvanced(this.#getProjectForModuleURL(module)).then((responseJSON) => {
        let projectBOs = ProjectBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(projectBOs);
      })
    })
    }

  /**
   * Adds a project and returns a Promise, which resolves to a new ProjectBO object
   *
   * @param {ProjectBO} projectBO to be added. The ID of the new project is set by the backend
   * @public

   */
    addProject(projectBO){
        return this.#fetchAdvanced(this.#addProjectURL(), {
          method: 'POST',
          headers:{
            'Accept': 'application/json, text/plain',
            'Content-type': 'application/json',
          },
          body: JSON.stringify(projectBO)
            }).then((responseJSON) => {
            let responseProjectBO = ProjectBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
              resolve(responseProjectBO);
            })
          })
    }


    /**
    *@param {Number} projectID
    *@public
    */
    getProject(projectID){
        return this.#fetchAdvanced(this.#getProjectURL(projectID)).then((responseJSON) => {
            let responseProjectBO = ProjectBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
              resolve(responseProjectBO);
            })
          })
    }

   /**
   * Updates a project and returns a Promise, which resolves to a ProjectBO.
   * @param {projectBO} ProjectBO to be updated
   * @public
   */
    updateProject(project){
      console.log('wird aufgerufen');
        return this.#fetchAdvanced(this.#updateProjectURL(project.getID()), {
            method: 'PUT',
            headers:{
            'Accept': 'application/json, text/plain',
            'Content-type': 'application/json',
            },
            body: JSON.stringify(project)
          }).then((responseJSON) => {
            let responseProjectBO = ProjectBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
              resolve(responseProjectBO);
            })
          })
    }

   /**
   * Returns a Promise, which resolves to an Array of ProjectBOs
   * @param {projectID} projectID to be deleted
   * @public
   */
    deleteProject(projectID){
        return this.#fetchAdvanced(this.#deleteProjectURL(projectID), {
            method: 'DELETE'
          }).then((responseJSON) => {
            let responseProjectBO = ProjectBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
              resolve(responseProjectBO);
            })
          })
    }

    //----------State relevant operations-------------------------

      /**
   * Returns a Promise, which resolves to an Array of StateBOs
   * @public
   */
    getAllStates(){
      return this.#fetchAdvanced(this.#getAllStatesURL()).then((responseJSON)=> {
          let states = State.fromJSON(responseJSON);
          return new Promise(function(resolve){
              resolve(states);
          })
      })
    }
  /**
   * Returns a Promise, which resolves to a stateBO
   *
   * @param {stateid} the state of the to be retrieved
   * @public
   */
    getState(stateid){
      return this.#fetchAdvanced(this.#getStateURL(stateid)).then((responseJSON)=> {
        let state = State.fromJSON(responseJSON)[0];
        return new Promise(function(resolve){
          resolve(state);
        })
      })
    }
    //----------Projecttype-------------------------

 /**
   * Returns a Promise, which resolves to an Array of ProjecttypeBOs
   * @public
   */
   getAllProjecttypes(){
        return this.#fetchAdvanced(this.#getAllProjecttypesURL()).then((responseJSON)=> {
            let projecttypeBOs =ProjecttypeBO.fromJSON(responseJSON);
            return new Promise(function(resolve){
                resolve(projecttypeBOs);
            })
        })
    }

  /**
   * Returns a Promise, which resolves to a ProjecttypeBO
   * @param {projecttypeid} the projecttype id to be retrieved
   * @public
   */
    getProjecttype(projecttypeid){
      return this.#fetchAdvanced(this.#getProjecttypeURL(projecttypeid)).then((responseJSON)=> {
        let projecttypeBOs = ProjecttypeBO.fromJSON(responseJSON)[0];
        return new Promise(function(resolve){
            resolve(projecttypeBOs);
        })
    })
    }

  /**
   * Returns a Promise, which resolves to an Array of ProjecttypeBOs
   * @param {projectID} the projectid for which the the projecttype should be retrieved
   * @public
   */
    getProjecttypeForProject(projectID){
        return this.#fetchAdvanced(this.#getProjecttypeForProjectURL(projectID)).then((responseJSON) => {
          let projecttypeBOs = ProjecttypeBO.fromJSON(responseJSON)[0];
          return new Promise(function (resolve) {
            resolve(projecttypeBOs);
        })
      })
    }
  /**
   * Adds a projecttype and returns a Promise, which resolves to a new projecttypeBO
   * @param {projecttype} projecttypeBO to be added. The ID of the new projecttype is set by the backend
   * @public
   */
    addProjecttype(projecttype){
        return this.#fetchAdvanced(this.#addProjecttypeURL(), {
          method: 'POST',
          headers:{
            'Accept': 'application/json, text/plain',
            'Content-type': 'application/json',
          },
          body: JSON.stringify(projecttype)
          }).then((responseJSON) => {
              let projecttypeBO = ProjecttypeBO.fromJSON(responseJSON)[0];
              return new Promise(function (resolve) {
                resolve(projecttypeBO);
              })
            })
    }


  /**
   * Updates a projecttype and returns a Promise, which resolves to a ProjecttypeBO.
   *
   * @param {projecttypeBO} projecttypeBO to be updated
   * @public
   */
    updateProjecttype(projecttypeBO){
        return this.#fetchAdvanced(this.#updateProjecttypeURL(projecttypeBO.getID()), {
            method: 'PUT',
            headers:{
              'Accept': 'application/json, text/plain',
              'Content-type': 'application/json',
            },
            body: JSON.stringify(projecttypeBO)
            }).then((responseJSON) => {
              let responseProjecttypeBO = ProjecttypeBO.fromJSON(responseJSON)[0];
              return new Promise(function (resolve) {
                resolve(responseProjecttypeBO);
            })
          })
    }


  /**
   * Returns a Promise, which resolves to an Array of projecttypeBOs
   *
   * @param {projecttypeID} the projecttypeID to be deleted
   * @public
   */
    deleteProjecttype(projecttypeID){
        return this.#fetchAdvanced(this.#deleteProjecttypeURL(projecttypeID), {
            method: 'DELETE'
          }).then((responseJSON) => {
            let responseProjecttypeBO = ProjecttypeBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
              resolve(responseProjecttypeBO);
            })
          })
    }

    //----------Module relevant-------------------------

    /**
   * Returns a Promise, which resolves to an Array of ModuleBOs
   * @public
   */
    getAllModules(){
        return this.#fetchAdvanced(this.#getAllModulesURL()).then((responseJSON) => {
            let responseModuleBOs = ModuleBO.fromJSON(responseJSON);
            return new Promise(function (resolve){
                resolve(responseModuleBOs)
            })
        })
    }

    /**
   * Returns a Promise, which resolves to a ModuleBO
   * @param {moduleid} the module id to be retrieved
   * @public
   */
    getModule(moduleid){
      return this.#fetchAdvanced(this.#getModuleURL(moduleid))
      .then((responseJSON) => {
      let responseModuleBOs = ModuleBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(responseModuleBOs);
      })
    })
  }
  /**
   * Returns a Promise, which resolves to an Array of ModuleBOs
   * @param {projectID} project id for which the the module should be retrieved
   * @public
   */
    getModuleForProject(projectID){
        return this.#fetchAdvanced(this.#getModuleForProjectURL(projectID))
        .then((responseJSON) => {
        let responseModuleBOs = ModuleBO.fromJSON(responseJSON)[0];
        return new Promise(function (resolve) {
          resolve(responseModuleBOs);
        })
      })
    }

  /* Adds a module and returns a Promise, which resolves to a new ModuleBO object
   * @param {module} ModuleBO to be added. The ID of the new module is set by the backend
   * @public
   */
    addModule(module){
        return this.#fetchAdvanced(this.#addModuleURL(), {
          method: 'POST',
          headers:{
            'Accept': 'application/json, text/plain',
            'Content-type': 'application/json',
          },
          body: JSON.stringify(module)
          }).then((responseJSON) => {
              let responseModuleBO = ModuleBO.fromJSON(responseJSON)[0];
              return new Promise(function (resolve) {
                resolve(responseModuleBO);
              })
            })
    }


  /**
   * Updates a module and returns a Promise, which resolves to a ModuleBO.
   * @param {moduleBO} the module BO to be updated
   * @public
   */
    updateModule(moduleBO){
        return this.#fetchAdvanced(this.#updateModuleURL(moduleBO.getID()), {
            method: 'PUT',
            headers:{
              'Accept': 'application/json, text/plain',
              'Content-type': 'application/json',
            },
            body: JSON.stringify(moduleBO)
            }).then((responseJSON) => {
            let responseModuleBO = ModuleBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
              resolve(responseModuleBO);
            })
          })
    }



  /**
   * Returns a Promise, which resolves to an Array of ModuleBOs
   * @param {moduleID} customerID to be deleted
   * @public
   */
    deleteModule(moduleID){
        return this.#fetchAdvanced(this.#deleteModuleURL(moduleID), {
            method: 'DELETE'
          }).then((responseJSON) => {
            let responseModuleBO = ModuleBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
              resolve(responseModuleBO);
            })
          })
    }

    //----------Grading relevant operation-------------------------

   /**
   * Returns a Promise, which resolves to an Array of GrandingBOs
   * @public
   */
    getAllGrades(){
      console.log('API aufgerufen')
      return this.#fetchAdvanced(this.#getAllGradesURL()).then((responseJSON)=> {
        let responseGradingBOs = GradingBO.fromJSON(responseJSON);
        console.info('response' + responseGradingBOs);
        return new Promise(function(resolve){
            resolve(responseGradingBOs);
        })
      })

    }

  /**
   * Returns a Promise, which resolves to a GradingBO
   * @param {gradeID} gradingID to be retrieved
   * @public
   */
    getGrade(gradeID){
      return this.#fetchAdvanced(this.#getGradeURL(gradeID)).then((responseJSON)=> {
        let responseGradingBOs = GradingBO.fromJSON(responseJSON)[0];
        return new Promise(function(resolve){
          resolve(responseGradingBOs);
        })
      })

    }

   /**
   * Adds a grade and returns a Promise, which resolves to a new GradingBO object
   * @param {grading} gradingBO to be added. The ID of the new grade is set by the backend
   * @public
   */
    addGrade(grading){
        return this.#fetchAdvanced(this.#addGradeURL(), {
            method: 'POST',
            headers:{
              'Accept': 'application/json, text/plain',
              'Content-type': 'application/json',
            },
            body: JSON.stringify(grading)
          }).then((responseJSON) => {
              let responseGradeBO = GradingBO.fromJSON(responseJSON)[0];
              return new Promise(function (resolve) {
                resolve(responseGradeBO);
              })
            })
    }

    /**
   * Updates a gradeand returns a Promise, which resolves to a GradingBO.
   *
   * @param {gradingBO} the gradingBO to be updated
   * @public
   */
    updateGrade(gradingBO){
        return this.#fetchAdvanced(this.#updateGradeURL(gradingBO.getID()), {
            method: 'PUT',
            headers:{
              'Accept': 'application/json, text/plain',
              'Content-type': 'application/json',
            },
            body: JSON.stringify(gradingBO)
            }).then((responseJSON) => {
            let responseGradingBO = GradingBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
              resolve(responseGradingBO);
            })
          })
    }


  /**
   * Returns a Promise, which resolves to an Array of GradingBOs
   * @param {gradeID} the gradingID to be deleted
   * @public
   */
    deleteGrade(gradeID){
        return this.#fetchAdvanced(this.#deleteGradeURL(gradeID), {
            method: 'DELETE'
          }).then((responseJSON) => {
            let responseGradingBO = GradingBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
              resolve(responseGradingBO);
            })
          })
    }

    //----------Participation relevant operations-------------------------


  /**
   * Returns a Promise, which resolves to an Array of ParticipationBOs
   * @param {ProjectID} projectID for which the the participations should be retrieved
   * @public
   */
    getAllParticipationsForProject(projectID){
        return this.#fetchAdvanced(this.#getAllParticipationsForProjectURL(projectID))
        .then((responseJSON) => {
        let responseParticipationBOs = ParticipationBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(responseParticipationBOs);
        })
      })
    }

 /**
   * Returns a Promise, which resolves to a ParticipationBO
   * @param {participationID} participationID to be retrieved
   * @public
   */
    getParticipation(participationID){
      return this.#fetchAdvanced(this.#getParticipationURL(participationID))
      .then((responseJSON) => {
        let responseParticipationBOs = ParticipationBO.fromJSON(responseJSON)[0];
        return new Promise(function (resolve) {
          resolve(responseParticipationBOs);
        })
      })
    }


  /**
   * Returns a Promise, which resolves to an Array of ParticipationBOs
   * @param {studentID} studentID for which the the participation should be retrieved
   * @public
   */
    getParticipationsForStudent(studentID){
      return this.#fetchAdvanced(this.#getParticipationsForStudentURL(studentID))
      .then((responseJSON) => {
        let responseParticipationBOs = ParticipationBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(responseParticipationBOs);
        })
      })
    }

  /**
   * Returns a Promise, which resolves to the new ParticipationBO
   * @param {participation} participation object to be added. The ID of the new grade is set by the backend.
   * @public
   */
    addParticipation(participation){
        return this.#fetchAdvanced(this.#addParticipationURL(), {
          method: 'POST',
          headers:{
            'Accept': 'application/json, text/plain',
            'Content-type': 'application/json',
          },
          body: JSON.stringify(participation)
          }).then((responseJSON) => {
              let responseParticipationBO = ParticipationBO.fromJSON(responseJSON)[0];
              return new Promise(function (resolve) {
                resolve(responseParticipationBO);
              })
            })
    }


  /*
   * Updates a participation and returns a Promise, which resolves to a ParticipationBO.
   * @param {ParticipationBO} participationBO to be updated
   * @public
   */
    updateParticipation(participationBO){
        return this.#fetchAdvanced(this.#updateParticipationURL(participationBO.getID()), {
            method: 'PUT',
            headers:{
              'Accept': 'application/json, text/plain',
              'Content-type': 'application/json',
            },
            body: JSON.stringify(participationBO)
            }).then((responseJSON) => {
            let responseParticipationBO = ParticipationBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
              resolve(responseParticipationBO);
            })
          })
    }

  /**
   * Deletes the given participation and returns a Promise, which resolves to an ParticipationBO
   * @param participationID to be deleted
   * @public
   */
    deleteParticipation(participationID){
        return this.#fetchAdvanced(this.#deleteParticipationURL(participationID), {
            method: 'DELETE'
          }).then((responseJSON) => {
            let responseParticipationBO = ParticipationBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
              resolve(responseParticipationBO);
            })
          })
    }


  /**
   * Returns a Promise, which resolves to an Array of ParticipationBOs
   * @param {studentID, projectID} studentID, projectID for which the the participation should be retrieved
   * @public
   */
    getParticipationForStudentAndProject(studentID, projectID){
      return this.#fetchAdvanced(this.#getParticipationForStudentAndProjectURL(studentID, projectID))
      .then((responseJSON) => {
        let responseParticipationBOs = ParticipationBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(responseParticipationBOs);
        })
      })
    }

    //----------Semester relevant operations-------------------------




 /* Returns a Promise, which resolves to an Array of SemesterBOs*/
    getAllSemester(){
      return this.#fetchAdvanced(this.#getAllSemesterURL()).then((responseJSON) => {
          let responseSemesterBOs = SemesterBO.fromJSON(responseJSON);
          return new Promise(function (resolve){
              resolve(responseSemesterBOs)
          })
      })
    }

  /**
   * Adds a semester and returns a Promise, which resolves to a new SemesterBO object
   * @param {SemesterBO} semesterBO to be added. The ID of the new semester is set by the backend
   * @public
   */
    addSemester(semester){
        return this.#fetchAdvanced(this.#addSemesterURL(), {
          method: 'POST',
          headers:{
            'Accept': 'application/json, text/plain',
            'Content-type': 'application/json',
          },
          body: JSON.stringify(semester)
          }).then((responseJSON) => {
              let responseSemesterBO = SemesterBO.fromJSON(responseJSON)[0];
              return new Promise(function (resolve) {
                resolve(responseSemesterBO);
              })
            })
    }

  /**
   * Updates a semester and returns a Promise, which resolves to a SemesterBO.
   * @param {semester} SemesterBO to be updated
   * @public
   */
    updateSemester(semester){
        console.log("api aufruf")
        return this.#fetchAdvanced(this.#updateSemesterURL(semester.getID()), {
            method: 'PUT',
            headers:{
              'Accept': 'application/json, text/plain',
              'Content-type': 'application/json',
            },
            body: JSON.stringify(semester)
            }).then((responseJSON) => {
            let responseSemesterBO = SemesterBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
              resolve(responseSemesterBO);
            })
          })
    }

    //----------Student relevant operation-------------------------


  /**
   * Returns a Promise, which resolves to an Array of StudentBOs
   * @public
   */
    getAllStudents(){
      return this.#fetchAdvanced(this.#getAllStudentsURL()).then((responseJSON) => {
          let studentBOs = StudentBO.fromJSON(responseJSON);
          return new Promise(function (resolve){
              resolve(studentBOs)
          })
      })
  }

  /**
   * Returns a Promise, which resolves to a StudentBO
   * @param {studentID} studentID to be retrieved
   * @public
   */
    getStudent(studentID){
        return this.#fetchAdvanced(this.#getStudentURL(studentID))
        .then((responseJSON) => {
        let responseStudentBOs = StudentBO.fromJSON(responseJSON)[0];
        return new Promise(function (resolve) {
          resolve(responseStudentBOs);
        })
      })
    }

  /**
   * Returns a Promise, which resolves to a StudentBOs
   * @param {googleID} googleID to be retrieved
   * @public
   */
    getStudentForGoogleID(googleID){
      return this.#fetchAdvanced(this.#getStudentForGoogleIDURL(googleID))
      .then((responseJSON) => {
      let responseStudentBOs = StudentBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(responseStudentBOs);
      })
    })
  }
  /**
   * Returns a Promise, which resolves to an Array of StudentBOs
   * @param {mail} mail for which the the Student should be retrieved
   * @public
   */
    getStudentForMail(mail){
        return this.#fetchAdvanced(this.#getStudentForMailURL(mail))
        .then((responseJSON) => {
        let responseStudentBOs = StudentBO.fromJSON(responseJSON)[0];
        return new Promise(function (resolve) {
          resolve(responseStudentBOs);
        })
      })
    }


  /**
   * Adds a student and returns a Promise, which resolves to a new StudentBO object
   * @param {StudentBO} studentBO to be added. The ID of the new student is set by the backend
   * @public
   */
    addStudent(student){
        return this.#fetchAdvanced(this.#addStudentURL(), {
            method: 'POST',
            headers:{
              'Accept': 'application/json, text/plain',
              'Content-type': 'application/json',
            },
            body: JSON.stringify(student)
          }).then((responseJSON) => {
              let responseStudentBO = StudentBO.fromJSON(responseJSON)[0];
              return new Promise(function (resolve) {
                resolve(responseStudentBO);
              })
            })
    }


  /**
   * Updates a student and returns a Promise, which resolves to a StudentBO.
   * @param {StudentBO} studentBO to be updated
   * @public
   */
    updateStudent(studentBO){
      return this.#fetchAdvanced(this.#updateStudentURL(studentBO.getID()), {
          method: 'PUT',
          headers:{
            'Accept': 'application/json, text/plain',
            'Content-type': 'application/json',
          },
          body: JSON.stringify(studentBO)
          }).then((responseJSON) => {
          let responseStudentBO = UserBO.fromJSON(responseJSON)[0];
          return new Promise(function (resolve) {
            resolve(responseStudentBO);
          })
        })
  }


  /**
   * Returns a Promise, which resolves to an Array of StudentBOs
   * @param {projectID} projectID for which the the students should be retrieved
   * @public
   */
    getStudentByParticipations(projectID){
    return this.#fetchAdvanced(this.#getStudentsByParticipationsURL(projectID))
    .then((responseJSON) => {
    let responseStudentBOs = StudentBO.fromJSON(responseJSON);
    return new Promise(function (resolve) {
      resolve(responseStudentBOs);
      console.log(responseStudentBOs);
    })
  })
}

    //----------User relevant operations-------------------------

 /**
   * Returns a Promise, which resolves to an Array of UserBOs
   * @public
   */
    getAllUsers(){
      return this.#fetchAdvanced(this.#getAllUsersURL()).then((responseJSON) => {
          let userBOs = UserBO.fromJSON(responseJSON);
          return new Promise(function (resolve){
              resolve(userBOs)
          })
      })
  }

 /**
   * Adds a user and returns a Promise, which resolves to a new UserBO object
   * @param {userBO} userBO to be added. The ID of the new user is set by the backend
   * @public
   */
    addUser(user){
      return this.#fetchAdvanced(this.#addUserURL(), {
          method: 'POST',
          headers:{
            'Accept': 'application/json, text/plain',
            'Content-type': 'application/json',
          },
          body: JSON.stringify(user)
          }).then((responseJSON) => {
            let responseUserBO = UserBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
              resolve(responseUserBO);
            })
          })
  }
  /**
   * Returns a Promise, which resolves to a UserBO
   * @param {userID} userID to be retrieved
   * @public
   */
    getUser(userID){
        return this.#fetchAdvanced(this.#getUserURL(userID))
        .then((responseJSON) => {
        let responseUserBOs = UserBO.fromJSON(responseJSON)[0];
        return new Promise(function (resolve) {
          resolve(responseUserBOs);
        })
      })
    }
  /**
   * Returns a Promise, which resolves to a UserBO
   * @param {googleID} googleID to be retrieved
   * @public
   */
    getUserForGoogleID(googleID){
      return this.#fetchAdvanced(this.#getUserForGoogleIDURL(googleID))
      .then((responseJSON) => {
      let responseUserBOs = UserBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(responseUserBOs);
      })
    })
  }
  /**
   * Returns a Promise, which resolves to a UserBO
   *
   * @param {role} role for which the user should be retrieved
   * @public
   */
    getUserForRole(role){
    return this.#fetchAdvanced(this.#getUserForRoleURL(role))
    .then((responseJSON) => {
    let responseUserBOs = UserBO.fromJSON(responseJSON);
    return new Promise(function (resolve) {
      resolve(responseUserBOs);
      })
    })
  }

    /**
   * Returns a Promise, which resolves to a UserBO
   * @param {mail} mail for which the user should be retrieved
   * @public
   */
    getUserForMail(mail){
      return this.#fetchAdvanced(this.#getUserForMailURL(mail))
        .then((responseJSON) => {
        let responseUserBOs = UserBO.fromJSON(responseJSON)[0];
        return new Promise(function (resolve) {
          resolve(responseUserBOs);
        })
      })
    }

  /**
   * Updates a user and returns a Promise, which resolves to a UserBO.
   * @param {userBO} userBO to be updated
   * @public
   */
    updateUser(userBO){
        return this.#fetchAdvanced(this.#updateUserURL(userBO.getID()), {
            method: 'PUT',
            headers:{
              'Accept': 'application/json, text/plain',
              'Content-type': 'application/json',
            },
            body: JSON.stringify(userBO)
            }).then((responseJSON) => {
            let responseUserBO = UserBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
              resolve(responseUserBO);
            })
          })
    }


  /**
   * Deletes the given user and returns a Promise, which resolves to an UserBO
   * @param userID to be deleted
   * @public
   */
    deleteUser(userID){
        return this.#fetchAdvanced(this.#deleteUserURL(userID), {
            method: 'DELETE'
          }).then((responseJSON) => {
            let responseUserBO = UserBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
              resolve(responseUserBO);
            })
          })
    }


}
