import NamedBusinessObject from './NamedBusinessObject';

export default class ProjectBO extends NamedBusinessObject {
/// Represents a Project.

    constructor(aRoomDesired,aGradeAverage,aNumBlockDaysInExam, aBlockDaysInExam, aSpecialRoom,
                aDateBlockDaysDuringLecture, aNumBlockDaysPriorLecture,aBlockDaysPriorLectureTrue,aNumBlockDaysDuringLecture,
                aBlockDaysDuringLecture,aWeekly,aShortDescription,aNumSpots,aProjectType, aModule, aProfessor, aParticipation, aAddProfessor,
                aLanguage, aExternalPartner){
        super();

        this.roomDesired = aRoomDesired;
        this.numBlockDaysInExam = aNumBlockDaysInExam;
        this.specialRoom = aSpecialRoom;
        this.dateBlockDaysDuringLecture = aDateBlockDaysDuringLecture;
        this.numBlockDaysPriorLecture = aNumBlockDaysPriorLecture;
        this.numBlockDaysDuringLecture = aNumBlockDaysDuringLecture;
        this.weekly = aWeekly;
        this.shortDescription = aShortDescription;
        this.numSpots = aNumSpots;
        this.projectType = aProjectType;
        this.module = aModule;
        this.projectProfessor = aProfessor;
        this.addProfessor = aAddProfessor;
        this.language = aLanguage;
        this.externalPartner = aExternalPartner;

    }



    getAddProfessor(){
    //Read out of the additional professor.
        return this.addProfessor;
    }

    setAddProfessor(aAddProfessor){
    //Set the additional professor
        this.addProfessor =  aAddProfessor;
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
        return this.externalPartner;
    }

    setExternalPartner(aExternalPartner){
    //Sets the external Partner
        this.externalPartner = aExternalPartner;
    }

    getRoomDesired() {
        //Read out room.
        return this.roomDesired;
    }

    setRoomDesired(aRoomDesired){
        //Set the room.
        this.roomDesired = aRoomDesired;
    }

    setGradeAverage(aGradeAverage){
        //Set the gradeAverage.
        this.gradeAverage = aGradeAverage;
    }


    getNumBlockDaysInExam() {
        //Read out of the numBlockDaysInExam.
        return this.numBlockDaysInExam;
    }

    setNumBlockDaysInExam(aNumBlockDaysInExam){
        //Set the numBlockDaysInExam.
        this.numBlockDaysInExam = aNumBlockDaysInExam;
    }


    getSpecialRoom() {
        //Read out of the special room.
        return this.specialRoom;
    }

    setSpecialRoom(aSpecialRoom){
        //Set the special room.
        this.specialRoom = aSpecialRoom;
    }

    getDateBlockDaysDuringLecture() {
        //Read out of the dateBlockDaysDuringLecture.
        return this.dateBlockDaysDuringLecture;
    }

    setDateBlockDaysDuringLecture(aDateBlockDaysDuringLecture){
        //Set the dateBlockDaysDuringLecture.
        this.dateBlockDaysDuringLecture = aDateBlockDaysDuringLecture;
    }

    getNumBlockDaysPriorLecture() {
        //Read out of the NumBlockDaysPriorLecture .
        return this.numBlockDaysPriorLecture;
    }

    setNumBlockDaysPriorLecture(aNumBlockDaysPriorLecture){
        //Set the NumBlockDaysPriorLecture .
        this.numBlockDaysPriorLecture = aNumBlockDaysPriorLecture;
    }

    getNumBlockDaysDuringLecture() {
        //Read out of the NumBlockDaysDuringLecture .
        return this.numBlockDaysDuringLecture;
    }

    setNumBlockDaysDuringLecture(aNumBlockDaysDuringLecture){
        //Set the NumBlockDaysDuringLecture .
        this.numBlockDaysDuringLecture = aNumBlockDaysDuringLecture;
    }

    getWeekly() {
        //Read out of the weekly.
        return this.weekly;
    }

    setWeekly(aWeekly){
        //Set the weekly .
        this.weekly = aWeekly;
    }

    getShortDescription() {
        //Read out of the shortDescription.
        return this.shortDescription;
    }

    setShortDescription(aShortDescription){
        //Set the shortDescription.
        this.shortDescription = aShortDescription;
    }

    getNumSpots() {
        //Read out of the numSpots.
        return this.numSpots;
    }

    setNumSpots(aNumSpots){
        //Set the numSpots.
        this.numSpots = aNumSpots;
    }

    getProjectType() {
        //Read out of the projectType.
        return this.projectType;
    }

    setProjectType(aProjectType){
        //Set the project type.
        this.projectType = aProjectType;
    }

    getModule() {
        //Read out of the module.
        return this.module;
    }

    setModule(aModule){
        //Set the module.
        this.module = aModule;
    }

    getProjectProfessor() {
        //Read out of the module.
        return this.projectProfessor;
    }

    setProjectProfessor(aProfessor){
        //Set the module.
        this.projectProfessor = aProfessor;
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

