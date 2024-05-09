// src/services/user.ts
import { User } from "@/stores/types/User";
import http from "./axios";
function getUser() {
    return http.get("/users");
  }
  
export default { getUser };