import Assignment from "./Assignment";
import { User } from "./User";

export default interface Attendance{
    attdanceId:number;
    attdanceDate:Date;
    attdanceStatus:string;
    user:User;
    assignment:Assignment;
    createdDate:Date;
    updatedDate:Date;
    deletedDate:Date;
}