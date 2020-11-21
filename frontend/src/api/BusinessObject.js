// Business Object Class for all Business Objects
// has an ID field for default

export default class BusinessObject {

    // default null constructor
    constructor() {
        this.id = 0;
    }

    // setting the BOs ID
    setID(aId) {
        this.id = aId;
    }

    // getting the BOs ID
    getID() {
        return this.id;
    }

}