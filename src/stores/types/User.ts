
//create user 
export interface User {
  userId?: number;
  firstName: string;
  lastName: string;
  email?: string;
  role?: string;
  status?: string;
  picture?: string;
  teacherId?: string;
  studentId?: string;
  profileImage?: string;
  faceDescriptions?: Float32Array[];
  createdAt?: Date;
  updatedAt?: Date;
  access_token?: string;
  images?:Float32Array[];
}
