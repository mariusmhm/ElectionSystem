import BusinessObject from './BusinessObject'; // do i have to import it when it's imported in NBO??
import NamedBusinessObject from './NamedBusinessObject';

export default class ProjecttypeBO extends NamedBusinessObject {
/// Represents a projecttype which can be given a project.

  constructor(aEcts, aSws){
  super();
  this.Sws = aSws;
  this.Ects = aEcts;
  }
  
  //Sets the SWS for the projecttype.
  
  setSws(aSws){
    this.Sws = aSws;
  }
  
  //Reads out the Sws from a projecttype.
  
  getSws(){
    return this.Sws;
  }
  
  //Sets the ECTs for a projecttype. 
  
  setEcts(aEcts){
    this.Ects= aEcts;
  }
  
  //Reads out the ECTs from a projecttype.
  
  getEcts(){
    return this.Ects;
  }
  
  // Returns an Array of Students from a given JSON
  
    static fromJSON(projecttypes) {
        let res = [];

        if (Array.isArray(projecttypes)) {
            projecttypes.forEach((s) => {
                Object.setPrototypeOf(s, ProjecttypeBO.prototype);
                res.push(s);
            })
        }
        // it's a single object and not an array
        else {
            let s = projecttypes;
            Object.setPrototypeOf(s, ProjecttypeBO.prototype);
            res.push(s);
        }
        
        return res;
    }
  }
    
  
  
