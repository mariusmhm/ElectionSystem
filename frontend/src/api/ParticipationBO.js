import BusinessObject from './BusinessObject';

export default class ParticipationBO extends BusinessObject {
    

    constructor(aPriority, aGradingID, aStudentID, aProjectID){
        super();
        this.priority = aPriority;
        this.grading_id = aGradingID;
        this.student_id = aStudentID;
        this.project_id = aProjectID;
    }

    setPriority(aPriority){
        this.priority = aPriority;
    }
  
      
    getPriority(){
        return this.priority;
    }

    setGradingID(aGradingID){
        this.grading_id = aGradingID;
    }

    getGradingID(){
        return this.grading_id;
    }

    setStudentID(aStudentID){
        this.student_id = aStudentID;
    }

    getStudentID(){
        return this.student_id;
    }

    setProjectID(aProjectID){
        this.project_id = aProjectID;
    }

    getProjectID(){
        return this.project_id;
    }

    
  
      //Returns an Array of ParticipationBOs from a given JSON structure.
  
    static fromJSON(participations) {
        let result = [];
  
        if (Array.isArray(participations)) {
            participations.forEach((p) => {
                Object.setPrototypeOf(p, ParticipationBO.prototype);
                result.push(p);
            })
        }
          // it's a single object and not an array
        else{
            let p = participations;
            Object.setPrototypeOf(p, ParticipationBO.prototype);
            result.push(p);
        }
  
        return result;
    }
  
}