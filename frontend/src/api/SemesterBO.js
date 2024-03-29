import NamedBusinessObject from './NamedBusinessObject';


export default class SemesterBO extends NamedBusinessObject {
//Represents a semester BO. 
  
   constructor( aSubmitProjects, aGrading, aElection){
      super();
      this.submit_projects = aSubmitProjects;
      this.grading = aGrading;
      this.election = aElection;
   }
 
   //Sets the SubmitProject
 
   setSubmitProjects(aSubmitProjects){
      this.submit_projects = aSubmitProjects;
   }
 
   //Reads out the SubmitProject
 
   getSubmitProjects(){
      return this.submit_projects;
   }
  
   //Sets grading.

   setGrading(aGrading){
      this.grading = aGrading;
   }

   //Reads out grading of a project.

   getGrading(){
      return this.grading;
   }

   //Sets Election

   setElection(aElection){
      this.election = aElection;
   }

   //Reads out Election

   getElection(){
      return this.election;
   }


   //Returns an Array of SemesterBO from a given JSON structure.

    static fromJSON(semester) {
        let res = null;

         let s = semester;
         Object.setPrototypeOf(s, SemesterBO.prototype);
         res = s;
        

        return res;
        
  }
 }
