import NamedBusinessObject from './NamedBusinessObject';


export default class UserBO extends NamedBusinessObject {

/// Represents a user of the electionsystem. It is either a sutdent or a professor.


    constructor(aUserId, aEmail, aRole){
        super();
        this.userId=aUserId;
        this.email=aEmail;
        this.role=aRole;
    }

   //Sets the UserId
    setUserId(aUserId){
        this.userId = aUserId;
    }
    //Reads out the UserId
    getUserId(){
        return this.userId;
    }

    //Sets the Users Email
    setUserMail(aEmail){
        this.email = aEmail;

    }

    //Reads out Users Email
    getUserMail(){
        return this.email

    }

    //sets the Users Role
    setRole(aRole){
        this.role = aRole
    }

    //Returns an Array of CustomerBOs from a given JSON structure.

    static fromJSON(students) {
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
