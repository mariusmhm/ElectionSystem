import NamedBusinessObject from './NamedBusinessObject';


export default class GradingBO extends NamedBusinessObject {

/// Represents a grade which can be given a student.

    constructor(aGrading){
        super();
        this.grading=aGrading;
    }

    //Sets the grading
    setGrading(aGrading){
      this.grading = aGrading;
    }

    //Reads out the Grading
    getGrading(){
        return this.grading;
    }

    //Returns an Array of CustomerBOs from a given JSON structure.

    static fromJSON(gradings) {
        let res = [];

        if (Array.isArray(gradings)) {
            gradings.forEach((s) => {
                Object.setPrototypeOf(s, GradingBO.prototype);
                res.push(s);
            })
        }
        // it's a single object and not an array
        else {
            let s = users;
            Object.setPrototypeOf(s, GradingBO.prototype);
            res.push(s);
        }

        return res;
    }
}
