import BusinessObject from './BusinessObject';


export default class SemesterBO extends BusinessObject {
//Represents a semester BO. 
  
   constructor(aWintersemester, aSubmitProjectsEndDate, aGradingEndDate, aElectionEndDate, aGradingBeginnData, aSubmitProjectsBeginnDate, aElectionBeginnDate){
      super();
      this.winter_semester = aWintersemester;
      this.submit_projects_end_date = aSubmitProjectsEndDate;
      this.grading_end_date = aGradingEndDate;
      this.election_end_date = aElectionEndDate;
      this.submit_projects_beginn_date = aSubmitProjectsBeginnDate;
      this.grading_beginn_date = aGradingBeginnData;
      this.election_beginn_date = aElectionEndDate;
   }
 
   //Set if the semster is a wintersemester
 
   setWintersemester(aWintersemester){
      this.winter_semester = aWintersemester;
   }
 
   //Reads out if the semester is a wintersemester.
 
   getWintersemester(){
      return this.winter_semester;
   }
 
   //Sets the SubmitProjectEndDate.
 
   setSubmitProjectsEndDate(aSubmitProjectsEndDate){
      this.submit_projects_end_date = aSubmitProjectsEndDate;
   }
 
   //Readout the SubmitProjectEndDate.
 
   getSubmitProjectsEndDate(){
      return this.submit_projects_end_date;
   }
  
   //Sets the end date when the project must become a grading.

   setGradingEndDate(aGradingEndDate){
      this.grading_end_date = aGradingEndDate;
   }

   //Reads out the enddate of Grading of a project.

   getGradingEndDate(){
      return this.grading_end_date;
   }

   //Sets the end date for Election

   setElectionEndDate(aElectionEndDate){
      this.election_end_date = aElectionEndDate;
   }

   //Reads out the enddate of Election

   getElectionEndDate(){
      return this.election_end_date;
   }

   //Reads out the beginn date of Grading of a project.

   getGradingBeginnDate(){
      return this.grading_beginn_date;
   }

   //Sets the beginn date when the project must become a grading.

   setGradingBeginnDate(aGradingBeginnData){
      this.grading_beginn_date = aGradingBeginnData;
   }

   //Reads out the beginn date of submit of a project.

   getSubmitProjectsBeginnDate(){
      return this.submit_projects_beginn_date;
   }

   //Sets the beginn date when the project must become be submited.

   setSubmitProjectsBeginnDate(aSubmitProjectsBeginnDate){
      this.submit_projects_beginn_date = aSubmitProjectsBeginnDate;
   }

   //Sets the beginn date for the election

   setElectionBeginnDate(aElectionBeginnDate){
      this.election_beginn_date = aElectionBeginnDate;
   }

   //Reads out the beginn date of the election
   
   getElectionBeginnDate(){
      return this.election_beginn_date;
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
