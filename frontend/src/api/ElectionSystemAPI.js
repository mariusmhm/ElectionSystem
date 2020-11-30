import GradingBO from './GradingBO';
import ModuleBO from './ModuleBO';
import PartcipationBO from './ParticipationBO';
import ProjectBO from './ProjectBO';
import ProjecttypeBO from './ProjecttypeBO';
import SemesterBO from './SemesterBO';
import StudentBO from './StudentBO';
import UserBO from './UserBO';

export default class ElectionSystemAPI {

    static #api = null;

    #electionSystemServerBaseURL ='/electionsystem'

    //Project
    #getProjectsURL = () => `${this.#electionSystemServerBaseURL}/projects`;
    #addProjectURL = () => `${this.#electionSystemServerBaseURL}/projects`;
    #getProjectURL = (id) => `${this.#electionSystemServerBaseURL}/projects/${id}`;
    #updateProjectURL = (id) => `${this.#electionSystemServerBaseURL}/projects/${id}`;
    #deleteProjectURL = (id) => `${this.#electionSystemServerBaseURL}/projects/${id}`;
    


    //Project type
    #getAllProjecttypesURL = () => `${this.#electionSystemServerBaseURL}/projecttypes`;
    #getProjecttypeForProjectURL = (id) => `${this.#electionSystemServerBaseURL}/projects/${id}/projecttype`;
    #addProjecttypeURL = () => `${this.#electionSystemServerBaseURL}/projecttype`;
    #updateProjecttypeURL = (id) => `${this.#electionSystemServerBaseURL}/projecttype/${id}`
    #deleteProjecttypeURL = (id) => `${this.#electionSystemServerBaseURL}/projecttype/${id}`;

    //Module
    #getAllModulesURL = (id) => `${this.#electionSystemServerBaseURL}/modules`;
    #getModuleForProjectURL = (id) => `${this.#electionSystemServerBaseURL}/projects/${id}/module`;
    #addModuleURL = () => `${this.#electionSystemServerBaseURL}/module`;
    #updateModuleURL = (id) => `${this.#electionSystemServerBaseURL}/module/${id}`
    #deleteModuleURL = (id) => `${this.#electionSystemServerBaseURL}/module/${id}`;

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

    getAllModules(){
        return this.#fetchAdvanced(this.#getAllModulesURL()).then((responseJSON) => {
            let moduleBOs = ModuleBO.fromJSON(responseJSON);
            return new Promise(function (resolve){
                resolve(moduleBOs)
            })
        }) 
    }

    getAllProjecttypes(){
        return this.#fetchAdvanced(this.#getAllProjecttypesURL())
        .then((responseJSON)=> {
            let projecttypeBOs =ProjecttypeBO.fromJSON(responseJSON);
            return new Promise(function(resolve){
                resolve(projecttypeBOs);
            })
        })
    }
}