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
  imageProfile: string;
  faceDescriptions?: Float32Array[];
  createdAt?: Date;
  updatedAt?: Date;
}
