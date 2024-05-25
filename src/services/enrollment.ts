import Enrollment from "@/stores/types/Enrollment";
import http from "./axios";

function getCourseByStudentId(studentId: string) {
  return http.get(`/enrollments/student/${studentId}`);
}

function deleteEnrollment(enrollmentId: number) {
  return http.delete(`/enrollments/${enrollmentId}`);
}

function createEnrollment(enrollment: Enrollment) {
  return http.post(`/enrollments/`, enrollment);
}
  
export default {  getCourseByStudentId , deleteEnrollment, createEnrollment };