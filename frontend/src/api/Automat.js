export default class Automat {

    // default null constructor
    constructor(aState) {
        this.state = aState;
    }

    // setting the state
    setState(aState) {
        this.state = aState;
    }

    // getting the state
    getState() {
        return this.state;
    }


}