import Assignment from "./Assignment";
import { User } from "./User";

export default interface Attendance{
    attendanceId:number;
    attendanceDate:Date;
    attendanceStatus:string;
    attendanceImage:string;
    attendanceConfirmStatus:string;
    user:User;
    assignment:Assignment;
    createdDate:Date;
    updatedDate:Date;
    deletedDate:Date;
}