import NamedBusinessObject from './NamedBusinessObject';

export default class ProjectBO extends NamedBusinessObject {
/// Represents a Project.

/*OLD OLD OLD

constructor(aRoomDesired,aGradeAverage,aNumBlockDaysInExam, aBlockDaysInExam, aSpecialRoom,
                aDateBlockDaysDuringLecture, aNumBlockDaysPriorLecture,aBlockDaysPriorLectureTrue,aNumBlockDaysDuringLecture,
                aBlockDaysDuringLecture,aWeekly,aShortDescription,aNumSpots,aProjectType, aModule, aProfessor, aParticipation, aAddProfessor,
                aLanguage, aExternalPartner){
        super();

        this.shortDescription = aShortDescription;
        this.specialRoom = aSpecialRoom;
        this.roomDesired = aRoomDesired;
        this.numBlockDaysPriorLecture = aNumBlockDaysPriorLecture;
        this.dateBlockDaysDuringLecture = aDateBlockDaysDuringLecture;
        this.numBlockDaysDuringLecture = aNumBlockDaysDuringLecture;
        this.numBlockDaysInExam = aNumBlockDaysInExam;
        this.weekly = aWeekly;
        this.num_spots = aNumSpots;
        this.language = aLanguage;
        this.externalPartner = aExternalPartner;
        this.projectType = aProjectType;
        this.module = aModule;
        this.projectProfessor = aProfessor;
        this.addProfessor = aAddProfessor;
    }
*/
    constructor(aRoomDesired,aNumBlockDaysInExam, aSpecialRoom,
                aDateBlockDaysDuringLecture, aNumBlockDaysPriorLecture,aNumBlockDaysDuringLecture,
                aWeekly,aShortDescription,aNumSpots,aProjectType, aModule, aProfessor, aAddProfessor,
                aLanguage, aExternalPartner, aState){
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
        this.projecttype_id = aProjectType;
        this.module_id = aModule;
        this.professor_id = aProfessor;
        this.add_professor_id = aAddProfessor;
        this.current_state_id = aState;
        }

//ShortDesscription

    getShortDescription() {
        //Read out of the shortDescription.
        return this.short_description;
    }

    setShortDescription(aShortDescription){
        //Set the shortDescription.
        this.short_description = aShortDescription;
    }

//SpecialRoom
    getSpecialRoom() {
        //Read out of the special room.
        return this.special_room;
    }

    setSpecialRoom(aSpecialRoom){
        //Set the special room.
        this.special_room = aSpecialRoom;
    }

//roomDesired

    getRoomDesired() {
        //Read out room.
        return this.room_desired;
    }

    setRoomDesired(aRoomDesired){
        //Set the room.
        this.room_desired = aRoomDesired;
    }

//number of blockdays prior lecture

    getNumBlockDaysPriorLecture() {
        //Read out of the NumBlockDaysPriorLecture .
        return this.num_blockdays_prior_lecture;
    }

    setNumBlockDaysPriorLecture(aNumBlockDaysPriorLecture){
        //Set the NumBlockDaysPriorLecture .
        this.num_blockdays_prior_lecture = aNumBlockDaysPriorLecture;
    }

//Date of blockdays during lecture

    getDateBlockDaysDuringLecture() {
        //Read out of the date_blockdays_during_lecture.
        return this.date_blockdays_during_lecture;
    }

    setDateBlockDaysDuringLecture(aDateBlockDaysDuringLecture){
        //Set the date_blockdays_during_lecture.
        this.date_blockdays_during_lecture = aDateBlockDaysDuringLecture;
    }

//number of blockdays during lecture

    getNumBlockDaysDuringLecture() {
        //Read out of the NumBlockDaysDuringLecture .
        return this.num_blockdays_during_lecture;
    }

    setNumBlockDaysDuringLecture(aNumBlockDaysDuringLecture){
        //Set the NumBlockDaysDuringLecture .
        this.num_blockdays_during_lecture = aNumBlockDaysDuringLecture;
    }

//number of blockdays in exam

    getNumBlockDaysInExam() {
        //Read out of the num_blockdays_in_exam.
        return this.num_blockdays_in_exam;
    }

    setNumBlockDaysInExam(aNumBlockDaysInExam){
        //Set the num_blockdays_in_exam.
        this.num_blockdays_in_exam = aNumBlockDaysInExam;
    }

//weekly
    getWeekly() {
        //Read out of the weekly.
        return this.weekly;
    }

    setWeekly(aWeekly){
        //Set the weekly .
        this.weekly = aWeekly;
    }

//number of spots

    getNumSpots() {
        //Read out of the num_spots.
        return this.num_spots;
    }

    setNumSpots(aNumSpots){
        //Set the num_spots.
        this.num_spots = aNumSpots;
    }

//language

    getLanguage(){
    //Reads out the language.
        return this.language
    }

    setLanguage(aLanguage){
    //Sets the language
        this.language = aLanguage;
    }

//external partner

    getExternalPartner(){
    //Reads out the external Partner
        return this.external_partner;
    }

    setExternalPartner(aExternalPartner){
    //Sets the external Partner
        this.external_partner = aExternalPartner;
    }

//projecttype
   
    getProjectType() {
        //Read out of the projecttype_id.
        return this.projecttype_id;
    }

    setProjectType(aProjectType){
        //Set the project type.
        this.projecttype_id = aProjectType;
    }

//module_id

    getModule() {
        //Read out of the module_id.
        return this.module_id;
    }

    setModule(aModule){
        //Set the module_id.
        this.module_id = aModule;
    }
//professor
    getProfessor() {
        //Read out of the professor_id.
        return this.professor_id;
    }

    setProfessor(aProfessor){
        //Set the professor_id.
        this.professor_id = aProfessor;
    }
//add professor

    getAddProfessor(){
    //Read out of the additional professor.
        return this.add_professor_id;
    }

    setAddProfessor(aAddProfessor){
    //Set the additional professor
        this.add_professor_id =  aAddProfessor;
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

