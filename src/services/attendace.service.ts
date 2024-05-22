import Attendance from "@/stores/types/Attendances";
import http from "./axios";

//create function get All attendance
function getAttendance() {
  return http.get("/attendances");
}
//create function get attendance by id
function getAttendanceById(id: string) {
  return http.get(`/attendances/${id}`);
}

//create function create attendance

function createAttendance(data: Attendance) {
  return http.post("/attendances", data);
}

//create function get attendance by course id

function getAttendanceByCourseId(id: string) {
  return http.get(`/attendances/course/${id}`);
}

//create function get attendance by ass Assignment id

function getAttendanceByAssignmentId(id: string) {
  return http.get(`/attendances/assignment/${id}`);
}
// getAttendanceByUserId
function getAttendanceByUserId(userId: string) {
  return http.get(`/attendances/user/${userId}`);
}

// updateAttendance

function updateAttendance(attendance: Attendance) {
  return http.put(`/attendances/${attendance}`);
}

export default {
  getAttendance,
  createAttendance,
  getAttendanceById,
  getAttendanceByCourseId,
  getAttendanceByAssignmentId,
  getAttendanceByUserId,
  updateAttendance
};
