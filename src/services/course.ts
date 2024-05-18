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

function getCourseByTeachId(teachId: string) {
  return http.get(`/courses/teach/${teachId}`);
}

function getCourseByStudentId(studentId: string) {
  return http.get(`/courses/student/${studentId}`);
}

function createCourse(course: Course) {
  return http.post("/courses", course);
}
  
export default { getCourse , deleteCourse, updateCourse , getCourseByTeachId, getCourseByStudentId, createCourse};