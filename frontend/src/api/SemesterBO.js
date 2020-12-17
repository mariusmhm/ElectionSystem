import NamedBusinessObject from './NamedBusinessObject';


export default class SemesterBO extends NamedBusinessObject {
//Represents a semester BO. 
  
  constructor(aWintersemester, aSubmitProjectEndDate, aGradingEndDate){
  super();
  this.Wintersemester = aWintersemester;
  this.SubmitProjectEndDate = aSubmitProjectEndDate;
  this.GradingEndDate = aGradingEndDate;
 }
 
 //Set if the semster is a wintersemester
 
 setWintersemester(aWintersemester){
    this.Wintersemester = aWintersemester; 
 }
 
 //Reads out if the semester is a wintersemester.
 
 getWintersemester(){
    return this.Wintersemester;
 }
 
 //Sets the SubmitProjectEndDate.
 
 setSubmitProjectEndDate(aSubmitProjectEndDate){
    this.SubmitProjectEndDate = aSubmitProjectEndDate;
 }
 
 //Readout the SubmitProjectEndDate.
 
 getSubmitProjectEndDate(){
    return this.SubmitProjectEndDate;
 }
  
 //Sets the end date when the project must become a grading.

 setGradingEndDate(aGradingEndDate){
    this.GradingEndDate = aGradingEndDate;
 }

 //Reads out the enddate of Grading of a project.

 getGradingEndDate(){
    return this.EndDateGrading;
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
