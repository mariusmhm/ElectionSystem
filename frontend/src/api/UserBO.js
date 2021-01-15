import NamedBusinessObject from './NamedBusinessObject';


export default class UserBO extends NamedBusinessObject {

/// Represents a user of the electionsystem. It is either a sutdent or a professor.


    constructor(aGoogleID, aFirstname, aEmail, aRole){
        super();
        this.google_user_id=aGoogleID;
        this.firstname=aFirstname;
        this.mail=aEmail;
        this.role=aRole;
    }

   //Sets the Google Id
    setGoogleID(aGoogleID){
        this.google_user_id = aGoogleID;
    }
    //Reads out the Google Id
    getGoogleID(){
        return this.google_user_id;
    }

    //Sets the Firstname
    setFirstname(aFirstname){
        this.firstname = aFirstname;
    }
    //Reads out Firstname
    getFirstname(){
        return this.firstname;
    }

    //Sets the Email
    setMail(aEmail){
        this.mail = aEmail;

    }

    //Reads out Users Email
    getMail(){
        return this.mail

    }

    //sets the Users Role
    setRole(aRole){
        this.role = aRole
    }

    //Returns an Array of UserBOs from a given JSON structure.

    static fromJSON(users) {
        let res = [];

        if (Array.isArray(users)) {
            users.forEach((s) => {
                Object.setPrototypeOf(s, UserBO.prototype);
                res.push(s);
            })
        }
        // it's a single object and not an array
        else {
            let s = users;
            Object.setPrototypeOf(s, UserBO.prototype);
            res.push(s);
        }

        return res;
    }
}
