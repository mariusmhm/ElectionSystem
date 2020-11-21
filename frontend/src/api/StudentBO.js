import BusinessObject from './BusinessObject'; // do i have to import it when it's imported in NBO??
import NamedBusinessObject from './NamedBusinessObject';

export default class StudentBO extends NamedBusinessObject {

    constructor(aStudentMail, aPassword, aRole, aMatrikelNr, aStudy) {
        super();
        this.studentMail = aStudentMail;
        this.password = aPassword;
        this.role = aRole;
        this.matrikelNr = aMatrikelNr;
        this.study = aStudy;
    }

/*     setStudentId(aStudentId) {
        this.aStudentId = aStudentId;
    }

    getStudentId() {
        return this.aStudentId;
    }

    setStudentName(aStudentName) {
        this.aStudentName = aStudentName;
    }

    getStudentName() {
        return this.aStudentName;
    } */

    // setting a new Mail-Adress for Student
    setStudenMail(aStudentMail) {
        this.studentMail = aStudentMail;
    }

    // getting the Students Mail-Adress
    getStudentMail() {
        return this.studentMail;
    }

    // setting a new Password for Student
    setPassword(aPassword) {
        this.password = aPassword;
    }

    // getting the Students Password
    getPassword() {
        return this.password;
    }

    // idk if we need this 
    setRole(aRole) {
        this.role = aRole;
    }

    // same like setRole
    getRole() {
        return this.role;
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