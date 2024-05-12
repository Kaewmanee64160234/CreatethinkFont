// src/services/course.ts
import Course from "@/stores/types/Course";
import http from "./axios";

function getCourse() {
    return http.get("/courses");
  }

function deleteCourse(id: string) {
  return http.delete(`/courses/${id}`);
}
function updateCourse(id: string, course: Course) {
  return http.put(`/courses/${id}`, course);
}
  
export default { getCourse , deleteCourse, updateCourse};