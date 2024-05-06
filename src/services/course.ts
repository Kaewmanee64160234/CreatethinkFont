// src/services/course.ts
import http from "./axios";

function getCourse() {
    return http.get("/courses");
  }
  
export default { getCourse };