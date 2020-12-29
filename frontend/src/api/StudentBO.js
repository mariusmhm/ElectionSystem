import UserBO from './UserBO';

export default class StudentBO extends UserBO {

    constructor(aMatrikelNr, aStudy) {
        super();
        this.matrikel_nr = aMatrikelNr;
        this.study = aStudy;
    }

    // setting a new Matrikel Number for Student
    setMatrikelNr(aMatrikelNr) {
        this.matrikelNr = aMatrikelNr;
    }

    // getting the Students Matrikel Number
    getMatrikelNr() {
        return this.matrikelNr;
    }

    // setting a new Study for Student
    setStudy(aStudy) {
        this.study = aStudy;
    }

    // getting the Students Study
    getStudy() {
        return this.study;
    }

    // Returns an Array of Students from a given JSON
    static fromJSON(students) {
        let res = [];

        if (Array.isArray(students)) {
            students.forEach((s) => {
                Object.setPrototypeOf(s, StudentBO.prototype);
                res.push(s);
            })
        }
        // it's a single object and not an array
        else {
            let s = students;
            Object.setPrototypeOf(s, StudentBO.prototype);
            res.push(s);
        }
        
        return res;
    }
}