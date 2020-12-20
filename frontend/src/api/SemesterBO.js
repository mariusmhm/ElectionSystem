import BusinessObject from './BusinessObject';


export default class SemesterBO extends BusinessObject {
//Represents a semester BO. 
  
  constructor(aWintersemester, aSubmitProjectEndDate, aGradingEndDate){
  super();
  this.wintersemester = aWintersemester;
  this.submitProjectEndDate = aSubmitProjectEndDate;
  this.gradingEndDate = aGradingEndDate;
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
 
 setSubmitProjectEndDate(aSubmitProjectEndDate){
    this.submitProjectEndDate = aSubmitProjectEndDate;
 }
 
 //Readout the SubmitProjectEndDate.
 
 getSubmitProjectEndDate(){
    return this.submitProjectEndDate;
 }
  
 //Sets the end date when the project must become a grading.

 setGradingEndDate(aGradingEndDate){
    this.gradingEndDate = aGradingEndDate;
 }

 //Reads out the enddate of Grading of a project.

 getGradingEndDate(){
    return this.gradingEndDate;
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
