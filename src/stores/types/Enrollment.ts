import Course from "./Course";
import { User } from "./User";

export default interface Enrollment{
    enrollmentId?:number;
    userId:number;
    courseId:string;
    user?:User;
    course?:Course;
    createdDate?: Date;
    updatedDate?: Date;
    deletedDate?: Date;

}