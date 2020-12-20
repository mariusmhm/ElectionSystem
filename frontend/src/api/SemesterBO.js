import BusinessObject from './BusinessObject';


export default class SemesterBO extends BusinessObject {
//Represents a semester BO. 
  
  constructor(aWintersemester, aSubmitProjectsEndDate, aGradingEndDate, aGradingBeginnData, aSubmitProjectsBeginnDate){
  super();
  this.wintersemester = aWintersemester;
  this.submitProjectsEndDate = aSubmitProjectsEndDate;
  this.gradingEndDate = aGradingEndDate;
  this.submitProjectsBeginnDate = aSubmitProjectsBeginnDate;
  this.gradingBeginnDate = aGradingBeginnData;
 }
 
 //Set if the semster is a wintersemester
 
 setWintersemester(aWintersemester){
    this.wintersemester = aWintersemester;
 }
 
 //Reads out if the semester is a wintersemester.
 
 getWintersemester(){
    return this.wintersemesterintersemester;
 }
 
 //Sets the SubmitProjectEndDate.
 
 setSubmitProjectsEndDate(aSubmitProjectsEndDate){
    this.submitProjectsEndDate = aSubmitProjectsEndDate;
 }
 
 //Readout the SubmitProjectEndDate.
 
 getSubmitProjectsEndDate(){
    return this.submitProjectsEndDate;
 }
  
 //Sets the end date when the project must become a grading.

 setGradingEndDate(aGradingEndDate){
    this.gradingEndDate = aGradingEndDate;
 }

 //Reads out the enddate of Grading of a project.

 getGradingEndDate(){
    return this.gradingEndDate;
 }

 //Reads out the beginn date of Grading of a project.

 getGradingBeginnDate(){
    return this.gradingBeginnDate;
 }

 //Sets the beginn date when the project must become a grading.

 setGradingBeginnDate(aGradingBeginnData){
    this.gradingBeginnDate = aGradingBeginnData;
 }

 //Reads out the beginn date of submit of a project.

 getSubmitProjectsBeginnDate(){
    return this.submitProjectsBeginnDate;
 }

 //Sets the end date when the project must become be submited.

 setSubmitProjectsBeginnDate(aSubmitProjectsBeginnDate){
    this.submitProjectsBeginnDate = aSubmitProjectsBeginnDate;
 }


//Returns an Array of SemesterBO from a given JSON structure.

    static fromJSON(semesters) {
        let res = [];

        if (Array.isArray(semesters)) {
            semesters.forEach((s) => {
                Object.setPrototypeOf(s, SemesterBO.prototype);
                res.push(s);
            })
        }
        // it's a single object and not an array
        else {
            let s = semesters;
            Object.setPrototypeOf(s, SemesterBO.prototype);
            res.push(s);
        }

        return res;
        
  }
 }
