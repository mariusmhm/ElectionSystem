

export default class State {

    /// Represents a state 
    
        constructor(aId, aName){
            
            this.id=aId;
            this.name=aName;
        }
    
        //Sets the id
        setID(aID){
          this.id = aID;
        }
    
        //Reads out the id
        getID(){
            return this.id;
        }

        //Sets the name
        setName(aName){
            this.name = aName;
          }
      
        //Reads out the name
        getName(){
            return this.name;
        }
    
        //Returns an Array of States from a given JSON structure.
    
        static fromJSON(states) {
            let result = [];
    
            if (Array.isArray(states)) {
                states.forEach((s) => {
                    Object.setPrototypeOf(s, State.prototype);
                    result.push(s);
                })
            }
            // it's a single object and not an array
            else {
                let s = states;
                Object.setPrototypeOf(s, State.prototype);
                result.push(s);
            }
    
            return result;
        }
    }

    