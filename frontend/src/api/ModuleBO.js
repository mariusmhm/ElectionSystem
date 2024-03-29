import NamedBusinessObject from './NamedBusinessObject';


export default class ModuleBO extends NamedBusinessObject {

/// Represents a module which can be given a project.

    constructor(aEdvNumber){
        super();
        this.edv_number=aEdvNumber;
    }

    //Set the EDV Number

     setEdvNumber(aEdvNumber){
        this.edv_number= aEdvNumber;
     }

     //Reads out the edv number of a module
     getEdvNumber(){
        return this.edv_number;
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
            let s = modules;
            Object.setPrototypeOf(s, ModuleBO.prototype);
            res.push(s);
        }

        return res
    }
}
