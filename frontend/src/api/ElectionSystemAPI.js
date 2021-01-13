import GradingBO from './GradingBO';
import ModuleBO from './ModuleBO';
import ParticipationBO from './ParticipationBO';
import ProjectBO from './ProjectBO';
import ProjecttypeBO from './ProjecttypeBO';
import SemesterBO from './SemesterBO';
import StudentBO from './StudentBO';
import UserBO from './UserBO';
import State from './State';

export default class ElectionSystemAPI {

    static #api = null;

    #electionSystemServerBaseURL ='http://localhost:5000/electionsystem'

    //Project
    #getAllProjectsURL = () => `${this.#electionSystemServerBaseURL}/project`;
    #getProjectURL = (id) => `${this.#electionSystemServerBaseURL}/project/${id}`;
    #getProjectForProjectNameURL = (name) => `${this.#electionSystemServerBaseURL}/project-by-name/${name}`;
    #getProjectForProfessorURL = (id) => `${this.#electionSystemServerBaseURL}/project-by-prof/${id}`;
    #getProjectForProjecttypeURL = (id) => `${this.#electionSystemServerBaseURL}/project-by-projecttype/${id}`;
    #addProjectURL = () => `${this.#electionSystemServerBaseURL}/project`;
    #updateProjectURL = (id) => `${this.#electionSystemServerBaseURL}/projects/${id}`;
    #deleteProjectURL = (id) => `${this.#electionSystemServerBaseURL}/project/${id}`;
    #getProjectForStateURL = (state) => `${this.#electionSystemServerBaseURL}/project-by-state/${state}`;
    #getProjectForModuleURL = (id) => `${this.#electionSystemServerBaseURL}/project-by-module/${id}`;

    //State
    #getAllStatesURL = () => `${this.#electionSystemServerBaseURL}/state`;
    #getStateURL = (id) => `${this.#electionSystemServerBaseURL}/state/${id}`;

    //Projecttype
    #getAllProjecttypesURL = () => `${this.#electionSystemServerBaseURL}/projecttype`;
    #getProjecttypeURL = (id) => `${this.#electionSystemServerBaseURL}/projecttype/${id}`;
    #getProjecttypeForProjectURL = (id) => `${this.#electionSystemServerBaseURL}/projects/${id}/projecttype`;
    #addProjecttypeURL = () => `${this.#electionSystemServerBaseURL}/projecttype`;
    #updateProjecttypeURL = (id) => `${this.#electionSystemServerBaseURL}/projecttype/${id}`;
    #deleteProjecttypeURL = (id) => `${this.#electionSystemServerBaseURL}/projecttype/${id}`;

    //Module
    #getAllModulesURL = () => `${this.#electionSystemServerBaseURL}/module`;
    #getModuleURL = (id) => `${this.#electionSystemServerBaseURL}/module/${id}`;
    #getModuleForProjectURL = (id) => `${this.#electionSystemServerBaseURL}/projects/${id}/module`;
    #addModuleURL = () => `${this.#electionSystemServerBaseURL}/module`;
    #updateModuleURL = (id) => `${this.#electionSystemServerBaseURL}/module/${id}`;
    #deleteModuleURL = (id) => `${this.#electionSystemServerBaseURL}/module/${id}`;

    //Grading
    #getAllGradesURL = () => `${this.#electionSystemServerBaseURL}/grading`
    #getGradeURL = (id) => `${this.#electionSystemServerBaseURL}/grading/${id}`
    #addGradeURL = () => `${this.#electionSystemServerBaseURL}/grading`;
    #updateGradeURL = (id) => `${this.#electionSystemServerBaseURL}/grade/${id}`;
    #deleteGradeURL = (id) => `${this.#electionSystemServerBaseURL}/grading/${id}`;

    //Participation
    #getAllParticipationsForProjectURL = (id) => `${this.#electionSystemServerBaseURL}/participation-by-project/${id}`;
    #getParticipationURL = (id) => `${this.#electionSystemServerBaseURL}/participation/${id}`;
    #getParticipationsForStudentURL =(id) => `${this.#electionSystemServerBaseURL}/participation-by-student/${id}`;
    #addParticipationURL = () => `${this.#electionSystemServerBaseURL}/participation`;
    #updateParticipationURL = (id) => `${this.#electionSystemServerBaseURL}/participation/${id}`;
    #deleteParticipationURL = (id) => `${this.#electionSystemServerBaseURL}/participation/${id}`;

