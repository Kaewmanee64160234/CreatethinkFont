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
  console.log(`/users/${id}`);
    return http.delete(`/users/${id}`);
  }
  
export default { getUser, saveUser, deleteUser, updateUser };