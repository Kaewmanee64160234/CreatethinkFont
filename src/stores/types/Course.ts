import { User } from "./User";

export default interface Course {
    coursesId: string;
    nameCourses: string;
    credit: number;
    session: string;
    stdAmount: number;
    timeIn: Date;
    timeOut: Date;
    fullScore: number;
    userId: number;
    user:User;
    createdDate: Date;
    updatedDate: Date;
    deletedDate: Date;
  }
  