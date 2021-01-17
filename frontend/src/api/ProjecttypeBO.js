import NamedBusinessObject from './NamedBusinessObject';

export default class ProjecttypeBO extends NamedBusinessObject {
/// Represents a projecttype which can be given a project.

  constructor(aEcts, aSws){
  super();
  this.sws = aSws;
  this.ect = aEcts;
  }
  
  //Sets the SWS for the projecttype.
  
  setSws(aSws){
    this.sws = aSws;
  }
  
  //Reads out the Sws from a projecttype.
  
  getSws(){
    return this.sws;
  }
  
  //Sets the ECTs for a projecttype. 
  
  setEcts(aEcts){
    this.ect= aEcts;
  }
  
  //Reads out the ECTs from a projecttype.
  
  getEcts(){
    return this.ect;
  }
  
  // Returns an Array of ProjecttypeBO from a given JSON
  
    static fromJSON(projecttypes) {
        let res = [];
        console.log("json wird aufgerufen");
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
    
  
  
