import GradingBO from './GradingBO';
import ModuleBO from './ModuleBO';
import ParticipationBO from './ParticipationBO';
import ProjectBO from './ProjectBO';
import ProjecttypeBO from './ProjecttypeBO';
import SemesterBO from './SemesterBO';
import StudentBO from './StudentBO';
import UserBO from './UserBO';

export default class ElectionSystemAPI {

    static #api = null;

    #electionSystemServerBaseURL ='/electionsystem'

    //Project
    #getAllProjectsURL = () => `${this.#electionSystemServerBaseURL}/projects`;
    #addProjectURL = () => `${this.#electionSystemServerBaseURL}/projects`;
    #getProjectURL = (id) => `${this.#electionSystemServerBaseURL}/projects/${id}`;
    #updateProjectURL = (id) => `${this.#electionSystemServerBaseURL}/projects/${id}`;
    #deleteProjectURL = (id) => `${this.#electionSystemServerBaseURL}/projects/${id}`;
    
    //Project type
    #getAllProjecttypesURL = () => `${this.#electionSystemServerBaseURL}/projecttypes`;
    #getProjecttypeForProjectURL = (id) => `${this.#electionSystemServerBaseURL}/projects/${id}/projecttype`;
    #addProjecttypeURL = () => `${this.#electionSystemServerBaseURL}/projecttype`;
    #updateProjecttypeURL = (id) => `${this.#electionSystemServerBaseURL}/projecttype/${id}`;
    #deleteProjecttypeURL = (id) => `${this.#electionSystemServerBaseURL}/projecttype/${id}`;

    //Module
    #getAllModulesURL = () => `${this.#electionSystemServerBaseURL}/modules`;
    #getModuleForProjectURL = (id) => `${this.#electionSystemServerBaseURL}/projects/${id}/module`;
    #addModuleURL = () => `${this.#electionSystemServerBaseURL}/module`;
    #updateModuleURL = (id) => `${this.#electionSystemServerBaseURL}/module/${id}`;
    #deleteModuleURL = (id) => `${this.#electionSystemServerBaseURL}/module/${id}`;
    
    //Grading
    #getGradeForParticipationURL = (id)=> `${this.#electionSystemServerBaseURL}/participation/${id}/grade`;
    #addGradeURL = () => `${this.#electionSystemServerBaseURL}/grade`;
    #updateGradeURL = (id) => `${this.#electionSystemServerBaseURL}/grade/${id}`;
    #deleteGradeURL = (id) => `${this.#electionSystemServerBaseURL}/grade/${id}`;
    
    //Participation
    #getAllParticipationsForProjectURL = (id) => `${this.#electionSystemServerBaseURL}/projects/${id}/participations`;
    #addParticipationURL = () => `${this.#electionSystemServerBaseURL}/participation`;
    #updateParticipationURL = (id) => `${this.#electionSystemServerBaseURL}/participation/${id}`;
    #deleteParticipationURL = (id) => `${this.#electionSystemServerBaseURL}/participation/${id}`;

    //Semester
    #addSemesterURL = () => `${this.#electionSystemServerBaseURL}/semester`;
    #updateSemesterURL = (id) => `${this.#electionSystemServerBaseURL}/semester/${id}`;

    //Student 
    #getStudentURL = (id) => `${this.#electionSystemServerBaseURL}/student/${id}`;
    #addStudentURL =() =>  `${this.#electionSystemServerBaseURL}/student`;

    //User
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
    
    /** 
    *@param {ProjectBO} projectBO
    *@public
    */
    addProject(projectBO){
        return this.#fetchAdvanced(this.#addProjectURL(), {
            method: 'POST'
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
        return this.#fetchAdvanced(this.#updateProjectURL(projectBO.getID()), {
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

     /** 
    *@public
    */
   getAllProjecttypes(){
        return this.#fetchAdvanced(this.#getAllProjecttypesURL()).then((responseJSON)=> {
            let projecttypeBOs =ProjecttypeBO.fromJSON(responseJSON);
            console.info(projecttypeBOs);
            return new Promise(function(resolve){
                resolve(projecttypeBOs);
            })
        })
    }

    getProjecttypeForProject(projectID){
        return this.#fetchAdvanced(this.#getProjecttypeForProjectURL(projectID))
        .then((responseJSON) => {
        let projecttypeBOs = ProjecttypeBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(projecttypeBOs);
        })
      })
    }

    addProjecttypeURL(){
        return this.#fetchAdvanced(this.#addProjecttypeURL(), {
            method: 'POST'
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

    getModuleForProject(projectID){
        return this.#fetchAdvanced(this.#getModuleForProjectURL(projectID))
        .then((responseJSON) => {
        let responseModuleBOs = ModuleBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(responseModuleBOs);
        })
      })
    }

    addModule(){
        return this.#fetchAdvanced(this.#addModuleURL(), {
            method: 'POST'
          })
            .then((responseJSON) => {
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

    getGradeForParticipation(participationID){
        return this.#fetchAdvanced(this.#getGradeForParticipationURL(participationID))
        .then((responseJSON) => {
        let responseGradeBOs = GradeBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(responseGradeBOs);
        })
      })
    }
    
    addGrade(){
        return this.#fetchAdvanced(this.#addGradeURL(), {
            method: 'POST'
          })
            .then((responseJSON) => {
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

    getAllParticipationsForProject(projectID){
        return this.#fetchAdvanced(this.#getAllParticipationsForProjectURL(projectID))
        .then((responseJSON) => {
        let responseParticipationBOs = ParticipationBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(responseParticipationBOs);
        })
      })
    }

    addParticipation(){
        return this.#fetchAdvanced(this.#addParticipationURL(), {
            method: 'POST'
          })
            .then((responseJSON) => {
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

    addSemester(){
        return this.#fetchAdvanced(this.#addSemesterURL(), {
            method: 'POST'
          })
            .then((responseJSON) => {
              let responseSemesterBO = SemesterBO.fromJSON(responseJSON)[0];
              return new Promise(function (resolve) {
                resolve(responseSemesterBO);
              })
            })
    }

    updateSemester(semesterBO){
        return this.#fetchAdvanced(this.#updateSemesterURL(semesterBO.getID()), {
            method: 'PUT'
            }).then((responseJSON) => {
            let responseSemesterBO = SemesterBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
              resolve(responseSemesterBO);
            })
          })
    }

    getStudent(studentID){
        return this.#fetchAdvanced(this.#getStudentURL(studentID))
        .then((responseJSON) => {
        let responseStudentBOs = StudentBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(responseStudentBOs);
        })
      })
    }

    addStudent(){
        return this.#fetchAdvanced(this.#addStudentURL(), {
            method: 'POST'
          })
            .then((responseJSON) => {
              let responseStudentBO = StudentBO.fromJSON(responseJSON)[0];
              return new Promise(function (resolve) {
                resolve(responseStudentBO);
              })
            })
    }

    getUser(userID){
        return this.#fetchAdvanced(this.#getUserURL(userID))
        .then((responseJSON) => {
        let responseUserBOs = UserBO.fromJSON(responseJSON);
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