    //Semester
    #getAllSemesterURL = () => `${this.#electionSystemServerBaseURL}/semester`
    #addSemesterURL = () => `${this.#electionSystemServerBaseURL}/semester`;
    #updateSemesterURL = (id) => `${this.#electionSystemServerBaseURL}/semester/${id}`;

    //Student
    #getStudentURL = (id) => `${this.#electionSystemServerBaseURL}/student/${id}`;
    #getStudentForGoogleIDURL = (googleId) => `${this.#electionSystemServerBaseURL}/student-by-google-id/${googleId}`;
    #getStudentForMailURL = (mail) => `${this.#electionSystemServerBaseURL}/student-by-mail/${mail}`;
    #addStudentURL =() =>  `${this.#electionSystemServerBaseURL}/student`;
    #getStudentsByParticipationsURL =(id)=>`${this.#electionSystemServerBaseURL}/students-by-participations/${id}`;

    //User
    #addUserURL = () =>  `${this.#electionSystemServerBaseURL}/user`;
    #getUserForGoogleIDURL = (googleID) =>  `${this.#electionSystemServerBaseURL}/user-by-google-id/${googleID}`;
    #getUserForMailURL = (mail) => `${this.#electionSystemServerBaseURL}/user-by-mail/${mail}`;
    #getUserForRoleURL = (role) => `${this.#electionSystemServerBaseURL}/user-by-role/${role}`;
    #getUserURL = (id) => `${this.#electionSystemServerBaseURL}/user/${id}`;
    #updateUserURL = (id) => `${this.#electionSystemServerBaseURL}/user/${id}`;
    #deleteUserURL = (id) => `${this.#electionSystemServerBaseURL}/user/${id}`;


    static getAPI() {
        if (this.#api == null) {
          this.#api = new ElectionSystemAPI();
        }
        return this.#api;
      }

    #fetchAdvanced = (url, init) => fetch(url, init)
    .then(res => {
      // The Promise returned from fetch() won’t reject on HTTP error status even if the response is an HTTP 404 or 500.
      if (!res.ok) {
        throw Error(`${res.status} ${res.statusText}`);
      }
      return res.json();
    }
    )

    //----------Projects-------------------------

