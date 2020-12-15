import BusinessObject from './BusinessObject';


export default class GradingBO extends BusinessObject {

/// Represents a grade which can be given a student.

    constructor(aGrade){
        super();
        this.grade=aGrade;
    }

    //Sets the grading
    setGrade(aGrade){
      this.grade = aGrade;
    }

    //Reads out the Grading
    getGrade(){
        return this.grade;
    }

    //Returns an Array of CustomerBOs from a given JSON structure.

    static fromJSON(gradings) {
        let result = [];
        console.log('from json aufgerufen');

        if (Array.isArray(gradings)) {
            gradings.forEach((g) => {
                Object.setPrototypeOf(g, GradingBO.prototype);
                result.push(g);
            })
        }
        // it's a single object and not an array
        else {
            let g = gradings;
            Object.setPrototypeOf(g, GradingBO.prototype);
            result.push(g);
        }

        return result;
    }
}
