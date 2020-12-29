import BusinessObject from './BusinessObject';


export default class SemesterBO extends BusinessObject {
//Represents a semester BO. 
  
   constructor(aWintersemester, aSubmitProjectsEndDate, aGradingEndDate, aGradingBeginnData, aSubmitProjectsBeginnDate){
      super();
      this.winter_semester = aWintersemester;
      this.submit_projects_end_date = aSubmitProjectsEndDate;
      this.grading_end_date = aGradingEndDate;
      this.submit_projects_beginn_date = aSubmitProjectsBeginnDate;
      this.grading_beginn_date = aGradingBeginnData;
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

   //Sets the end date when the project must become be submited.

   setSubmitProjectsBeginnDate(aSubmitProjectsBeginnDate){
      this.submit_projects_beginn_date = aSubmitProjectsBeginnDate;
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
