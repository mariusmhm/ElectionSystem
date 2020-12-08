import BusinessObject from './BusinessObject';
import NamedBusinessObject from './NamedBusinessObject';

export default class Project extends NamedBusinessObject {
/// Represents a Project.

    constructor(projectID, aProjectName,aLink, aRoomDesired,aGradeAverage,aNumBlockDaysInExam, aBlockDaysInExam, aSpecialRoom,
                aDateBlockDaysDuringLecture, aNumBlockDaysPriorLecture,aBlockDaysPriorLectureTrue,aNumBlockDaysDuringLecture,
                aBlockDaysDuringLecture,aWeekly,aShortDescription,aNumSpots,aProjectType, aModule, aUser, aParticipation){
        super();
        this.projectId = projectID;
        this.projectName = aProjectName;
        this.link = aLink;
        this.roomDesired = aRoomDesired;
        this.gradeAverage = aGradeAverage;
        this.numBlockDaysInExam = aNumBlockDaysInExam;
        this.blockDaysInExam = aBlockDaysInExam;
        this.specialRoom = aSpecialRoom;
        this.dateBlockDaysDuringLecture = aDateBlockDaysDuringLecture;
        this.numBlockDaysPriorLecture = aNumBlockDaysPriorLecture;
        this.blockDaysPriorLectureTrue = aBlockDaysPriorLectureTrue;
        this.numBlockDaysDuringLecture = aNumBlockDaysDuringLecture;
        this.blockDaysDuringLecture = aBlockDaysDuringLecture;
        this.weekly = aWeekly;
        this.shortDescription = aShortDescription;
        this.numSpots = aNumSpots;
        this.projectType = aProjectType;
        this.module = aModule;
        this.projectProfessor = aUser;
        this.participation = aParticipation;

}

     getProjectId() {
        """Read out of the projectID."""
        return this.projectId;
     }

    setProjectId(projectID){
        """Set the projectID."""
        this.projectId = projectID;
     }

    getProjectName() {
    """Read out of the projectname."""
        return this.projectName;
    }

    setProjectName(aProjectName){
        """Set the projectname."""
        this.projectName = aProjectName;
    }



    getLink() {
    """Read out of the link."""
        return this.link;
    }

    setLink(aLink){
        """Set the link."""
        this.link = aLink;
    }

    getRoomDesired() {
    """Read out room."""
        return this.roomDesired;
    }

    setRoomDesired(aRoomDesired){
        """Set the room."""
        this.roomDesired = aRoomDesired;
    }


     getGradeAverage() {
    """Read out of the gradeAverage."""
        return this.gradeAverage
    }

    setGradeAverage(aGradeAverage){
        """Set the gradeAverage."""
       this.gradeAverage = aGradeAverage;
    }


    getNumBlockDaysInExam() {
    """Read out of the numBlockDaysInExam."""
        return this.numBlockDaysInExam;
    }

    setNumBlockDaysInExam(aNumBlockDaysInExam){
        """Set the numBlockDaysInExam."""
       this.numBlockDaysInExam = aNumBlockDaysInExam;
    }



    getBlockDaysInExam() {
    """Read out of the BlockDaysInExam."""
        return this.blockDaysInExam;
    }

    setBlockDaysInExam(aBlockDaysInExam){
        """Set the BlockDaysInExam."""
       this.blockDaysInExam = aBlockDaysInExam;
    }


    getSpecialRoom() {
    """Read out of the special room."""
        return this.specialRoom;
    }

    setSpecialRoom(aSpecialRoom){
        """Set the special room."""
         this.specialRoom = aSpecialRoom;
    }


    getDateBlockDaysDuringLecture() {
    """Read out of the dateBlockDaysDuringLecture."""
        return this.dateBlockDaysDuringLecture;
    }

    setDateBlockDaysDuringLecture(aDateBlockDaysDuringLecture){
        """Set the dateBlockDaysDuringLecture."""
         this.dateBlockDaysDuringLecture = aDateBlockDaysDuringLecture;
    }


    getNumBlockDaysPriorLecture() {
    """Read out of the NumBlockDaysPriorLecture ."""
        return this.numBlockDaysPriorLecture;
    }

    setNumBlockDaysPriorLecture(aNumBlockDaysPriorLecture){
     """Set the NumBlockDaysPriorLecture ."""
         this.numBlockDaysPriorLecture = aNumBlockDaysPriorLecture;
    }


    getBlockDaysPriorLectureTrue() {
    """Read out of the blockDaysPriorLectureTrue ."""
        return this.blockDaysPriorLectureTrue;
    }

    setBlockDaysPriorLectureTrue(aBlockDaysPriorLectureTrue){
     """Set the blockDaysPriorLectureTrue ."""
         this.blockDaysPriorLectureTrue = aBlockDaysPriorLectureTrue;
    }


   getNumBlockDaysDuringLecture() {
    """Read out of the NumBlockDaysDuringLecture ."""
        return this.numBlockDaysDuringLecture;
    }

    setNumBlockDaysDuringLecture(aNumBlockDaysDuringLecture){
     """Set the NumBlockDaysDuringLecture ."""
         this.numBlockDaysDuringLecture = aNumBlockDaysDuringLecture;
    }



    getBlockDaysDuringLecture() {
    """Read out of the BlockDaysDuringLecture."""
        return this.blockDaysDuringLecture;
    }

    setBlockDaysDuringLecture(aBlockDaysDuringLecture){
     """Set the BlockDaysDuringLecture ."""
        this.blockDaysDuringLecture = aBlockDaysDuringLecture;
    }


    getWeekly() {
    """Read out of the weekly."""
        return this.weekly;
    }

    setWeekly(aWeekly){
     """Set the weekly ."""
        this.weekly = aWeekly;
    }


    getShortDescription() {
    """Read out of the shortDescription."""
        return this.shortDescription;
    }

    setShortDescription(aShortDescription){
     """Set the shortDescription."""
       this.shortDescription = aShortDescription;
    }



    getNumSpots() {
    """Read out of the numSpots."""
        return this.numSpots;
    }

    setNumSpots(aNumSpots){
     """Set the numSpots."""
        this.numSpots = aNumSpots;
    }



    getProjectType() {
    """Read out of the projectType."""
        return this.projectType;
    }

    setProjectType(aProjectType){
     """Set the project type."""
        this.projectType = aProjectType;
    }


    getModule() {
    """Read out of the module."""
        return this.module;
    }

    setModule(aModule){
     """Set the module."""
       this.module = aModule;
    }



    getProjectProfessor() {
    """Read out of the module."""
        return this.projectProfessor;
    }

    setProjectProfessor(aUser){
     """Set the module."""
       this.projectProfessor = aUser;
    }


    getParticipation() {
    """Read out of the participation."""
        return this.participation;
    }

    setParticipation(aParticipation){
     """Set the participation."""
        this.participation = aParticipation;
    }

