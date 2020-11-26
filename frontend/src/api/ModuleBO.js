import BusinessObject from './BusinessObject'; // Don`t know if this is needed
import NamedBusinessObject from './NamedBusinessObject';


export default class UserBO extends NamedBusinessObject {

/// Represents a module which can be given a project.

    constructor(aEdvNumber){
        super();
        this.edvNumber=aEdvNumber;
    }

    //Set the EDV Number

     setEdvNumber(aEdvNumber){
        this.edvNumber= aEdvNumber;
     }

     //Reads out the edv number of a module
     getEdvNumber(){
        return this.edvNumber;
     }

      //Returns an Array of ModuleBO from a given JSON structure.

    static fromJSON(modules) {
        let res = [];

        if (Array.isArray(modules)) {
            modules.forEach((s) => {
                Object.setPrototypeOf(s, ModuleBO.prototype);
                res.push(s);
            })
        }
        // it's a single object and not an array
        else {
            let s = users;
            Object.setPrototypeOf(s, ModuleBO.prototype);
            res.push(s);
        }

        return res;



