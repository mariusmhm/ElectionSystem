import NamedBusinessObject from './NamedBusinessObject';

export default class ProjectBO extends NamedBusinessObject{
/// Represents a Project.

    constructor(aShortDescription, aRoomDesired,aNumBlockDaysInExam, aSpecialRoom,
                aDateBlockDaysDuringLecture, aNumBlockDaysPriorLecture, aNumBlockDaysDuringLecture,
                aWeekly, aNumSpots, aLanguage, aExternalPartner, aEdvNumber, aProjectType, aModule, aProfessor, aAddProfessor, aCurrentState){
        super();

        this.short_description = aShortDescription;
        this.special_room = aSpecialRoom;
        this.room_desired = aRoomDesired;
        this.num_blockdays_prior_lecture = aNumBlockDaysPriorLecture;
        this.date_blockdays_during_lecture = aDateBlockDaysDuringLecture;
        this.num_blockdays_during_lecture = aNumBlockDaysDuringLecture;
        this.num_blockdays_in_exam = aNumBlockDaysInExam;
        this.weekly = aWeekly;
        this.num_spots = aNumSpots;
        this.language = aLanguage;
        this.external_partner = aExternalPartner;
        this.edv_number = aEdvNumber
        this.projecttype_id = aProjectType;
        this.module_id = aModule;
        this.professor_id = aProfessor;
        this.add_professor_id = aAddProfessor;
        this.current_state_id = aCurrentState;

    }




    // setting the state
    setState(aCurrentState){
        this.current_state_id = aCurrentState;
    }

    // getting the state
    getState(){
        return this.current_state_id;
    }

    getAddProfessor(){
    //Read out of the additional professor.
        return this.add_professor_id;
    }

    setAddProfessor(aAddProfessor){
    //Set the additional professor
        this.add_professor_id =  aAddProfessor;
    }

    getLanguage(){
    //Reads out the language.
        return this.language
    }

    setLanguage(aLanguage){
    //Sets the language
        this.language = aLanguage;
    }

    getExternalPartner(){
    //Reads out the external Partner
        return this.external_partner;
    }

    setExternalPartner(aExternalPartner){
    //Sets the external Partner
        this.external_partner = aExternalPartner;
    }

    getRoomDesired(){
        //Read out room.
        return this.room_desired;
    }

    setRoomDesired(aRoomDesired){
        //Set the room.
        this.room_desired = aRoomDesired;
    }

    getNumBlockDaysInExam(){
        //Read out of the numBlockDaysInExam.
        return this.num_blockdays_in_exam;
    }

    setNumBlockDaysInExam(aNumBlockDaysInExam){
        //Set the numBlockDaysInExam.
        this.num_blockdays_in_exam = aNumBlockDaysInExam;
    }


    getSpecialRoom(){
        //Read out of the special room.
        return this.special_room;
    }

    setSpecialRoom(aSpecialRoom){
        //Set the special room.
        this.special_room = aSpecialRoom;
    }

    getDateBlockDaysDuringLecture(){
        //Read out of the dateBlockDaysDuringLecture.
        return this.date_blockdays_during_lecture;
    }

    setDateBlockDaysDuringLecture(aDateBlockDaysDuringLecture){
        //Set the dateBlockDaysDuringLecture.
        this.date_blockdays_during_lecture = aDateBlockDaysDuringLecture;
    }

    getNumBlockDaysPriorLecture(){
        //Read out of the NumBlockDaysPriorLecture .
        return this.num_blockdays_prior_lecture;
    }

    setNumBlockDaysPriorLecture(aNumBlockDaysPriorLecture){
        //Set the NumBlockDaysPriorLecture .
        this.num_blockdays_prior_lecture = aNumBlockDaysPriorLecture;
    }

    getNumBlockDaysDuringLecture(){
        //Read out of the NumBlockDaysDuringLecture .
        return this.num_blockdays_during_lecture;
    }

    setNumBlockDaysDuringLecture(aNumBlockDaysDuringLecture){
        //Set the NumBlockDaysDuringLecture .
        this.num_blockdays_during_lecture = aNumBlockDaysDuringLecture;
    }

    getWeekly(){
        //Read out of the weekly.
        return this.weekly;
    }

    setWeekly(aWeekly){
        //Set the weekly .
        this.weekly = aWeekly;
    }

    getShortDescription(){
        //Read out of the shortDescription.
        return this.short_description;
    }

    setShortDescription(aShortDescription){
        //Set the shortDescription.
        this.short_description = aShortDescription;
    }

    getNumSpots(){
        //Read out of the numSpots.
        return this.num_spots;
    }

    setNumSpots(aNumSpots){
        //Set the numSpots.
        this.num_spots = aNumSpots;
    }

    getEdvNumber(){
        //Read out of the module.
        return this.edv_number;
    }

    setEdvNumber(aEdvNumber){
        //Set the module.
        this.edv_number = aEdvNumber;
    }

    getProjecttype(){
        //Read out of the projectType.
        return this.projecttype_id;
    }

    setProjecttype(aProjectType){
        //Set the project type.
        this.projecttype_id = aProjectType;
    }

    getModule(){
        //Read out of the module.
        return this.module_id;
    }

    setModule(aModule){
        //Set the module.
        this.module_id = aModule;
    }

    getProfessor(){
        //Read out of the module.
        return this.professor_id;
    }

    setProfessor(aProfessor){
        //Set the module.
        this.professor_id = aProfessor;
    }



    // Returns an Array of ProjectBO from a given JSON

    static fromJSON(projects) {
        let res = [];

        if (Array.isArray(projects)) {
            projects.forEach((s) => {
                Object.setPrototypeOf(s, ProjectBO.prototype);
                res.push(s);
            })
        }
        // it's a single object and not an array
        else {
            let s = projects;
            Object.setPrototypeOf(s, ProjectBO.prototype);
            res.push(s);
        }

        return res;
    }
  }