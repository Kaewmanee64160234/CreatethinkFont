//create user 
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role?: string;
  picture?: string;
  teacherId?: string;
  studentId?: string;
  imageProfile: string;
  faceDescriptions?: Float32Array[];
  createdAt?: Date;
  updatedAt?: Date;
}