    /**
    *@public
    */
    getAllProjects(){
        return this.#fetchAdvanced(this.#getAllProjectsURL()).then((responseJSON) => {
            let projectBOs = ProjectBO.fromJSON(responseJSON);
            return new Promise(function (resolve){
                resolve(projectBOs)
            })
        })
    }

    getProjectForProjectName(pname){
      return this.#fetchAdvanced(this.#getProjectForProjectNameURL(pname)).then((responseJSON) => {
        let projectBOs = ProjectBO.fromJSON(responseJSON)[0];
        return new Promise(function (resolve) {
          resolve(projectBOs);
      })
    })
    }

    getProjectForProfessor(profid){
      return this.#fetchAdvanced(this.#getProjectForProfessorURL(profid)).then((responseJSON) => {
        let projectBOs = ProjectBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(projectBOs);
      })
    })
    }

    getProjectForProjecttype(projecttypeid){
      return this.#fetchAdvanced(this.#getProjectForProjecttypeURL(projecttypeid)).then((responseJSON) => {
        let projectBOs = ProjecttypeBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(projectBOs);
      })
    })
    }

    getProjectForState(state){
    return this.#fetchAdvanced(this.#getProjectForStateURL(state)).then((responseJSON) => {
        let projectBOs = ProjectBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(projectBOs);
      })
    })
    }
 
    getProjectForModule(module){
    return this.#fetchAdvanced(this.#getProjectForModuleURL(module)).then((responseJSON) => {
        let projectBOs = ProjectBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(projectBOs);
      })
    })
    }

    /**
    *@param {ProjectBO} projectBO
    *@public
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
    *@param {ProjectBO} projectBO
    *@public
    */
    updateProject(){
        return this.#fetchAdvanced(this.#updateProjectURL(ProjectBO.getID()), {
            method: 'PUT'
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

    //----------State-------------------------
    getAllStates(){
      return this.#fetchAdvanced(this.#getAllStatesURL()).then((responseJSON)=> {
          let states = State.fromJSON(responseJSON);
          return new Promise(function(resolve){
              resolve(states);
          })
      })
    }

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
    *@public
    */
   getAllProjecttypes(){
        return this.#fetchAdvanced(this.#getAllProjecttypesURL()).then((responseJSON)=> {
            let projecttypeBOs =ProjecttypeBO.fromJSON(responseJSON);
            return new Promise(function(resolve){
                resolve(projecttypeBOs);
            })
        })
    }

    getProjecttype(projecttypeid){
      return this.#fetchAdvanced(this.#getProjecttypeURL(projecttypeid)).then((responseJSON)=> {
        let projecttypeBOs = ProjecttypeBO.fromJSON(responseJSON)[0];
        return new Promise(function(resolve){
            resolve(projecttypeBOs);
        })
    })
    }

    getProjecttypeForProject(projectID){
        return this.#fetchAdvanced(this.#getProjecttypeForProjectURL(projectID)).then((responseJSON) => {
          let projecttypeBOs = ProjecttypeBO.fromJSON(responseJSON)[0];
          return new Promise(function (resolve) {
            resolve(projecttypeBOs);
        })
      })
    }

    addProjecttype(projecttype){
        return this.#fetchAdvanced(this.#addProjecttypeURL(), {
          method: 'POST',
          headers:{
            'Accept': 'application/json, text/plain',
            'Content-type': 'application/json',
          },
          body: JSON.stringify(projecttype)
          })
            .then((responseJSON) => {
              let projecttypeBO = ProjecttypeBO.fromJSON(responseJSON)[0];
              return new Promise(function (resolve) {
                resolve(projecttypeBO);
              })
            })
    }

    updateProjecttype(projecttypeBO){
        return this.#fetchAdvanced(this.#updateProjecttypeURL(projecttypeBO.getID()), {
            method: 'PUT'
            }).then((responseJSON) => {
              let responseProjecttypeBO = ProjecttypeBO.fromJSON(responseJSON)[0];
              return new Promise(function (resolve) {
                resolve(responseProjecttypeBO);
            })
          })
    }

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

    //----------Module-------------------------

    /**
    *@public
    */
    getAllModules(){
        return this.#fetchAdvanced(this.#getAllModulesURL()).then((responseJSON) => {
            let responseModuleBOs = ModuleBO.fromJSON(responseJSON);
            return new Promise(function (resolve){
                resolve(responseModuleBOs)
            })
        })
    }

    getModule(moduleid){
      return this.#fetchAdvanced(this.#getModuleURL(moduleid))
      .then((responseJSON) => {
      let responseModuleBOs = ModuleBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(responseModuleBOs);
      })
    })
  }

    getModuleForProject(projectID){
        return this.#fetchAdvanced(this.#getModuleForProjectURL(projectID))
        .then((responseJSON) => {
        let responseModuleBOs = ModuleBO.fromJSON(responseJSON)[0];
        return new Promise(function (resolve) {
          resolve(responseModuleBOs);
        })
      })
    }

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

    updateModule(moduleBO){
        return this.#fetchAdvanced(this.#updateModuleURL(moduleBO.getID()), {
            method: 'PUT'
            }).then((responseJSON) => {
            let responseModuleBO = ModuleBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
              resolve(responseModuleBO);
            })
          })
    }

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

    //----------Grading-------------------------

     /**
    *@public
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
    *@public
    */
    getGrade(gradeID){
      return this.#fetchAdvanced(this.#getGradeURL(gradeID)).then((responseJSON)=> {
        let responseGradingBOs = GradingBO.fromJSON(responseJSON)[0];
        return new Promise(function(resolve){
          resolve(responseGradingBOs);
        })
      })

    }


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

    updateGrade(gradingBO){
        return this.#fetchAdvanced(this.#updateGradeURL(gradingBO.getID()), {
            method: 'PUT'
            }).then((responseJSON) => {
            let responseGradingBO = GradingBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
              resolve(responseGradingBO);
            })
          })
    }

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

    //----------Participation-------------------------

    getAllParticipationsForProject(projectID){
        return this.#fetchAdvanced(this.#getAllParticipationsForProjectURL(projectID))
        .then((responseJSON) => {
        let responseParticipationBOs = ParticipationBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(responseParticipationBOs);
        })
      })
    }

    getParticipation(participationID){
      return this.#fetchAdvanced(this.#getParticipationURL(participationID))
      .then((responseJSON) => {
        let responseParticipationBOs = ParticipationBO.fromJSON(responseJSON)[0];
        return new Promise(function (resolve) {
          resolve(responseParticipationBOs);
        })
      })
    }

    getParticipationsForStudent(studentID){
      return this.#fetchAdvanced(this.#getParticipationsForStudentURL(studentID))
      .then((responseJSON) => {
        let responseParticipationBOs = ParticipationBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(responseParticipationBOs);
        })
      })
    }

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

    updateParticipation(participationBO){
        return this.#fetchAdvanced(this.#updateParticipationURL(participationBO.getID()), {
            method: 'PUT'
            }).then((responseJSON) => {
            let responseParticipationBO = ParticipationBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
              resolve(responseParticipationBO);
            })
          })
    }

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

    //----------Semester-------------------------

    getAllSemester(){
      return this.#fetchAdvanced(this.#getAllSemesterURL()).then((responseJSON) => {
          let responseSemesterBOs = SemesterBO.fromJSON(responseJSON);
          return new Promise(function (resolve){
              resolve(responseSemesterBOs)
          })
      })
    }


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

    //----------Student-------------------------

    getStudent(studentID){
        return this.#fetchAdvanced(this.#getStudentURL(studentID))
        .then((responseJSON) => {
        let responseStudentBOs = StudentBO.fromJSON(responseJSON)[0];
        return new Promise(function (resolve) {
          resolve(responseStudentBOs);
        })
      })
    }

    getStudentForGoogleID(googleID){
      return this.#fetchAdvanced(this.#getStudentForGoogleIDURL(googleID))
      .then((responseJSON) => {
      let responseStudentBOs = StudentBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(responseStudentBOs);
      })
    })
  }

    getStudentForMail(mail){
        return this.#fetchAdvanced(this.#getStudentForMailURL(mail))
        .then((responseJSON) => {
        let responseStudentBOs = StudentBO.fromJSON(responseJSON)[0];
        return new Promise(function (resolve) {
          resolve(responseStudentBOs);
        })
      })
    }

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

    //----------User-------------------------

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

    getUser(userID){
        return this.#fetchAdvanced(this.#getUserURL(userID))
        .then((responseJSON) => {
        let responseUserBOs = UserBO.fromJSON(responseJSON)[0];
        return new Promise(function (resolve) {
          resolve(responseUserBOs);
        })
      })
    }

    getUserForGoogleID(googleID){
      return this.#fetchAdvanced(this.#getUserForGoogleIDURL(googleID))
      .then((responseJSON) => {
      let responseUserBOs = UserBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(responseUserBOs);
      })
    })
  }

    getUserForRole(role){
    return this.#fetchAdvanced(this.#getUserForRoleURL(role))
    .then((responseJSON) => {
    let responseUserBOs = UserBO.fromJSON(responseJSON);
    return new Promise(function (resolve) {
      resolve(responseUserBOs);
      })
    })
  }

    getUserForMail(mail){
      return this.#fetchAdvanced(this.#getUserForMailURL(mail))
        .then((responseJSON) => {
        let responseUserBOs = UserBO.fromJSON(responseJSON)[0];
        return new Promise(function (resolve) {
          resolve(responseUserBOs);
        })
      })
    }

    updateUser(userBO){
        return this.#fetchAdvanced(this.#updateUserURL(userBO.getID()), {
            method: 'PUT'
            }).then((responseJSON) => {
            let responseUserBO = UserBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
              resolve(responseUserBO);
            })
          })
    }

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
