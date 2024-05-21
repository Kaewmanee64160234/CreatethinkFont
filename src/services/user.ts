// src/services/user.ts
import { User } from "@/stores/types/User";
import http from "./axios";
import axios from "axios";
function getUser() {
    return http.get("/users");
  }
//create user
function saveUser(user: User & { files: File[] }) {
  const formData = new FormData();

  // Append normal fields
  formData.append('firstName', user.firstName);
  formData.append('lastName', user.lastName);
  formData.append('email', user.email!);
  formData.append('studentId', user.studentId!);
  formData.append('teacherId', user.teacherId!);
  formData.append('role', user.role!);
  formData.append('status', user.status!);
  // formData.append('profileImage', user.profileImage!);

  if (user.files.length > 0) {
    formData.append('imageFile', user.files[0], user.files[0].name);
  }

  for (const [key, value] of formData.entries()) {
    console.log(`${key}: ${JSON.stringify(value)}`);
  }

  return http.post("/users", formData, {
    headers: {
      'Content-Type': 'multipart/form-data', 
    }
  });
}
//update user
function updateUser(user: User & { files: File[] }, userId: number) {
  const formData = new FormData();

  // Append normal fields
  formData.append('firstName', user.firstName);
  formData.append('lastName', user.lastName);
  formData.append('email', user.email!);
  formData.append('studentId', user.studentId!);
  formData.append('teacherId', user.teacherId!);
  formData.append('role', user.role!);
  formData.append('status', user.status!);

  // Handle file uploads; append only if files are present
  if (user.files.length > 0) {
    formData.append('imageFile', user.files[0], user.files[0].name);
  }

  // Logging FormData contents for debugging (optional)
  for (const [key, value] of formData.entries()) {
    console.log(`${key}: ${JSON.stringify(value)}`);
  }

  // Make an HTTP PUT request with FormData
  return http.patch(`/users/${userId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  });
}

//delete user
function deleteUser(id: number) {
    return http.delete(`/users/${id}`);
  }
//find user by studentId and teacherId
function getUserBystidId(studentId: string, teacherId: string) {
    return http.get(`/users/find/${studentId}/${teacherId}`);
  }

//get user imageProfile by id
function getUserImage(id: number) {
    return http.get(`/users/profileImage/${id}`);
  }



export default { getUser, getUserImage, saveUser, deleteUser, updateUser, getUserBystidId};