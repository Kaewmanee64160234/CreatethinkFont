// src/services/user.ts
import { User } from "@/stores/types/User";
import http from "./axios";
function getUser() {
    return http.get("/users");
  }
//create user
function saveUser(user: User) {
    return http.post("/users", user);
  }
//update user
function updateUser(id: number) {
    return http.get(`/users/${id}`);
  }
//delete user
function deleteUser(id: number) {
    return http.delete(`/users/${id}`);
  }
//find user by studentId
function findUserBystdId(studentId: string) {
    return http.get(`/users/search/${studentId}`);
  }



export default { getUser, saveUser, deleteUser, updateUser, findUserBystdId};