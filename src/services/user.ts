// src/services/user.ts
import http from "./axios";
function getUser() {
    return http.get("/users");
  }
  
export default { getUser };