//create user 
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  role?: string;
  picture?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
