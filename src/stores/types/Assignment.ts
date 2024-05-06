import Attendance from "./Attendances";
import Course from "./Course";
import Room from "./Room";

export default interface Assignment{
    assignmentId?:number;
    nameAssignment:string;
    assignmentTime:Date;
    attdances?:Attendance[];
    room?:Room;
    course:Course;
    createdDate?:Date;
    updatedDate?:Date;
    deletedDate?:Date;
}